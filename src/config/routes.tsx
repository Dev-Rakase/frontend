import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ErrorComponent from "../components/ErrorComponent";
import ProtectedRouteContext from "../context/ProtectedRouteContext";

export const routes = createBrowserRouter([
    {
        path: "/",
        index: true,
        element: <Login />,
        errorElement: <ErrorComponent />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRouteContext>
                <Dashboard />
            </ProtectedRouteContext>
        ),
        errorElement: <ErrorComponent />
    }
])