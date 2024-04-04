import * as React from 'react';
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {TitleMiniature} from "../../../API/model/TitleMiniature.tsx";
import {useEffect} from "react";
import {TitleService} from "../../../API/TItleService";


const MainPage = () => {
    const [title: TitleMiniature, setTitle] = React.useState({});
    useEffect( () => {
        async function fetchTitle() {
            try {
                const response = await TitleService.getTitle(1, "name", "posterURL");
                const data = response.json();
                console.log("data in mainpage " + data);
                setTitle(new TitleMiniature({...data}));
            } catch (e) {
                console.error(e);
            }
        }
        fetchTitle();
    }, []);
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