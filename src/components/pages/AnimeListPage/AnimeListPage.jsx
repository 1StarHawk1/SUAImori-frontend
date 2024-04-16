import * as React from 'react';
import {TitleService} from "../../../API/TitleService";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {useState, useEffect} from "react";
import styles from './AnimeListPage.module.css';
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";

const AnimeListPage = () => {
    const [animeList, setAnimeList] = useState([]);

    const fetchAnime = async () => {
        try {
            const response = await TitleService.getAnimeIDs();
            const animeIDs = await response.json();
            const animeList = await Promise.all(animeIDs.map(async id => {
                const response = await TitleService.getTitle(id, ["name", "posterURL"]);
                return response.json();
            }));
            console.log(animeList);
            setAnimeList(animeList);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchAnime();
    }, []);

    return (
        <div>
            <div className={styles.listpage}>
                <div className={commonStyles.menubar}>
                    <MenuBar/>
                </div>
                <div className={`${commonStyles.content} `}>
                    <div>
                        <NavBar/>
                    </div>
                    <div className={commonStyles.page}>
                        <div className={styles.animeListPage}>
                            {animeList.map(anime => (
                                <TitleCard key={anime.id} title={anime} aspectRatio={3 / 4}
                                           titlePageUrl={`/title/${anime.id}`}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimeListPage;