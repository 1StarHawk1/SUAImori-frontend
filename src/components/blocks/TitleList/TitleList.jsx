import React, {useEffect, useRef, useState} from 'react';
import {TitleMiniature} from "../../../API/model/TitleMiniature.tsx";
import {TitleCard} from "../../atoms/TitleCard/TitleCard.jsx";
import styles from "./TitleList.module.css"

const TitleList = ({getTitleIDs, getTitle}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [titleIDs: number[], setTitleIDs] = useState([])
    const [titles: TitleMiniature[], setTitles] = useState([]);

    const listRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            if (listRef.current) {
                listRef.current.scrollLeft += e.deltaX;
            }
        }

        if (listRef.current) {
            listRef.current.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (listRef.current) {
                listRef.current.removeEventListener('wheel', handleWheel);
            }
        }
    }, []);

    useEffect(() => {
        const fetchTitleIDs = async () => {
            console.log("fetching ids...");
            const ids = await getTitleIDs();
            setTitleIDs(ids);
        }
        fetchTitleIDs();
    }, []);

    //получает тайтлы по айди
    useEffect(() => {
        const loadTitles = async () => {
            if (titleIDs.length > 0) {
                console.log("fetching title...");
                const titlesPromises = titleIDs.map(id => getTitle(id));
                const titlesData = await Promise.all(titlesPromises);
                const titles = titlesData.map(data => new TitleMiniature({...data}));
                setTitles(titles);
                setIsLoading(false);
                console.log(titles);
            }
        }
        loadTitles();
        console.log(titles);
    }, [titleIDs]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.list} ref={listRef}>
            {titles.map((title, index) => (
                <TitleCard
                    title={title}
                    aspectRatio={3 / 4}
                    titlePageUrl={"/signin"}
                />
            ))}
        </div>
    );
};

export default TitleList;