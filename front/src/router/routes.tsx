import { createBrowserRouter } from "react-router-dom";
import Level from "../components/Level";
import Login from "../components/Login";
import Game from "../components/Game";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Level />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/game',
    element: <Game />
  }
])

export default router