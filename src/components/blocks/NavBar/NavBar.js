import React from 'react';
import styles from './NavBar.module.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';

const NavBar = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        const path = "/";
        window.location.href = path;
    };

    const handleSearch = () => {
        console.log('Search clicked');
    };

    return (
        <div className={styles.navbar}>
            <Box className={styles.MuiBox} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <div></div>
                <div>
                    <TextField
                        id="search"
                        className={styles.textField}
                        label="Поиск"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton className={styles.MuiButton} color="inherit" onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <IconButton className={styles.exitButton} color="inherit" onClick={handleLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        </div>
    );
};

export default NavBar;