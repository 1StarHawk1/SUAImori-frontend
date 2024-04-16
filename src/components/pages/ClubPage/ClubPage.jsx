import React, {useEffect, useState} from 'react';
import styles from "../ClubPage/ClubPage.module.css";
import commonStyles from "../../../styles/commonStyles.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import {Club} from '../../../API/model/Club.tsx';
import {jwtDecode} from "jwt-decode";
import {TitleService} from "../../../API/TitleService";
import {ClubService} from "../../../API/ClubService";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ClubPage = () => {
    const [club: Club, setClub] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const {id} = useParams();

    const [open, setOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        checkMembership().then(() => setIsLoading(false));
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getClub().then(() => setIsLoading(false));
    }, []);

const checkMembership = async () => {
    try {
        const response = await ClubService.checkMembership(id);
        const isMember = await response.json();
        setIsMember(isMember);
    } catch (e) {
        console.error(e);
    }
};

    const getClub = async () => {
        try {
            const response = await ClubService.getClub(id, ["name", "description", "imageURL"]);
            const data = await response.json();
            setClub(data);
            console.log(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const joinClub = () => {
        return async () => {
            try {
                const response = await ClubService.joinClub(club.name);
                if (response.status === 200) {
                    setDialogMessage("Вы успешно вступили в клуб");
                    setIsMember(true);
                } else {
                    setDialogMessage("Ошибка при вступлении в клуб");
                }
                setOpen(true);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const leaveClub = () =>{
        return async() => {
            try {
                const response = await ClubService.leaveClub(club.name);
                if (response.status === 200) {
                    setDialogMessage("Вы успешно покинули клуб");
                    setIsMember(false);
                } else {
                    setDialogMessage("Ошибка");
                }
                setOpen(true);
            } catch (e) {
                console.error(e);
            }
        }
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={styles.clubpage}>
                <div className={commonStyles.menubar}>
                    <MenuBar/>
                </div>
                <div className={`${commonStyles.content}`}>
                    <div>
                        <NavBar/>
                    </div>
                    <div className={commonStyles.page}>
                        <div className={styles.header}>
                            <img src={club.imageURL} alt={club.name} className={styles.banner}/>
                            <div>
                                <h2>{club.name}</h2>
                                <p>{club.description}</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            {token && (
                                <>
                                    {isMember ? (
                                        <Button  style={{width: '350px', backgroundColor: '#7A8B99'}} variant="contained"
                                                onClick={leaveClub()}>Покинуть клуб</Button>
                                    ) : (
                                        <Button style={{width: '350px', backgroundColor: '#7A8B99'}} variant="contained"
                                                onClick={joinClub()}>Вступить</Button>
                                    )}
                                    <br/><br/>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Уведомление"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ОК</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ClubPage;