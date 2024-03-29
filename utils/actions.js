//server side

"use server";

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//*******************CHAT PAGE**********************

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an excellent to-do list AI assistant. You will help the user with whatever they input",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo-1106",
      temperature: 0.2,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

//*************************CREATE REMINDERS PAGE******************************

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createTask = async (formData) => {
  const content = formData.get("content");
  // some validation here

  await prisma.task.create({
    data: {
      content,
    },
  });
  // revalidate path
  revalidatePath("/create");
};

export const deleteTask = async (formData) => {
  const id = formData.get("id");
  await prisma.task.delete({ where: { id } });
  revalidatePath("/create");
};

export const getTask = async (id) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const editTask = async (formData) => {
  const id = formData.get("id");
  const content = formData.get("content");
  const completed = formData.get("completed");

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      content: content,
      completed: completed === "on" ? true : false,
    },
  });
  // redirect won't works unless the component has 'use client'
  // another option, setup the editTask in the component directly
  redirect("/create");
};

//**************Creating TASKS**************

export const generateTaskResponse = async ({ tasks }) => {
  const query = `User inputs a task {$tasks}. Create a small to-do list for the user input.No introduction reply sentence, just straight to Response. Response should be in the following JSON Format:
  {
    "task": { 
      "userinput":${tasks}, 
      "title":"title of task",
      "description":"description of the task",
      "category": "category of task",
      "generatedtasks":["short para on task1","short para on task 2","short para on task 3']. These tasks are generated from userinput
    }
  }
  json format no matter what
  "category" property has to be between these 6 categories: Work, Errands, Home, Leisure, Financial, Personal. No abstract tasks in "generatedtasks"."generatedtasks" property should include a minimum of 2 tasks and a maximum of 4 tasks, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "you are excellent to-do list creating assistant",
        },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: {type: "json_object"},
      temperature: 0,
    });
    // potentially returns a text with error message
    const taskData = JSON.parse(response.choices[0].message.content);

    if (!taskData.task) {
      return null;
    }

    return taskData.task;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createNewTask = async (task) => {
  return prisma.task2.create({
    data: task,
  });
};

export const getAllTasks2 = async (searchTerm) => {
  if (!searchTerm) {
    const tasks = await prisma.task2.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return tasks;
  }

  const tasks = await prisma.task2.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
          },
        },
        {
          description: {
            contains: searchTerm,
          },
        },
        {
          category: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return tasks;
};

export const getSingleTask = async (id) => {
  return prisma.task2.findUnique({
    where: {
      id,
    },
  });
};

export const deleteTask2= async (formData) =>
{
  const id= formData.get('id');
  try{
    await prisma.task2.delete({
      where:{ id  }});
    revalidatePath('/tasks/{id}');
  }
    catch(e)
  {
    console.error("Failed to delete", e);
  }
};


