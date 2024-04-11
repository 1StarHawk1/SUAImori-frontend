import SignIn from "../components/pages/AuthPage/SignIn";
import SignUp from "../components/pages/AuthPage/SignUp";
import MainPage from "../components/pages/MainPage/MainPage";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";

export const publicRoutes = [
    {path: '/signin', element: <SignIn />, exact: true},
    {path: '/signup', element: <SignUp />, exact: true},
    {path: '/', element: <MainPage />, exact: true},
    {path: '/profile', element: <ProfilePage />, exact: true},
]

export const privateRoutes = [
    ...publicRoutes
]
