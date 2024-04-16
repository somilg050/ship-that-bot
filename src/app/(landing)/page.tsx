"use client";
import { MessageSender } from "@/src/components/MessageSender";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { useColorMode } from "@chakra-ui/react";

type Question = {
  question: string;
  id: string;
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-2">
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className="flex items-center bg-white rounded-lg h-14 px-4"
      >
        <div className="h-2 bg-gray-300 rounded w-full"></div>
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
    <section className="space-y-6 my-20 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col gap-5">
        <h1 className="text-3xl font-bold">&lt; Insert Your Next Big Idea Here &gt;</h1>
        <h2 className="text-gray-500 text-xl">You can ask me things like...</h2>
        <div className="w-full grid grid-cols-1 gap-2">
          {loading ? (
            <SkeletonLoader />
          ) : (
            questions.map((entry, index) => (
              <button onClick={() => handleQuestionClick(entry.question)}>
                <div
                  key={index}
                  className={
                    colorMode === "light"
                      ? "flex line-clamp-2 items-center border hover:bg-gray-100 hover:text-teal-700 rounded-lg transition-all text-sm h-14 p-3"
                      : "flex line-clamp-2 items-center border hover:bg-gray-700 hover:text-white rounded-lg transition-all text-sm h-14 p-3"
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
    </section>
  );
}
