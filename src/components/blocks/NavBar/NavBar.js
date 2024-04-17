import React from 'react';
import styles from './NavBar.module.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {Link, useHistory} from 'react-router-dom';

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
            <Box className={styles.MuiBox} display="flex" justifyContent="space-between" alignItems="center"
                 width="100%">
                <div></div>
                <div>
                    {/*<TextField*/}
                    {/*    id="search"*/}
                    {/*    className={styles.textField}*/}
                    {/*    label="Поиск"*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                <IconButton className={styles.MuiButton} color="inherit" onClick={handleSearch}>*/}
                    {/*                    <SearchIcon />*/}
                    {/*                </IconButton>*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
                {localStorage.getItem('token') ? (
                    <IconButton style={{marginTop: '15px'}} color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon/>
                    </IconButton>
                ) : (
                    <Link to="/signin" style={{color:'#585123'}}>
                        <IconButton style={{marginTop: '15px'}} color="inherit">
                            <AccessibleForwardIcon />
                            <MeetingRoomIcon/>
                        </IconButton>
                    </Link>
                )}
            </Box>
        </div>
    );
};

export default NavBar;