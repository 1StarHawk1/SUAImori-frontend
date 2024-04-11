import React, {useEffect, useState} from 'react';
import NavBar from "../../blocks/NavBar/NavBar";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import styles from './ProfilePage.module.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {TitleService} from "../../../API/TItleService";
import {jwtDecode} from "jwt-decode";
import { User } from '../../../API/model/User.tsx';
import {UserService} from "../../../API/UserService";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user : User, setUser] = useState(null);
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    useEffect(() => {
        getUser().then(() => setIsLoading(false));
    }, []);

    const getUser = async () => {
        try {
            const response = await UserService.getUser(decodedToken.sub, ["nickname", "avatarURL", "description", "profileWallpaperURL"]);
            const data = await response.json();
            setUser(data);
            console.log(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.pageBody}>
            <div className={styles.menubar}><MenuBar/></div>
            <div className={styles.page}>
                <div className={styles.banner}>
                    {/* Здесь вы можете добавить обои */}
                    <img src={user.profileWallpaperURL} alt="Banner"/>
                </div>
                <div className={styles.content}>

                    <div className={styles.profileInfo}>
                        <Avatar
                            alt="User"
                            src={user.avatarURL}
                            sx={{width: 100, height: 100}}
                        />
                        <h2>{user.nickname}</h2>
                        <h3>{user.username}</h3>
                    </div>
                    <ButtonGroup size="large" aria-label="Large button group" variant="contained" aria-label="Basic button group">
                        <Link to={'/lists'}>
                            <Button>Списки</Button>
                        </Link>
                        <Link to={'/friends'}>
                            <Button>Друзья</Button>
                        </Link>
                        <Link to={'/clubs'}>
                            <Button>Клубы</Button>
                        </Link>
                        <Link to={'/settings'}>
                            <Button>Настройки</Button>
                        </Link>
                    </ButtonGroup>
                    <div className={styles.description}>{user.description}</div>
                </div>

            </div>
        </div>
    )
        ;
};

export default ProfilePage;