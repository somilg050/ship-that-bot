"use client";
import React from "react";
import { Container } from "@chakra-ui/react";

const page = () => {
  return (
    <div className="flex-col flex items-center">
      <h1 className="text-4xl font-bold mt-40 mb-20">About</h1>
      <Container size="sm" variant="bold">
        Welcome to ShipThatBot, the premier solution for launching AI chatbots
        swiftly and efficiently. Our platform is crafted with a state-of-the-art
        user interface designed to handle references in chat interactions
        seamlessly. We are committed to security and user experience,
        integrating robust authentication via Firebase, ensuring that your data
        remains secure and private. ShipThatBot is also powered by OpenAI`&apos;s
        cutting-edge streaming technology, allowing real-time, dynamic
        interactions that enhance user engagement. Start with our Next.js
        template to deploy your AI chatbot in hours, not days, and revolutionize
        your digital communication.
      </Container>
    </div>
  );
};

export default page;
