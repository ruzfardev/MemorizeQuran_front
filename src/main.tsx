import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { App } from "@app/App";
import "material-icons/iconfont/material-icons.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <MantineProvider
      theme={{
        primaryColor: "teal",
        fontFamily: "Roboto Flex",
        primaryShade: 5,
        colors: {
          teal: [
            "#EAF2F3",
            "#BFD7D9",
            "#9FC4C6",
            "#74A9AC",
            "#59989C",
            "#2F7E83",
            "#2B7377",
            "#21595D",
            "#1A4548",
            "#143537",
          ],
        },
      }}
    >
      <Notifications position="top-center" />
      <App />
    </MantineProvider>
  </BrowserRouter>
  // </StrictMode>
);
