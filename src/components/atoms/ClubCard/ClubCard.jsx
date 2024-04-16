import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {Link} from "react-router-dom";
import {ClubMiniature} from "../../../API/model/ClubMiniature.tsx";
import {useEffect} from "react";
import styles from '../TitleCard/TitleCard.module.css';

interface ClubCardProps {
    club: ClubMiniature;
    aspectRatio: number;
    clubPageUrl: string;
}

export const ClubCard: React.FC<ClubCardProps> = ({club, aspectRatio, clubPageUrl}) => {
    const width = 200;
    const height = width / aspectRatio;
    useEffect(() => {
        console.log(club);
        console.log(clubPageUrl);
        console.log(aspectRatio);
    }, []);
    return (
        <Link  to={clubPageUrl} className={styles.link}>
            <Card style={{backgroundColor: '#F3D4CD'}} sx={{width: width}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={height}
                        image={club.imageURL}
                        alt="Постер"
                    />
                    <CardContent sx={{ paddingBottom: 0.5, paddingTop: 0.8 }}>
                        <Typography
                            gutterBottom
                            className={`${styles.title} ${styles.smallFont}`}
                            variant="h6"
                            component="div">
                            {club.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}