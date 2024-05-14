import React, {useEffect, useState} from 'react';
import styles from "./TitlePage.module.css";
import commonStyles from '../../../styles/commonStyles.module.css';
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import {UserService} from "../../../API/UserService";
import {TitleService} from "../../../API/TitleService";
import {useNavigate, useParams} from "react-router-dom";
import {Title} from '../../../API/model/Title.tsx';
import Button from "@mui/material/Button";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
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

    const navigate = useNavigate();

    let isAdmin = false;
    if (!(token === null || decodedToken === null)) {
        const role = decodedToken.role;
        isAdmin = role.includes('ROLE_ADMIN') ?  true : false;
    }

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

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleConfirmDelete = () => {
        TitleService.deleteTitle(id);
        navigate(`/`);
        handleCloseDialog();
    };

    const getTitle = async () => {
        try {
            const response = await TitleService.getTitle(id, ["complitionDate", "description", "isNSFW", "itemCount", "name", "posterURL", "releaseDate", "status", "type"]);
            const data = await response.json();
            if(Object.keys(data).length === 0 && data.constructor === Object) {
                navigate('/NotFound');
                return;
            }
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
                                <h4>Дата выхода: {new Date(title.releaseDate).toLocaleDateString()}</h4>
                                <h4>Дата завершения: {title.complitionDate ===0 ? new Date(title.complitionDate).toLocaleDateString() : "Не окончено"}</h4>
                                <h4>Количество эпизодов: {title.itemCount}</h4>
                                <h4>NSFW: {title.isNSFW ? 'Да' : 'Нет'}</h4>

                            </div>

                        </div>
                        <div className={styles.buttons}>
                            {token && (
                                <>
                                    <Button style={{width : '300px',marginBottom:'20px', backgroundColor: '#85756E'}} variant="contained" onClick={openModal}>Добавить в список</Button>
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
                            {/*{isAdmin && (*/}
                            {/*    <Button style={{width : '300px',marginBottom:'20px', backgroundColor: '#85756E'}} variant="contained" onClick={() => navigate(`/editTitle/${id}`)}>Редактировать</Button>*/}
                            {/*)}*/}
                            {isAdmin && (
                                <>
                                    <Button style={{width : '300px', backgroundColor: '#ff2400'}} variant="contained" onClick={handleOpenDialog}>Удалить</Button>
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                    >
                                        <DialogTitle>{"Подтвердите удаление"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Действительно ли вы хотите удалить данный тайтл? Это действие нельзя будет отменить.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDialog}>Отмена</Button>
                                            <Button style={{color:'red'}} onClick={handleConfirmDelete}>Удалить</Button>
                                        </DialogActions>
                                    </Dialog>
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