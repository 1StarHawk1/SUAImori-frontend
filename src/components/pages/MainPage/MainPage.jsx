import * as React from 'react';
import {TitleService} from "../../../API/TItleService";
import {ClubService} from "../../../API/ClubService";
import CardList from "../../blocks/CardList/CardList";
import {ClubCard} from "../../atoms/ClubCard/ClubCard";
import {TitleCard} from "../../atoms/TitleCard/TitleCard";

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

    const getClubIDs = async () => {
        try {
            const response = await ClubService.getAllIDs();
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    const getClub = async (id) => {
        try {
            const response = await ClubService.getClub(id, ["name", "imageURL"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h3>Аниме</h3>
            <CardList
                getIDs={getAnimeIDs}
                getItem={getAnime}
                renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4} titlePageUrl={"/signin"} />}
            />

            <h3>Манга</h3>
            <CardList
                getIDs={getMangaIDs}
                getItem={getAnime}
                renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4} titlePageUrl={"/signin"} />}
            />

            <h3>Сейчас на экранах</h3>
            <CardList
                getIDs={getOngoingIDs}
                getItem={getAnime}
                renderCard={(item) => <TitleCard title={item} aspectRatio={3 / 4} titlePageUrl={"/signin"} />}
            />

            <h3>Популярные сообщества</h3>
            <CardList
                getIDs={getClubIDs}
                getItem={getClub}
                renderCard={(item) => <ClubCard club={item} aspectRatio={3 / 3} clubPageUrl={"/signin"} />}
            />
        </>
    );
};

export default MainPage;