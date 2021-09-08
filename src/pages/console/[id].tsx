import React, { useEffect, useMemo, useState } from "react";
import { Client } from "@lib/pusher/client";
import { useRouter } from "next/router";
import { Channel } from "pusher-js";
import { Box, Code, Text, Flex, useToast } from "@chakra-ui/react";

export default function ConsolePage() {
  const [channel] = useState(Client.subscribe("my-channel"));

  const toast = useToast();

  const [data, setData] = useState([]);

  const { query } = useRouter();

  const { id = null } = query;

  console.log("query ", query);

  useEffect(() => {
    // Bind events

    return function () {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (id) {
      channel.bind(`push-data-${id}`, (incomingData) => {
        // Method to be dispatched on trigger.
        console.log(`New data arrived `, incomingData);

        toast({
          title: "New request",
          status: "info",
          duration: 3000,
          position: "top-left",
        });

        setData((d) => {
          return [incomingData, ...d];
        });
      });
    }
  }, [id]);

  return (
    <Box maxWidth="container.xl" mx="auto">
      <h1>Webhoook id : {id}</h1>
      <Flex alignItems="center">
        Request to :{" "}
        <Text color="green.600" bg="green.100" px="4" py="1" rounded="lg">
          https://webhook-data-console.vercel.app/api/webhooks/{id}
        </Text>
      </Flex>

      {data.length === 0 && <h3>No data</h3>}
      <ul>
        {data.map((d, k) => (
          <li key={k}>
            <Code>{JSON.stringify(d)}</Code>
          </li>
        ))}
      </ul>
    </Box>
  );
}
