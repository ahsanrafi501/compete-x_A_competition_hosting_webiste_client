import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Page/Auth/Login/Login";
import Registration from "../Page/Auth/Registration/Registration";
import Home from "../Page/Home/Home";
import MyProfile from "../Page/MyProfile/MyProfile";
import AllContest from "../Page/AllContest/AllContest";
import MyEnrolledContest from "../Page/myEnrolledContest/MyEnrolledContest";
import LeaderBoard from "../Page/LeaderBoard/LeaderBoard";
import Dashboard from "../Page/ Dashboard/Dashboard";

export const router = createBrowserRouter([
  { path: "/", 
    Component: RootLayout,
    children:[
        {
            index:true,
            Component: Home,
        },
        {
            path:'/registration',
            Component: Registration
        },
        {
            path:'/login',
            Component:Login,
        },
        {
            path:'/profile',
            Component: MyProfile
        },
        {
            path:'/all-contests',
            Component: AllContest
        },
        {
            path:'/my-enroll-contest',
            Component: MyEnrolledContest
        },
        {
            path:'/leaderboard',
            Component: LeaderBoard
        },
        {
            path:'/dashboard',
            Component: Dashboard
        },
    ]
},
]);

