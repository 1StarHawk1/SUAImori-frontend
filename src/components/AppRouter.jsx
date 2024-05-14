import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import {jwtDecode} from "jwt-decode";


const AppRouter = () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    let isAdmin = false;
    if (!(token === null || decodedToken === null)) {
        const role = decodedToken.role;
        isAdmin = role.includes('ROLE_ADMIN') ?  true : false;
    }

    return (

        isAdmin ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        key={route.path}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;
