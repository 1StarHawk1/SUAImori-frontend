import * as React from 'react';
import {TitleCard} from "../../atoms/TitleCard/TitleCard";
import {TitleMiniature} from "../../../API/model/TitleMiniature.tsx";
import {useEffect, useState} from "react";
import {TitleService} from "../../../API/TItleService";
import TitleList from "../../blocks/TitleList/TitleList";

const MainPage = () => {


    const getAnimeIDs = async () => {
        try {
            const response = await TitleService.getAnimeIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getMangaIDs = async () => {
        try {
            const response = await TitleService.getMangaIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getOngoingIDs = async () => {
        try {
            const response = await TitleService.getOngoingAnimeIDs();
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    const getAnime = async (id) => {
        try {
            const response = await TitleService.getTitle(id, ["name", "posterURL"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h3>Аниме</h3>
            <TitleList
                getTitleIDs={getAnimeIDs}
                getTitle={getAnime}
            />

            <h3>Манга</h3>
            <TitleList
                getTitleIDs={getMangaIDs}
                getTitle={getAnime}
            />

            <h3>Сейчас на экранах</h3>
            <TitleList
                getTitleIDs={getOngoingIDs}
                getTitle={getAnime}
            />
        </>
    );
};

export default MainPage;