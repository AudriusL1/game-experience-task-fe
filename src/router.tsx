import Feedbacks from "./views/Feedbacks/Feedbacks";
import FeedbackDetais from "./views/FeedbackDetails/FeedbackDetails";
import NotFound from "./views/NotFound";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/feedbacks" replace />,
  },
  {
    path: "/feedbacks",
    element: <Feedbacks />,
  },
  { path: "/feedbacks/:id", element: <FeedbackDetais /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
