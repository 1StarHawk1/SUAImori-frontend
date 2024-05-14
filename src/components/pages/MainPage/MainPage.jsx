import * as React from 'react';
import {TitleService} from "../../../API/TitleService";
import {ClubService} from "../../../API/ClubService";
import CardList from "../../blocks/CardList/CardList";
import {ClubCard} from "../../atoms/ClubCard/ClubCard";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import styles from './MainPage.module.css';
import {useState} from "react";
import NavBar from "../../blocks/NavBar/NavBar";
import {jwtDecode} from "jwt-decode";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    let isAdmin = false;
    if (!(token === null || decodedToken === null)) {
        const role = decodedToken.role;
        isAdmin = role.includes('ROLE_ADMIN') ?  true : false;
    }

    const getAnimeIDs = async () => {
        try {
            const response = await TitleService.getAnimeIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getMangaIDs = async () => {
        try {
            const response = await TitleService.getMangaIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getOngoingIDs = async () => {
        try {
            const response = await TitleService.getOngoingAnimeIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getAnime = async (id) => {
        try {
            const response = await TitleService.getTitle(id, ["name", "posterURL"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    const getClubIDs = async () => {
        try {
            const response = await ClubService.getAllIDs();
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    const getClub = async (id) => {
        try {
            const response = await ClubService.getClub(id, ["name", "imageURL"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>

            <div className={styles.mainpage}>
                <div><MenuBar/></div>

                <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                    <div className={styles.navbar}><NavBar/></div>
                    <div className={styles.list}>
                        {isAdmin &&(
                            <Link className={styles.MuiLink} to={"/createTitle"}>
                                <Button
                                    style={{backgroundColor: '#7A8B99', borderColor: '#393E41', marginTop: '20px',marginBottom:'20px', width:'100%'}
                                    /*onClick={() => */} variant="contained">Добавить тайтл</Button>
                            </Link>
                        )}
                        <div className={styles.categoryTitle}>Аниме</div>
                        <CardList
                            getIDs={getAnimeIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={`/title/${item.id}`}/>}
                        />

                        <div className={styles.categoryTitle}>Манга</div>
                        <CardList
                            getIDs={getMangaIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={`/title/${item.id}`}/>}
                        />

                        <div className={styles.categoryTitle}>Сейчас на экранах</div>
                        <CardList
                            getIDs={getOngoingIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={`/title/${item.id}`}/>}
                        />

                        <div className={styles.categoryTitle}>Популярные сообщества</div>
                        <CardList className={styles.clubList}
                                  getIDs={getClubIDs}
                                  getItem={getClub}
                                  renderCard={(item) => <ClubCard club={item} aspectRatio={3 / 3}
                                                                  clubPageUrl={`/club/${item.id}`}/>}
                        />
                    </div>

                </div>
            </div>

        </>
    );
};

export default MainPage;