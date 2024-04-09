import React, {useEffect, useRef, useState} from 'react';
import Grid from '@mui/material/Grid';
import styles from "./TitleList.module.css"

const CardList = ({getIDs, getItem, renderCard}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [IDs: number[], setIDs] = useState([])
    const [items, setItems] = useState([]);

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
        const fetchIDs = async () => {
            console.log("fetching ids...");
            const ids = await getIDs();
            setIDs(ids);
        }
        fetchIDs();
    }, []);

    useEffect(() => {
        const loadItems = async () => {
            if (IDs.length > 0) {
                console.log("fetching items...");
                const itemsPromises = IDs.map(id => getItem(id));
                const itemsData = await Promise.all(itemsPromises);
                setItems(itemsData);
                setIsLoading(false);
                console.log(items);
            }
        }
        loadItems();
        console.log(items);
    }, [IDs]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2} ref={listRef} className={styles.list}>
            {items.map((item, index) => (
                <Grid item>
                    {renderCard(item)}
                </Grid>
            ))}
        </Grid>
    );
};

export default CardList;