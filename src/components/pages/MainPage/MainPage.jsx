import * as React from 'react';
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {TitleMiniature} from "../../../API/model/TitleMiniature.tsx";
import {useEffect, useState} from "react";
import {TitleService} from "../../../API/TItleService";

const MainPage = () => {
    const [title, setTitle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        async function fetchTitle() {
            try {
                console.log("fetching title...");
                const response = await TitleService.getTitle(1, "name", "posterURL");
                const data = await response.json();
                console.log("data in mainpage " + data);
                setTitle(new TitleMiniature({...data}));
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        }
        fetchTitle();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TitleCard
                title={title}
                aspectRatio={3 / 4}
                titlePageUrl={"/signin"}
            />
        </div>
    );
};

export default MainPage;