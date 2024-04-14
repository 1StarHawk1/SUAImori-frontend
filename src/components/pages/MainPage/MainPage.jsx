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

const MainPage = () => {
    const [isOpen, setIsOpen] = useState(true);

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
                <div className={styles.menubar}><MenuBar/></div>
                <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                    <div className={styles.navbar}><NavBar/></div>
                    <div className={styles.list}>
                        <div className={styles.categoryTitle}>Аниме</div>
                        <CardList
                            getIDs={getAnimeIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={"/signin"}/>}
                        />

                        <div className={styles.categoryTitle}>Манга</div>
                        <CardList
                            getIDs={getMangaIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={"/signin"}/>}
                        />

                        <div className={styles.categoryTitle}>Сейчас на экранах</div>
                        <CardList
                            getIDs={getOngoingIDs}
                            getItem={getAnime}
                            renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4}
                                                             titlePageUrl={"/signin"}/>}
                        />

                        <div className={styles.categoryTitle}>Популярные сообщества</div>
                        <CardList
                            getIDs={getClubIDs}
                            getItem={getClub}
                            renderCard={(item) => <ClubCard club={item} aspectRatio={3 / 3} clubPageUrl={"/signin"}/>}
                        />
                    </div>

                </div>
            </div>

        </>
    );
};

export default MainPage;