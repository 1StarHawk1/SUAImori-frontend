import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import styles from './TitleCard.module.css';

export default function TitleCard({imgPath, title, aspectRatio}) {
    const width = 250;
    const height = width / aspectRatio;

    return (
        <Card sx={{maxWidth: width}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={height}
                    image={imgPath}
                    alt="Постер"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        className={styles.title}
                        variant="h6"
                        component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}