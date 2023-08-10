import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
]);
