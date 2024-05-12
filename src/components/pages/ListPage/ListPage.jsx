import React, {useEffect, useState} from 'react';
import styles from "../ListPage/ListPage.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import commonStyles from '../../../styles/commonStyles.module.css';
import {User} from "../../../API/model/User.tsx";
import {List} from "../../../API/model/List.tsx";
import {TitleService} from "../../../API/TitleService";
import {ListService} from "../../../API/ListService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ClubService} from "../../../API/ClubService";
import {Title} from "../../../API/model/Title.tsx";
import Button from "@mui/material/Button";
import ListBar from "../../atoms/ListBar/ListBar";
import {jwtDecode} from "jwt-decode";

const ListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [list: List, setList] = useState(null);
    const [titleIDs, setTitleIDs] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const getListAndTitleIds = async () => {
            await getTitleIds();
            await getList();

            setIsLoading(false);
        }
        getListAndTitleIds();
    }, []);


    const getList = async () => {
        try {
            const response = await ListService.getList(id);
            if(!response.ok) {
                throw new Error('Server responded with an error');
            }
            const data = await response.json();
            if(decodedToken.sub === data.username) {
                setIsOwner(true);
            }
            setList(data);
            console.log(data);
        } catch (e) {
            console.error(e);
            navigate('/ErrorPage');
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
                        {/* Проверка на существование списка */}
                        {list && (
                            <>
                                <h1>{list.name}</h1>
                                <div className={styles.listContainer}>
                                    {titleIDs.map((titleID, index) => (
                                        <ListBar titleID={titleID} onRemove={removeTitle} isOwner={isOwner}/>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    </div>
);
};

export default ListPage;