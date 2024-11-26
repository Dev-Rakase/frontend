import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ErrorComponent from "../components/ErrorComponent";

export const routes = createBrowserRouter([
    {
        path: "/",
        index: true,
        element: <Login />,
        errorElement: <ErrorComponent />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorComponent />
    }
])