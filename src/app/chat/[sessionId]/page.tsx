"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatMessageContainer from "@/src/components/Chat";
import { FullAccessModal, SignUpModal } from "@/src/components/Modal";
import { UserAuth } from "@/src/context/AuthContext";
import {
  getDocFirestore,
  updateDocFirestore,
} from "@/src/lib/firebase/firebaseRepository";
import { Button } from "@chakra-ui/button";
import { ArrowUpIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { useChat } from "ai/react";

export default function ChatSession() {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { googleSignIn, user } = UserAuth();
  const params = useParams();
  const sessionId = params.sessionId as string;
  let storedMessage = null;
  const [showModal, setShowModal] = useState(false);
  const [showFullAccessModal, setShowFullAccessModal] = useState(false);
  if (typeof window !== "undefined") {
    sessionStorage.setItem("sessionId", sessionId);
    storedMessage = sessionStorage.getItem("message");
  }
  const hasHandledStoredMessage = useRef(false);
  const {
    setMessages,
    append,
    messages,
    input,
    setInput,
    handleInputChange,
    stop,
    isLoading,
  } = useChat();
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isStreaming && input.trim()) {
      let sendCount = parseInt(localStorage.getItem("try-count") ?? "0");
      sendCount = sendCount - 1;
      localStorage.setItem(
        "try-count",
        sendCount < 0 ? "0" : sendCount.toString(),
      );
      const shouldStartStreaming = sendCount >= 0;
      if (shouldStartStreaming) {
        append({ role: "user", content: input }).then((r) => r);
        setInput("");
        return;
      } else {
        setInput("");
        setShowFullAccessModal(true);
        return;
      }
    }
  };

  const handleCountUpdateInFireStore = async () => {
    if (user && user.email) {
      //get count from firestore
      const doc = await getDocFirestore(user.email);
      if (doc.exists()) {
        const count = doc.data().count - 1 < 0 ? 0 : doc.data().count - 1;
        await updateDocFirestore({ email: user.email, count: count });
      }
    }
    return true;
  };

  const handleStreaming = async () => {
    if (isStreaming) {
      stop();
      setIsStreaming(false);
    } else {
      if (!input.trim()) {
        window.alert("Please enter a message.");
        return;
      }
      if (!user) {
        setInput("");
        setShowModal(true);
        return;
      }
      await handleCountUpdateInFireStore();
    }
  };

  useEffect(() => {
    if (!isLoading) setIsStreaming(false);
    if (isLoading) setIsStreaming(true);
    if (messages.length !== 0)
      sessionStorage.setItem(`messages-${sessionId}`, JSON.stringify(messages));
    const storedMessages = sessionStorage.getItem(`messages-${sessionId}`);
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, [isLoading, setIsStreaming, messages, setMessages, sessionId]);

  useEffect(() => {
    if (storedMessage !== null && !hasHandledStoredMessage.current) {
      hasHandledStoredMessage.current = true;
      setIsStreaming(true);
      append({
        role: "user",
        content: storedMessage,
      })
        .then(() => {
          // Since `append` should update your messages,
          // the effect that syncs to sessionStorage will handle saving
          sessionStorage.removeItem("message");
        })
        .finally(() => {
          setIsStreaming(false);
        });
    }
  }, [storedMessage, append]);

  const handleSignIn = async () => {
    try {
      googleSignIn();
      router.push("/"); // Redirect to the homepage after successful sign-in
    } catch (error) {
      console.log(error);
    }
  };

  const bottomRef = useRef<null | HTMLDivElement>(null); // Create a reference to the bottom of the chat messages container

  useEffect(() => {
    // Scroll to the bottom of the chat messages container when the component mounts or when new messages are added
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Depend on the message array so the effect runs when new messages are added

  return (
    <div className="flex flex-grow flex-col pt-14">
      <FullAccessModal
        isOpen={showFullAccessModal}
        onClose={() => setShowFullAccessModal(false)}
      />
      <SignUpModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClick={handleSignIn}
      ></SignUpModal>
      {/* Chat messages container */}
      <ChatMessageContainer messages={messages} bottomRef={bottomRef} />
      {/* Input container */}
      <div className="fixed bottom-0 left-0 w-full px-20 py-10">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <InputGroup>
            <Input
              type="text"
              height={"60px"}
              variant={"solid"}
              placeholder="Ask follow-up"
              border={"1px"}
              borderColor={"teal"}
              paddingLeft={"25px"}
              paddingRight={"65px"}
              backgroundColor={colorMode === "light" ? "white" : "gray.700"}
              value={input}
              borderRadius={"full"}
              onChange={handleInputChange}
              isDisabled={isStreaming || isLoading}
            />
            <InputRightElement height="60px" marginRight="3">
              <Button
                colorScheme="teal"
                variant="outline"
                backgroundColor={colorMode === "light" ? "white" : "gray.700"}
                type="submit"
                onClick={handleStreaming}
                borderRadius="full"
                pt={0}
              >
                {isStreaming ? <SmallCloseIcon /> : <ArrowUpIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </div>
    </div>
  );
}
