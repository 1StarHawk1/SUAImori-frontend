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

const ListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [titleIDs, setTitleIDs] = useState([]);
    const [titles, setTitleNames] = useState([]);
    const [list : List, setList] = useState(null);

    const {id} = useParams();

    // useEffect(() => {
    //     getList(id).then(r => console.log("done"));
    //     getTitleIds().then(r => console.log("done"));
    // }, []);

    useEffect(() => {
        const loadTitleNames = async () => {
            if (titleIDs.length > 0) {
                console.log("fetching names...");
                const titlesPromises = titleIDs.map(id => getTitle(id));
                const itemsData = await Promise.all(titlesPromises);
                setTitleNames(itemsData);

                console.log(titles);
            }
        }
        loadTitleNames().then(r => console.log("done"));
        getList(id).then(r => console.log("done"));
        getTitleIds().then(r => console.log("done"));
        console.log(titles);
    }, [titleIDs]);

    const getList = async (id) => {
        try {
            const response = await ListService.getList(id);
            const data = await response.json();
            setList(data);
            console.log(data);
            setIsLoading(false);
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

    const getTitle = async (id) => {
        try {
            const response = await TitleService.getTitle(id, ["name"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

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
                                {titles.map((title, index) => (

                                    <Link to={`/title/${title.id}`}>
                                        <h3>{title.name}</h3>
                                    </Link>

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