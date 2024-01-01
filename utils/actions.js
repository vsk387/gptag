//server side

"use server";

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

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
            "You are an excellent to-do list AI assistant.You will receive input from the user and create a to-do list for whatever task the user inputs, and add suggested tasks as well to complete the task the user has inputted.Each task should be in a brief bullet point.You will also categorize the tasks to different categories like Travel, Work, Read, Watch etc.. All tasks will be put into these different categories and output a one word category to the user, without any additional characters. Should always be less than 8 bullet points",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.2,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

//*************************CREATE TASK PAGE******************************
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
