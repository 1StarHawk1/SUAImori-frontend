import SignIn from "../components/pages/AuthPage/SignIn";
import SignUp from "../components/pages/AuthPage/SignUp";
import MainPage from "../components/pages/MainPage/MainPage";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";
import TitlePage from "../components/pages/TitlePage/TitlePage";

export const publicRoutes = [
    {path: '/signin', element: <SignIn />, exact: true},
    {path: '/signup', element: <SignUp />, exact: true},
    {path: '/', element: <MainPage />, exact: true},
    {path: '/profile/:username?', element: <ProfilePage />, exact: true},
    {path: '/title/:id?', element: <TitlePage />, exact: true},
]

export const privateRoutes = [
    ...publicRoutes
]
