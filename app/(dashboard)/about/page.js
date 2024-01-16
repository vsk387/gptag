import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-cyan-200 font-sans">
      {/* Navigation */}
      <nav className="bg-cyan-200 text-black p-4">
        <div className="container mx-auto">
          <div className="font-bold text-xl">
            GPToDo
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 p-8 bg-white shadow-md">

        <h1 className="text-3xl font-bold mb-6">What is GPToDo?</h1>

        <p className="mb-4">
        GPToDo is an AI Powered Assistant website. Using OpenAI's turbo 3.5, GPToDo creates tasks for you, and things you have to, and categorizes them, based on the input or your goal, you give to the AI.
        </p>

        <p className="mb-4">
          Use the <Link href='/chat' className="underline">Chat</Link> page to communicate with our AI Assistant, who can answers questions you ask.        
        </p>

        <p className="mb-4">
         Need to jot down short tasks or reminders?, use the <Link href='/create' className="underline">Reminders</Link> Page.
        </p>

        <p className="mb-4">
        Want GPToDo to create the AI generated tasks for you, depending on what you want to accomplish, and to categorize these tasks, you can use <Link href='/tasks/new-task' className="underline">New Task</Link> Page.
        View all tasks in the <Link href='/tasks' className="underline">Tasks</Link> Page.
        </p>

        <p className="mb-4">
          View your profile in the <Link href='/profile' className="underline">Profile</Link> Page.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
