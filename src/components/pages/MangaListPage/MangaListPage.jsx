import * as React from 'react';
import {TitleService} from "../../../API/TitleService";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {useState, useEffect} from "react";
import styles from './MangaListPage.module.css';
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";

const MangaListPage = () => {
    const [mangaList, setList] = useState([]);

    const fetchManga = async () => {
        try {
            const response = await TitleService.getMangaIDs();
            const mangaIDs = await response.json();
            const mangaList = await Promise.all(mangaIDs.map(async id => {
                const response = await TitleService.getTitle(id, ["name", "posterURL"]);
                return response.json();
            }));
            setList(mangaList);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchManga();
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
                        <div className={styles.mangaListPage}>
                            {mangaList.map(manga => (
                                <TitleCard key={manga.id} title={manga} aspectRatio={3 / 4}
                                           titlePageUrl={`/title/${manga.id}`}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MangaListPage;