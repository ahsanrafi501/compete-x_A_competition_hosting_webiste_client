import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Login from "../Page/Auth/Login/Login";
import Registration from "../Page/Auth/Registration/Registration";
import Home from "../Page/Home/Home";
import MyProfile from "../Page/MyProfile/MyProfile";

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
        }
    ]
},
]);

