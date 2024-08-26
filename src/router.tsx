import Feedbacks from "./views/Feedbacks/Feedbacks";
import NotFound from "./views/NotFound";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/feedbacks",
    element: <Feedbacks />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
