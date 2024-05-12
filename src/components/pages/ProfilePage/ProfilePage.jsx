import React, {useEffect, useState} from 'react';
import MenuBar from "../../blocks/MenuBar/MenuBar";
import Avatar from "@mui/material/Avatar";
import {Link, useNavigate, useParams} from "react-router-dom";
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
    const [newUserInfo, setNewUserInfo] = useState({
        nickname: '',
        description: '',
        avatarURL: '',
        profileWallpaperURL: '',
        email: ''
    });

    const navigate = useNavigate();

    const [openClubDialog, setOpenClubDialog] = useState(false);
    const [newClub: Club, setNewClub] = useState({
        name: '',
        imageURL: '',
        description: ''
    });

    const handleOpenClubDialog = () => {
        setOpenClubDialog(true);
    };

    const handleCloseClubDialog = () => {
        setOpenClubDialog(false);
        getClubs();
    };


    const createClub = async () => {
        if(newClub.name.length > 255 || newClub.imageURL.length > 255 || newClub.description.length > 255){
            alert("Превышена длина одного из полей");
            return;
        }
        else if(newClub.name.length === 0){
            alert("Обязательно заполните поле 'Название клуба'");
            return;
        }

        try {
            await ClubService.createClub(newClub);
            handleCloseClubDialog();
        } catch (e) {
            console.error(e);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setListName(event.target.value);
    };

    const handleInputChangeClub = (event, field) => {
        setNewClub({
            ...newClub,
            [field]: event.target.value
        });
    };

    const setNewInfo = (event, field) => {
        setNewUserInfo({
            ...newUserInfo,
            [field]: event.target.value
        });
    };

    const addUserList = (listName) => {
        if(listName.length > 255){
            alert('Слишком больше имя списка');
            return;
        }
        else if(listName.length === 0){
            alert('Введите имя списка');
            return;
        }
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
            const response = await UserService.getUser(username, ["nickname", "avatarURL", "description", "profileWallpaperURL", "email"]);
            const data = await response.json();
            if(Object.keys(data).length === 0 && data.constructor === Object) {
                navigate('/NotFound');
                return;
            }
            setUser(data);
            // Инициализация newUserInfo данными пользователя
            setNewUserInfo({
                nickname: data.nickname,
                description: data.description,
                avatarURL: data.avatarURL,
                profileWallpaperURL: data.profileWallpaperURL,
                email: data.email
            });
            console.log(data);
            await getLists();
            await getClubs();
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const updateUser = async (newUserInfo) => {
        if(newUserInfo.email.length >255 || newUserInfo.nickname.length > 50 || newUserInfo.avatarURL.length > 255 || newUserInfo.profileWallpaperURL.length > 255 || newUserInfo.description.length > 255){
            alert("Превышена длина одного из полей");
            return;
        }

        try {
            await UserService.updateUser(username, newUserInfo);
            setUser(newUserInfo);
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
            <div className={commonStyles.page}>
                <div className={styles.banner}>
                    <img src={user.profileWallpaperURL} alt="Banner"/>
                </div>
                <div className={commonStyles.content}>

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
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}}
                                onClick={() => setContent('description')}>Описание</Button>
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}}
                                onClick={() => setContent('lists')}>Списки</Button>
                        {/*<Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}} onClick={() => setContent('friends')}>Друзья</Button>*/}
                        <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}}
                                onClick={() => setContent('clubs')}>Клубы</Button>
                        {isCurrentUser && (
                            <Button
                                style={{backgroundColor: '#7A8B99', borderColor: '#393E41'}}
                                onClick={() => setContent('settings')}
                            >
                                Настройки
                            </Button>
                        )}
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

                                <Button style={{backgroundColor: '#7A8B99', color: 'white', border: 'none'}}
                                        variant="outlined" onClick={handleClickOpen}>Добавить список</Button>

                            )}</div>}
                        {content === 'friends' && <div>Здесь будет информация о друзьях</div>}
                        {content === 'clubs' && <div>
                            {clubs && clubs.map((club) => (
                                <div key={club.id}>
                                    <Link className={styles.listlink} to={`/club/${club.id}`}>
                                        <h3>{club.name}</h3>
                                    </Link>
                                </div>
                            ))}
                            {isCurrentUser && (
                            <Button style={{backgroundColor: '#7A8B99', color: 'white', border: 'none'}}
                                    variant="outlined" onClick={handleOpenClubDialog}>Создать клуб</Button>)}
                        </div>}

                        <Dialog open={openClubDialog} onClose={handleCloseClubDialog}>
                            <DialogTitle>Создать клуб</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Название клуба"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newClub.name}
                                    onChange={(e) => handleInputChangeClub(e, 'name')}
                                    autoComplete="new-password"
                                />
                                <TextField
                                    margin="dense"
                                    id="imageURL"
                                    label="URL баннера"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newClub.imageURL}
                                    onChange={(e) => handleInputChangeClub(e, 'imageURL')}
                                    autoComplete="new-password"
                                />
                                <TextField
                                    margin="dense"
                                    id="description"
                                    label="Описание"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={newClub.description}
                                    onChange={(e) => handleInputChangeClub(e, 'description')}
                                    autoComplete="new-password"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseClubDialog}>Отмена</Button>
                                <Button onClick={createClub}>Создать</Button>
                            </DialogActions>
                        </Dialog>
                        {content === 'settings' && (
                            <div>
                                <form>
                                    <TextField
                                        className={styles.input}
                                        style={{margin: '10px'}}
                                        label="Никнейм"
                                        value={newUserInfo.nickname}
                                        onChange={(e) => setNewInfo(e, 'nickname')}
                                        maxLength={50}
                                    />
                                    <TextField
                                        className={styles.input}
                                        style={{margin: '10px'}}
                                        label="Email"
                                        value={newUserInfo.email}
                                        onChange={(e) => setNewInfo(e, 'email')}
                                        maxLength={200}
                                    />
                                    <TextField
                                        className={styles.input}
                                        style={{margin: '10px'}}
                                        label="URL аватара"
                                        value={newUserInfo.avatarURL}
                                        onChange={(e) => setNewInfo(e, 'avatarURL')}
                                        maxLength={200}
                                    />
                                    <TextField
                                        className={styles.input}
                                        style={{margin: '10px'}}
                                        label="URL обоев профиля"
                                        value={newUserInfo.profileWallpaperURL}
                                        onChange={(e) => setNewInfo(e, 'profileWallpaperURL')}
                                        maxLength={200}
                                    />
                                    <TextField
                                        style={{width: '780px', margin: '10px'}}
                                        className={styles.input}
                                        label="Описание"
                                        value={newUserInfo.description}
                                        onChange={(e) => setNewInfo(e, 'description')}
                                        maxLength={255}
                                    />
                                    <Button style={{marginTop: '10px'}} className={styles.button}
                                            onClick={() => updateUser(newUserInfo)} variant={"contained"}>Сохранить
                                        изменения</Button>
                                </form>
                            </div>
                        )}
                    </div>
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