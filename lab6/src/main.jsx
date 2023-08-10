import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StreamList from "./streams/StreamList.jsx";
import StreamCreate from "./streams/StreamCreate.jsx";
import StreamEdit from "./streams/StreamEdit.jsx";
import StreamDelete from "./streams/StreamDelete.jsx";
import StreamShow from "./streams/StreamShow.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StreamList></StreamList>,
  },
  {
    path: "/streams/new",
    element: <StreamCreate></StreamCreate>,
  },
  {
    path: "/streams/edit",
    element: <StreamEdit></StreamEdit>,
  },
  {
    path: "/streams/delete",
    element: <StreamDelete></StreamDelete>,
  },
  {
    path: "/streams/show",
    element: <StreamShow></StreamShow>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
