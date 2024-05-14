import SignIn from "../components/pages/AuthPage/SignIn";
import SignUp from "../components/pages/AuthPage/SignUp";
import MainPage from "../components/pages/MainPage/MainPage";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";
import TitlePage from "../components/pages/TitlePage/TitlePage";
import ListPage from "../components/pages/ListPage/ListPage";
import ClubPage from "../components/pages/ClubPage/ClubPage";
import AnimeListPage from "../components/pages/AnimeListPage/AnimeListPage";
import MangaListPage from "../components/pages/MangaListPage/MangaListPage";
import ClubListPage from "../components/pages/ClubListPage/ClubListPage";
import NotFoundPage from '../components/pages/NotFoundPage/NotFoundPage';
import CreateTitlePage from "../components/pages/CreateTitlePage/CreateTitlePage";

export const publicRoutes = [
    {path: '/signin', element: <SignIn />, exact: true},
    {path: '/signup', element: <SignUp />, exact: true},
    {path: '/', element: <MainPage />, exact: true},
    {path: '/profile/:username?', element: <ProfilePage />, exact: true},
    {path: '/title/:id?', element: <TitlePage />, exact: true},
    {path: '/list/:id?', element: <ListPage />, exact: true},
    {path: '/club/:id?', element: <ClubPage />, exact: true},
    {path: '/anime', element: <AnimeListPage />, exact: true},
    {path: '/manga', element: <MangaListPage />, exact: true},
    {path: '/clubs', element: <ClubListPage />, exact: true},
    {path: '*', element: <NotFoundPage />}
]

export const privateRoutes = [
    {path: '/createTitle', element: <CreateTitlePage />, exact: true},
    ...publicRoutes
]
