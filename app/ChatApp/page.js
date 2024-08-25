"use client";
import {
  Box,
  Stack,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Rate My Professor support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    setMessage("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = "";
    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }
      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },
        ];
      });
      return reader.read().then(processText);
    });
  };

  // Hook for theme and media queries
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      sx={{
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        width={isMobile ? "100%" : "80%"} // Full width on mobile
        height={isMobile ? "80%" : "90%"} // Adjust height for mobile
        border="1px solid"
        borderColor="#FCA311"
        borderRadius={2}
        overflow="hidden"
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          padding={2}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius={2}
                p={2}
                sx={{ mx: 1, my: 1, maxWidth: "80%" }} // Ensure messages don't stretch too wide
                dangerouslySetInnerHTML={{ __html: message.content }} // Render HTML
              />
            </Box>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          padding={1}
          borderTop="1px solid"
          borderColor="divider"
          sx={{
            flexShrink: 0, // Prevent shrinking
          }}
        >
          <TextField
            label="Message"
            value={message}
            variant="outlined"
            size="small"
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              flexGrow: 1,
              mr: 1,
              bgcolor: "white",
              border: "1px solid",
              borderRadius: 12,
              borderColor: "#FCA311",
              width: isMobile ? "calc(100% - 80px)" : "auto", // Adjust width for mobile
            }}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}