import React from 'react';
import styles from './NavBar.module.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <Box className={styles.MuiBox} display="flex" justifyContent="center" alignItems="center" width="100%">
                <TextField id="search" className={styles.textField} label="Поиск"/>
                <Button className={styles.MuiButton} variant="contained" color="primary"
                        onClick={() => console.log('Search clicked')}>Поиск</Button>
            </Box>
        </div>
    );
};

export default NavBar;