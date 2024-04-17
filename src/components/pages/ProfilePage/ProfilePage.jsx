import React, {useEffect, useState} from 'react';
import MenuBar from "../../blocks/MenuBar/MenuBar";
import Avatar from "@mui/material/Avatar";
import {Link, useParams} from "react-router-dom";
import styles from './ProfilePage.module.css';
import commonStyles from '../../../styles/commonStyles.module.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {TitleService} from "../../../API/TitleService";
import {jwtDecode} from "jwt-decode";
import {User} from '../../../API/model/User.tsx';
import {UserService} from "../../../API/UserService";
import {ListService} from "../../../API/ListService";
import {List} from "../../../API/model/List.tsx";
import {Club} from "../../../API/model/Club.tsx";
import {ClubService} from "../../../API/ClubService";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user: User, setUser] = useState(null);
    const [lists: List[], setLists] = useState([]);
    const [clubs: Club[], setClubs] = useState([]);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const [content, setContent] = useState('description');
    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState('');
    const {username} = useParams();
    const isCurrentUser = decodedToken && decodedToken.sub === username;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setListName(event.target.value);
    };

    const addUserList = (listName) => {
        ListService.addList(listName);
        handleClose();
    };


    useEffect(() => {
        getUser().then(() => setIsLoading(false));
    }, []);

    const getLists = async () => {
        try {
            const data = await ListService.getUserLists(username);
            setLists(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getClubs = async () => {
        try {
            const data = await ClubService.getUserClubs(username);
            setClubs(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getUser = async () => {
        try {
            const response = await UserService.getUser(username, ["nickname", "avatarURL", "description", "profileWallpaperURL"]);
            const data = await response.json();
            setUser(data);
            console.log(data);
            await getLists();
            await getClubs();
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={commonStyles.pageBody}>
            <div className={commonStyles.menubar}><MenuBar/></div>
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
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}} onClick={() => setContent('description')}>Описание</Button>
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}} onClick={() => setContent('lists')}>Списки</Button>
                        {/*<Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}} onClick={() => setContent('friends')}>Друзья</Button>*/}
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}} onClick={() => setContent('clubs')}>Клубы</Button>
                        <Link to={'/settings'}>
                            <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}}> Настройки</Button>
                        </Link>
                    </ButtonGroup>
                    <div className={styles.description}>
                        {content === 'description' && <div className={styles.description}>{user.description}</div>}
                        {content === 'lists' && <div>
                            {lists && lists.map((list) => (
                                <div key={list.id}>
                                    <Link className={styles.listlink} to={`/list/${list.id}`}>
                                        <h3>{list.name}</h3>
                                    </Link>
                                </div>
                            ))}
                            {isCurrentUser && (

                                <Button style={{backgroundColor: '#7A8B99', color:'white', border: 'none'}} variant="outlined" onClick={handleClickOpen}>Добавить список</Button>

                            )}</div>}
                        {content === 'friends' && <div>Здесь будет информация о друзьях</div>}
                        {content === 'clubs' && <div>
                            {clubs && clubs.map((club) => (
                            <div key={club.id}>
                                <Link className={styles.listlink} to={`/club/${club.id}`}>
                                    <h3>{club.name}</h3>
                                </Link>
                            </div>
                        ))}</div>}</div>
                </div>

            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить список</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название списка"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={listName}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={() => addUserList(listName)}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
        ;
};

export default ProfilePage;