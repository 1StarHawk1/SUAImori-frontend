import SignIn from "../components/pages/AuthPage/SignIn";
import SignUp from "../components/pages/AuthPage/SignUp";
import MainPage from "../components/pages/MainPage/MainPage";

export const publicRoutes = [
    {path: '/signin', element: <SignIn />, exact: true},
    {path: '/signup', element: <SignUp />, exact: true},
    {path: '/', element: <MainPage />, exact: true},
]

export const privateRoutes = [
    ...publicRoutes
]
