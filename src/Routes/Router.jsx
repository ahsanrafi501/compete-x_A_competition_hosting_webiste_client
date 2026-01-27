import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Page/Home";
import Login from "../Page/Auth/Login/Login";
import Registration from "../Page/Auth/Registration/Registration";

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
        }
    ]
},
]);

