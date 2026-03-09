import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Page/Auth/Login/Login";
import Registration from "../Page/Auth/Registration/Registration";
import Home from "../Page/Home/Home";
import MyProfile from "../Page/MyProfile/MyProfile";
import AllContest from "../Page/AllContest/AllContest";
import LeaderBoard from "../Page/LeaderBoard/LeaderBoard";
import ContestDetails from "../Page/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import Overview from "../Page/ Dashboard/Overview/Overview";
import Dashboard from "../Page/ Dashboard/Dashboard";
import MyContest from "../Page/ Dashboard/MyContests/MyContests";
import CreateContest from "../Page/ Dashboard/CreateContest/CreateContest";
import MyEnrolledContests from "../Page/MyEnrolledContests/MyEnrolledContests";
import FullReview from "../Page/MyEnrolledContests/FullReview";
import ApproveContests from "../Page/ApproveContests/ApproveContests";
import ContinueArena from "../Page/ContinueArena/ContinueArena";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/registration",
        Component: Registration,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/profile",
        Component: MyProfile,
      },
      {
        path: "/all-contests",
        Component: AllContest,
      },
     
      {
        path: "/leaderboard",
        Component: LeaderBoard,
      },
      {
        path: "/all-enrolled-contests",
        element: <PrivateRoute>
            <MyEnrolledContests></MyEnrolledContests>
        </PrivateRoute>
      },
      {
        path: "/full-review",
        element: <PrivateRoute>
            <FullReview></FullReview>
        </PrivateRoute>
      },
      {
        path: "/contest/:id",
        element: <PrivateRoute>
            <ContestDetails></ContestDetails>
        </PrivateRoute>
      },
      {
        path: "/submit-content/:contestId",
        element: <PrivateRoute>
            <ContinueArena></ContinueArena>
        </PrivateRoute>
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "overview",
        Component: Overview,
      },
      {
        path: "my-contests",
        Component: MyContest,
      },
      {
        path: "create",
        Component: CreateContest,
      },
      {
        path:'approve-contests',
        Component: ApproveContests
      },
    ],
  },
]);
