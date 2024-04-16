"use client";

// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { FullAccessModal, SignUpModal } from "@/src/components/Modal";
import { UserAuth } from "@/src/context/AuthContext";
import { useColorMode } from "@chakra-ui/react";

export const MessageSender = () => {
  const { colorMode } = useColorMode();
  const { user, googleSignIn } = UserAuth();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFullAccessModal, setShowFullAccessModal] = useState(false);
  const router = useRouter();

  const sendMessage = async () => {
    if (!message.trim()) {
      window.alert("Please enter a message."); // This will show the native browser alert dialog
      return;
    }
    if (user === null) {
      setShowModal(true);
      return;
    }
    const chatSessionId = uuidv4();
    sessionStorage.setItem("message", message.trim());

    // Increment sendCount in local storage
    const sendCount = parseInt(localStorage.getItem("try-count") ?? "0") - 1;
    localStorage.setItem(
      "try-count",
      sendCount < 0 ? "0" : sendCount.toString(),
    );
    if (sendCount < 0) {
      setShowFullAccessModal(true);
      return;
    }
    router.push(`/chat/${chatSessionId}`);
  };

  const handleSignIn = async () => {
    try {
      googleSignIn();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FullAccessModal
        isOpen={showFullAccessModal}
        onClose={() => setShowFullAccessModal(false)}
      />
      <SignUpModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClick={handleSignIn}
      ></SignUpModal>
      <div className="relative flex">
        <input
          name="input message"
          type="text"
          placeholder="How can I help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              return sendMessage();
            }
          }}
          className={
            colorMode === "light"
              ? "w-full py-2 px-4 mr-2 rounded-md border shadow border-teal-700"
              : "w-full py-2 px-4 mr-2 rounded-md border border-teal-700 shadow text-gray-400 bg-gray-700"
          }
        />
        <Button
          rightIcon={<ArrowUpIcon />}
          colorScheme="teal"
          variant="outline"
          type="submit"
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
};
