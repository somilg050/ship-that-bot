"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "@/src/context/AuthContext";
import { getDocFirestore } from "@/src/lib/firebase/firebaseRepository";
import { Card, CardBody } from "@chakra-ui/card";
import { Link, Stack } from "@chakra-ui/react";

const Page = () => {
  const { user } = UserAuth();
  const [historyUrls, setHistoryUrls] = useState([]); // State to store history URLs

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        const doc = await getDocFirestore(user.email);
        if (doc.exists()) {
          const historyData = doc.data()?.history;
          if (historyData && historyData.length > 0) {
            setHistoryUrls(historyData); // Set the history URLs in state
          }
        }
      }
    };
    fetchData();
  }, [user]); // Added user as a dependency to re-run the effect when the user changes

  return (
    <div className="mt-20 flex flex-col items-center">
      <h1 className="mt-30 mb-20 text-4xl font-bold">History</h1>
      <Stack spacing="4">
        {historyUrls.map((url, index) => (
          <Card
            key={index}
            direction="column"
            overflow="hidden"
            variant="filled"
          >
            <CardBody>
              <Link href={`chat/${url}`}>{url}</Link>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default Page;
