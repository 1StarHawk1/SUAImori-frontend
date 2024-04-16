import React, {useEffect, useState} from 'react';
import styles from "./TitlePage.module.css";
import commonStyles from '../../../styles/commonStyles.module.css';
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import {UserService} from "../../../API/UserService";
import {TitleService} from "../../../API/TitleService";
import {useParams} from "react-router-dom";
import {Title} from '../../../API/model/Title.tsx';
import Button from "@mui/material/Button";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Modal,
    Radio,
    RadioGroup, Snackbar
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {ListService} from "../../../API/ListService";
import {jwtDecode} from "jwt-decode";

const TitlePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [title: Title, setTitle] = useState(null);
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const decodedToken = token ? jwtDecode(token) : null;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const {id} = useParams();

    const [userLists, setUserLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        getTitle().then(() => setIsLoading(false));
    }, []);


    const getLists = async () => {
        try {
            const data = await ListService.getUserLists(decodedToken.sub);
            setUserLists(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };


    const handleRadioChange = (event) => {
        setSelectedList(event.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true);
        getLists();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const addTitleToList = (list) => {
        ListService.addTitle(list, id, showError);
        closeModal();
    };

    const showError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const getTitle = async () => {
        try {
            const response = await TitleService.getTitle(id, ["complitionDate", "description", "isNSFW", "itemCount", "name", "posterURL", "releaseDate", "status", "type"]);
            const data = await response.json();
            setTitle(data);
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
        <div>
            <div className={styles.titlepage}>
                <div className={commonStyles.menubar}>
                    <MenuBar/>
                </div>
                <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                    <div>
                        <NavBar/>
                    </div>
                    <div className={commonStyles.page}>
                        <div className={styles.header}>
                            <img src={title.posterURL} alt={title.name} className={styles.poster}/>
                            <div>
                                <h2>{title.name}</h2>
                                <h3>{title.type === 'MANGA' ? 'Манга' : title.type === 'ANIME' ? 'Аниме' : title.type}</h3>
                                <h4>Статус
                                    {
                                        title.status === "ONGOING" ? ': Онгоинг' :
                                            title.status === "COMPLETED" ? ': Завершен' : ': Анонс'
                                    }
                                </h4>
                                <h4>Дата выхода: {title.releaseDate}</h4>
                                <h4>Дата завершения: {title.complitionDate}</h4>
                                <h4>Количество эпизодов: {title.itemCount}</h4>
                                <h4>NSFW: {title.isNSFW ? 'Да' : 'Нет'}</h4>

                            </div>

                        </div>
                        <div className={styles.buttons}>
                            {token && (
                                <>
                                    <Button style={{width : '300px', backgroundColor: '#A22C29'}} variant="contained" onClick={openModal}>Добавить в список</Button><br/><br/>
                                    <Dialog
                                        open={isModalOpen}
                                        onClose={closeModal}
                                    >
                                        <DialogTitle>Выберите список</DialogTitle>
                                        <DialogContent>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="user-lists"
                                                    value={selectedList}
                                                    onChange={handleRadioChange}
                                                >
                                                    {userLists && userLists.map((list) => (
                                                        <FormControlLabel
                                                            key={list.id}
                                                            value={list.id}
                                                            control={<Radio />}
                                                            label={list.name}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() => addTitleToList(selectedList)}>Добавить</Button>
                                            <Button onClick={closeModal}>Отмена</Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* ... */}
                                </>
                            )}
                        </div>
                        <div className={styles.description}>
                            <h2>Описание</h2>
                            <p>{title.description}</p>
                        </div>

                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
        ;
};

export default TitlePage;