import React, {useState} from 'react';
import styles from './MenuBar.module.css';
import Avatar from "@mui/material/Avatar";
import {List, ListItem} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const isTokenExpired = (token) => {
        if (!token) {
            return true;
        }
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    return (
        <div className={`${styles.menubar} ${isOpen ? styles.open : ''}`}>
            <Box display="flex" justifyContent="center" alignItems="center" height="70px">
                <Avatar alt={decodedToken ? decodedToken.sub : 'User'} src="/static/images/avatar/1.jpg"
                        onClick={() => console.log('Avatar clicked')}/> </Box>
            <List className={styles.MuiList}>
                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={"/"}>
                        <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained">Главная</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained" onClick={() => {
                        const path = isTokenExpired(token) ? "/signin" : "/profile/" + (decodedToken ? decodedToken.sub.toString() : '');
                        window.location.href = path;
                    }}>Профиль</Button>
                </ListItem>

                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={"/anime"}>
                        <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained">Аниме</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={"/manga"}>
                        <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained"
                                >Манга</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={"/clubs"}>
                        <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained"
                                >Клубы</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button style={{backgroundColor: '#7A8B99'}} className={styles.MuiButton} variant="contained">Пользователи</Button>
                </ListItem>
            </List>
        </div>
    );
};

export default MenuBar;