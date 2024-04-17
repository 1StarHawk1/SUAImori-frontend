import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {TitleService} from "../../../API/TitleService";
import {Title} from "../../../API/model/Title.tsx";
import commonStyles from "../../../styles/commonStyles.module.css";

const ListBar = ({ titleID, onRemove }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [title:Title, setTitle] = useState();

    useEffect(() => {
        const loadTitleNames = async () => {
                console.log("fetching names...");
                const title = await getTitle(titleID);
                setTitle(title);
                console.log(title);
                setIsLoading(false);
        }
        loadTitleNames();
    }, []);

    const getTitle = async (id) => {
        try {
            const response = await TitleService.getTitle(id, ["name"]);
            return response.json();
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div key={title.id} style={{
                display: 'flex',
            }}>
                <Link className={commonStyles.link} to={`/title/${title.id}`} style={{width: '500px'}}>
                    <h3>{title.name}</h3>
                </Link>
                <Button style={{height: '40px', backgroundColor:'#7A8B99'}} variant="contained" color="primary"
                        onClick={() => onRemove(title.id)}>
                    Удалить
                </Button>
            </div>
        </div>
    );
};

export default ListBar;