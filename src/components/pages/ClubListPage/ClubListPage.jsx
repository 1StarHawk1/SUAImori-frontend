import * as React from 'react';
import {ClubCard} from "../../atoms/ClubCard/ClubCard";
import {useState, useEffect} from "react";
import styles from './ClubListPage.module.css';
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import {ClubService} from "../../../API/ClubService";

const ClubListPage = () => {
    const [clubList, setClubList] = useState([]);

    const fetchClubs = async () => {
        try {
            const response = await ClubService.getAllIDs();
            const clubIDs = await response.json();
            const clubList = await Promise.all(clubIDs.map(async id => {
                const response = await ClubService.getClub(id, ["name", "imageURL"]);
                return response.json();
            }));
            setClubList(clubList);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchClubs();
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
                        <div className={styles.clubListPage}>
                            {clubList.map(club => (
                                <ClubCard key={club.id} club={club} aspectRatio={1}
                                           clubPageUrl={`/club/${club.id}`}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubListPage;