"use client";

import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import AssistantLogo from "@/src/app/ui/assistant-logo";
import Spinner from "@/src/components/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";
import {
  FullAccessModal,
  SignUpModal,
  StartNowModal,
} from "@/src/components/Modal";
import HamburgerMenu from "@/src/components/HamburgerMenu";
import { Button } from "@chakra-ui/button";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import { useColorMode } from "@chakra-ui/react";
import { getDocFirestore } from "@/src/lib/firebase/firebaseRepository";

const Navbar = ({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) => {
  const { colorMode } = useColorMode();
  const [tryCount, setTryCount] = useState<number | null>(null);
  const { user, setUser, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  // State for dropdown visibility
  const [showModal, setShowModal] = useState(false);
  const [showFullAccessModal, setFullAccessModal] = useState(false);

  const [chatSessionId, setChatSessionId] = useState(null);
  useEffect(() => {
    setChatSessionId(uuidv4()); // Generate chatSessionId only on the client side
  }, []);
  const chatUrl = `/chat/${chatSessionId}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  const handleSignIn = async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTryCount = async () => {
      if (user && user.email) {
        const docSnap = await getDocFirestore(user.email);
        if (docSnap.exists()) {
          setTryCount(docSnap.data().count < 0 ? 0 : docSnap.data().count);
          //store it is local storage
          localStorage.setItem("try-count", docSnap.data().count);
        }
      }
    };
    fetchTryCount().then((r) => r);
  }, [user]);

  return (
    <div className={"fixed top-0 w-full z-50"}>
      <nav
        className={
          colorMode === "light"
            ? "flex justify-between items-center py-2.5 px-4 bg-white"
            : "flex justify-between items-center py-2.5 px-4 bg-gray-black"
        }
      >
        <AssistantLogo />
        <div className="flex items-center">
          <FullAccessModal
            isOpen={showFullAccessModal}
            onClose={() => setFullAccessModal(false)}
            onClick={handleSignIn}
          />
          {tryCount !== null && user ? (
            <Button marginRight={4} onClick={() => setFullAccessModal(true)}>
              {tryCount} attempts left
            </Button>
          ) : null}
          {children}
          <ThemeToggleButton />
          <Link
            as={NextLink}
            href={"/about"}
            _hover={{ textDecoration: "none" }}
            className="font-medium text-black hover:text-teal-600 px-4"
          >
            About
          </Link>
          {user ? (
            <Link
              href={chatUrl}
              _hover={{ textDecoration: "none" }}
              className="font-medium text-back hover:text-teal-600 mx-2 pl-2 pr-4"
            >
              New chat
            </Link>
          ) : (
            <SignUpModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onClick={handleSignIn}
            ></SignUpModal>
          )}
          {loading ? (
            <Spinner />
          ) : user ? (
            <div className="relative">
              <HamburgerMenu
                username={user.displayName}
                userEmail={user.email}
                photoURL={user.photoURL}
                onSignOutClick={handleSignOut}
              />
            </div>
          ) : user && !loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              <a
                className="font-medium text-teal-600 hover:text-teal-600 px-4 cursor-pointer"
                onClick={handleSignIn}
              >
                Sign in
              </a>
              <StartNowModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onClick={handleSignIn}
              />
              <Button
                className="font-medium bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
              >
                Start now
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
