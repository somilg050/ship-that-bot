"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FullAccessModal, SignUpModal } from "@/src/components/Modal";
import { UserAuth } from "@/src/context/AuthContext";
import { Button } from "@chakra-ui/button";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Input, useColorMode } from "@chakra-ui/react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

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
        <Input
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
          _hover={{ borderColor: "teal.700" }}
          className="mr-2 px-4 py-2 shadow"
        />
        <Button
          rightIcon={<ArrowRightIcon />}
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
