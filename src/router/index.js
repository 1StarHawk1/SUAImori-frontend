import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";



export const publicRoutes = [
    {path: '/login', component: Login, exact: true}
]

export const privateRoutes = [
    ...publicRoutes
]
