import * as React from 'react';
import {TitleService} from "../../../API/TitleService";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {useState, useEffect} from "react";
import styles from './MangaListPage.module.css';
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import Button from "@mui/material/Button";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";

const MangaListPage = () => {
    const [mangaList, setList] = useState([]);

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    let isAdmin = false;
    if (!(token === null || decodedToken === null)) {
        const role = decodedToken.role;
        isAdmin = role.includes('ROLE_ADMIN') ?  true : false;
    }

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
                        {isAdmin &&(
                            <Link className={styles.MuiLink} to={"/createTitle"}>
                                <Button style={{backgroundColor: '#7A8B99', borderColor: '#393E41', margin:'20px',
                                    marginLeft:'50px', width:'100%'}
                                    /*onClick={() => */} variant="contained">Добавить тайтл</Button>
                            </Link>
                        )}
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