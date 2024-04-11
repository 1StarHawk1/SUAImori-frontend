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

    const isTokenExpired = (token) => {
        if(!token){
            return true;
        }
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    return (
        <div className={`${styles.menubar} ${isOpen ? styles.open : ''}`}>
            <Box display="flex" justifyContent="center" alignItems="center" height="70px">
                <Avatar alt={jwtDecode(localStorage.getItem("token")).sub} src="/static/images/avatar/1.jpg"
                        onClick={() => console.log('Avatar clicked')}/>
            </Box>
            <List className={styles.MuiList}>
                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={isTokenExpired(localStorage.getItem("token")) ? "/signin" : "/profile"}>
                        <Button className={styles.MuiButton} variant="contained">Профиль</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Link className={styles.MuiLink} to={"/"}>
                        <Button className={styles.MuiButton} variant="contained">Главная страница</Button>
                    </Link>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button className={styles.MuiButton} variant="contained"
                            onClick={() => console.log('Button 3 clicked')}>Button 3</Button>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button className={styles.MuiButton} variant="contained"
                            onClick={() => console.log('Button 4 clicked')}>Button 4</Button>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button className={styles.MuiButton} variant="contained"
                            onClick={() => console.log('Button 5 clicked')}>Button 5</Button>
                </ListItem>
                <ListItem className={styles.MuiListItem}>
                    <Button className={styles.MuiButton} variant="contained" >Button 6</Button>
                </ListItem>
            </List>
        </div>
    );
};

export default MenuBar;