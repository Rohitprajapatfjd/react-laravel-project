import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./component/DefaultLayout";
import Dashboard from "./view/Dashboard";
import Users from "./view/Users";
import GuestLayout from "./component/GuestLayout";
import Login from "./view/Login";
import SignIn from "./view/SignIn";
import NotFound from "./view/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to='/user' />,
            },
            {
                path: "/Dashboard",
                element: <Dashboard />,
            },
            {
                path: "/user",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signIn",
                element: <SignIn />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound/>
    },
]);

export default router;
