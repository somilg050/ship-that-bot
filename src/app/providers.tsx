"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "../context/AuthContext";
import theme from "@/src/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ChakraProvider>
  );
}
