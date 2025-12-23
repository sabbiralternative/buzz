import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/DatePicker/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import StateProvider from "./context/StateProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </StateProvider>
  </React.StrictMode>
);
