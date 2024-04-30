"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSender } from "@/src/components/MessageSender";
import { chakra, useColorMode } from "@chakra-ui/react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

type Question = {
  question: string;
  id: string;
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-2">
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className="flex h-14 items-center rounded-lg bg-white px-4"
      >
        <div className="h-2 w-full rounded bg-gray-300"></div>
      </div>
    ))}
  </div>
);

export default function Home() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [chatSessionId, setChatSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleQuestionClick = (question: string) => {
    sessionStorage.setItem("message", question); // Store the selected question in sessionStorage
    router.push(`/chat/${chatSessionId}`); // Navigate to the /chat page with the chatSessionId
  };

  useEffect(() => {
    setChatSessionId(uuidv4());
    setLoading(true); // Set loading to true before fetching data
    fetch("/api/suggestion")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  return (
    <section className="my-20 space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col gap-5">
        <chakra.h1 className="text-3xl font-bold">
          Want to build an AI chatbot?
        </chakra.h1>
        <chakra.h2
          fontSize="xl"
          className={colorMode === "light" ? "text-gray-600" : "text-gray-500"}
        >
          This is the template you are looking for 🚀
        </chakra.h2>
        <div className="grid w-full grid-cols-1 gap-2">
          {loading ? (
            <SkeletonLoader />
          ) : (
            questions.map((entry, index) => (
              <button onClick={() => handleQuestionClick(entry.question)}>
                <div
                  key={index}
                  className={
                    colorMode === "light"
                      ? "line-clamp-2 flex h-14 items-center rounded-lg border p-3 text-sm text-gray-600 transition-all hover:bg-gray-100 hover:text-teal-700"
                      : "line-clamp-2 flex h-14 items-center rounded-lg border p-3 text-sm transition-all hover:bg-gray-700 hover:text-white"
                  }
                >
                  <div className="line-clamp-2">{entry.question}</div>
                </div>
              </button>
            ))
          )}
        </div>
        <MessageSender />
      </div>
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src={"https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"}
        data-id="somilgupta"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#319795"
        data-position="left"
        data-x_margin="20"
        data-y_margin="25"
        defer
      />
    </section>
  );
}
