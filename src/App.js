import React from 'react';
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import AppRouter from "./components/AppRouter";
const App = () => {
    return (
        <AuthContext.Provider value={{

        }}>
            <BrowserRouter>
                <MainPage/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;