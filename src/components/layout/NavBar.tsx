"use client";

import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import AssistantLogo from "@/src/app/ui/assistant-logo";
import HamburgerMenu from "@/src/components/HamburgerMenu";
import {
  FullAccessModal,
  SignUpModal,
  StartNowModal,
} from "@/src/components/Modal";
import Spinner from "@/src/components/Spinner";
import ThemeToggleButton from "@/src/components/ThemeToggleButton";
import {
  getDocFirestore,
  updateDocFirestore,
} from "@/src/lib/firebase/firebaseRepository";
import { Button, Link, useColorMode } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase/firebase";

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

  const [, setChatSessionId] = useState(null);

  const handleNewSession = async () => {
    const sessionId = uuidv4();
    if (user && user.email) {
      const doc = await getDocFirestore(user.email);
      if (doc.exists()) {
        const history = Array.isArray(doc.data()?.history)
          ? [...doc.data().history, sessionId]
          : [sessionId];

        await updateDocFirestore({
          email: user.email,
          history: history,
        });
      }
    }
    setChatSessionId(sessionId);
    window.location.href = `/chat/${sessionId}`;
  };

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
    <div className={"fixed top-0 z-50 w-full"}>
      <nav
        className={
          colorMode === "light"
            ? "flex items-center justify-between bg-white px-4 py-2.5"
            : "flex items-center justify-between bg-gray-black px-4 py-2.5"
        }
      >
        <AssistantLogo />
        <div className="flex items-center">
          <FullAccessModal
            isOpen={showFullAccessModal}
            onClose={() => setFullAccessModal(false)}
            onClick={handleSignIn}
          />
          <ThemeToggleButton />
          {tryCount !== null && user ? (
            <Button
              colorScheme="teal"
              variant="outline"
              marginRight={4}
              onClick={() => setFullAccessModal(true)}
            >
              {tryCount} attempts left
            </Button>
          ) : null}
          {children}
          <Link
            as={NextLink}
            href={"/about"}
            _hover={{ textDecoration: "none" }}
            className="px-4 font-medium text-black hover:text-teal-600"
          >
            About
          </Link>
          {user ? (
            <Link
              onClick={handleNewSession}
              _hover={{ textDecoration: "none" }}
              className="text-back mx-2 pl-2 pr-4 font-medium hover:text-teal-600"
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
                className="cursor-pointer px-4 font-medium text-teal-600 hover:text-teal-600"
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
                colorScheme="teal"
                variant="outline"
                onClick={() => setShowModal(true)}
                className="ml-4"
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
