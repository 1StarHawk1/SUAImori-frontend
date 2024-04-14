import React, {useEffect, useState} from 'react';
import MenuBar from "../../blocks/MenuBar/MenuBar";
import Avatar from "@mui/material/Avatar";
import {Link, useParams} from "react-router-dom";
import styles from './ProfilePage.module.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {TitleService} from "../../../API/TitleService";
import {jwtDecode} from "jwt-decode";
import {User} from '../../../API/model/User.tsx';
import {UserService} from "../../../API/UserService";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user: User, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const [content, setContent] = useState('description');

    const {username} = useParams();

    useEffect(() => {
        getUser().then(() => setIsLoading(false));
    }, []);

    const getUser = async () => {
        try {
            const response = await UserService.getUser(username, ["nickname", "avatarURL", "description", "profileWallpaperURL"]);
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
                    <img src={user.profileWallpaperURL} alt="Banner"/>
                </div>
                <div className={styles.content}>

                    <div>
                        <Avatar
                            alt="User"
                            src={user.avatarURL}
                            sx={{width: 100, height: 100}}
                        />
                        <h2>{user.nickname}</h2>
                        <h3>{user.username}</h3>
                    </div>
                    <ButtonGroup size="large" aria-label="Large button group" variant="contained"
                                 aria-label="Basic button group">
                        <Button onClick={() => setContent('description')}>Описание</Button>
                        <Button onClick={() => setContent('lists')}>Списки</Button>
                        <Button onClick={() => setContent('friends')}>Друзья</Button>
                        <Button onClick={() => setContent('clubs')}>Клубы</Button>
                        <Link to={'/settings'}>
                            <Button>Настройки</Button>
                        </Link>
                    </ButtonGroup>
                    <div className={styles.description}>
                        {content === 'description' && <div className={styles.description}>{user.description}</div>}
                        {content === 'lists' && <div>Здесь будет информация о списках</div>}
                        {content === 'friends' && <div>Здесь будет информация о друзьях</div>}
                        {content === 'clubs' && <div>Здесь будет информация о клубах</div>}</div>
                </div>

            </div>
        </div>
    )
        ;
};

export default ProfilePage;