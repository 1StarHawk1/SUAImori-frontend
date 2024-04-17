import React, {useEffect, useState} from 'react';
import styles from "../ListPage/ListPage.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import commonStyles from '../../../styles/commonStyles.module.css';
import {User} from "../../../API/model/User.tsx";
import {List} from "../../../API/model/List.tsx";
import {TitleService} from "../../../API/TitleService";
import {ListService} from "../../../API/ListService";
import {Link, useParams} from "react-router-dom";
import {ClubService} from "../../../API/ClubService";
import {Title} from "../../../API/model/Title.tsx";
import Button from "@mui/material/Button";
import ListBar from "../../atoms/ListBar/ListBar";

const ListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [list: List, setList] = useState(null);
    const [titleIDs, setTitleIDs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const getListAndTitleIds = async () => {
            console.log(id)
            await getList();
            await getTitleIds();
            setIsLoading(false);
        }
        getListAndTitleIds();
    }, []);


    const getList = async () => {
        try {
            const response = await ListService.getList(id);
            const data = await response.json();
            setList(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getTitleIds = async () => {
        try {
            const response = await ListService.getTitles(id);
            const data = await response.json();
            setTitleIDs(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const removeTitle = async (titleId) => {
        try {
            await ListService.removeTitle(id, titleId);
        } catch (e) {
            console.error(e);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

                        <div className={styles.list}>
                            <h1>{list.name}</h1>
                            <div className={styles.listContainer}>
                                {titleIDs.map((titleID, index) => (
                                    <ListBar titleID={titleID} onRemove={removeTitle}/>

                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPage;