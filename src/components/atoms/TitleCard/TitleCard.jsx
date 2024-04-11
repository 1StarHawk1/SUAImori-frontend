import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import styles from './TitleCard.module.css';
import {Link} from "react-router-dom";
import {TitleMiniature} from "../../../API/model/TitleMiniature.tsx";
import {useEffect} from "react";

interface TitleCardProps {
    title: TitleMiniature;
    aspectRatio: number;
    titlePageUrl: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({title, aspectRatio, titlePageUrl}) => {
    const width = 240;
    const height = width / aspectRatio;
    useEffect(() => {
        console.log(title);
        console.log(titlePageUrl);
        console.log(aspectRatio);
    }, []);
    return (
        <Link to={titlePageUrl} className={styles.link}>
            <Card sx={{width: width}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={height}
                        image={title.posterURL}
                        alt="Постер"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            className={styles.title}
                            variant="h6"
                            component="div">
                            {title.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}