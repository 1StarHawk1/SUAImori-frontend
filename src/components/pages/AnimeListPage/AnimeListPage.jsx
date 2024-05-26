import * as React from 'react';
import {TitleService} from "../../../API/TitleService";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {useState, useEffect} from "react";
import styles from './AnimeListPage.module.css';
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import Button from "@mui/material/Button";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";

const AnimeListPage = () => {
    const [animeList, setAnimeList] = useState([]);
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    let isAdmin = false;
    if (!(token === null || decodedToken === null)) {
        const role = decodedToken.role;
        isAdmin = role.includes('ROLE_ADMIN') ?  true : false;
    }

    const fetchAnime = async () => {
        try {
            const response = await TitleService.getAnimeIDs();
            const animeIDs = await response.json();
            const animeList = await Promise.all(animeIDs.map(async id => {
                const response = await TitleService.getTitle(id, ["name", "posterURL"]);
                return response.json();
            }));
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
                <div className={styles.content}>
                    <div>
                        <NavBar/>
                    </div>
                    <div className={commonStyles.page}>
                        {isAdmin &&(
                            <Link className={styles.MuiLink} to={"/createTitle"}>
                                <Button
                                    style={{backgroundColor: '#7A8B99', borderColor: '#393E41', marginTop: '20px',marginBottom:'20px', width:'100%'}
                                        /*onClick={() => */} variant="contained">Добавить тайтл</Button>
                            </Link>
                        )}
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