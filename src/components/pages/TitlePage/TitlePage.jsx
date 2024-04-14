import React, {useEffect, useState} from 'react';
import styles from "./TitlePage.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import {UserService} from "../../../API/UserService";
import {TitleService} from "../../../API/TitleService";
import {useParams} from "react-router-dom";
import {Title} from '../../../API/model/Title.tsx';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, Modal} from "@mui/material";

const TitlePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [title: Title, setTitle] = useState(null);
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {id} = useParams();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addTitleToList = (list) => {
        // Здесь добавьте логику добавления тайтла в выбранный список
        closeModal();
    };

    useEffect(() => {
        getTitle().then(() => setIsLoading(false));
    }, []);

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
                <div className={styles.menubar}>
                    <MenuBar/>
                </div>
                <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                    <div className={styles.navbar}>
                        <NavBar/>
                    </div>
                    <div className={styles.page}>
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
                            <div className={styles.buttons}>
                                {token && (
                                    <>
                                        <Button variant="contained" onClick={openModal}>Добавить в список</Button><br/><br/>
                                        <Dialog
                                            open={isModalOpen}
                                            onClose={closeModal}
                                        >
                                            <DialogTitle>Выберите список</DialogTitle>
                                            <DialogContent>
                                                {/* Здесь отобразите списки пользователя */}
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => addTitleToList(/* выбранный список */)}>Добавить</Button>
                                                <Button onClick={closeModal}>Отмена</Button>
                                            </DialogActions>
                                        </Dialog>
                                        {/* ... */}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h2>Описание</h2>
                            <p>{title.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default TitlePage;