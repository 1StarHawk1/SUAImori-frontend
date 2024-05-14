import React, {useState} from 'react';
import {TextField, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem, Button} from '@mui/material';
import styles from './CreateTitlePage.module.css';
import commonStyles from '../../../styles/commonStyles.module.css';
import MenuBar from '../../blocks/MenuBar/MenuBar';
import NavBar from '../../blocks/NavBar/NavBar';
import {TitleService} from "../../../API/TitleService";

const CreateTitlePage = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        posterURL: '',
        releaseDate: '',
        complitionDate: '',
        itemCount: '',
        type: '',
        isNSFW: '',
        status: '',
        franchise: {name: 'N/A'}, // Франшизы не реализованы, и пока что не планируются
        //TODO: Добавить возможность выбора франшизы, авторов, студий
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        TitleService.createTitle(form).then(r => console.log(r)).catch(e => console.log(e));
    };

    return (
        <div>
            <div className={styles.createTitlePage}>
                <div className={commonStyles.menubar}>
                    <MenuBar/>
                </div>
                <div className={`${commonStyles.content}`}>
                    <div>
                        <NavBar/>
                    </div>
                    <div className={commonStyles.page}>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                            <TextField sx={{margin: '10px 0'}} label="Название" value={form.name}
                                       onChange={handleChange} name="name"/>
                            <TextField sx={{margin: '10px 0'}} label="Описание" value={form.description}
                                       onChange={handleChange} name="description"/>
                            <TextField sx={{margin: '10px 0'}} label="URL изображения" value={form.posterURL}
                                       onChange={handleChange} name="posterURL"/>
                            <TextField
                                sx={{margin: '10px 0'}}
                                label="Дата начала"
                                type="date"
                                value={form.releaseDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="releaseDate"
                            />
                            <TextField
                                sx={{margin: '10px 0'}}
                                label="Дата окончания"
                                type="date"
                                value={form.complitionDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="complitionDate"
                            />
                            <TextField sx={{margin: '10px 0'}} label="Количество серий/глав" type="number"
                                       value={form.itemCount} onChange={handleChange} name="itemCount"/>
                            <RadioGroup className={styles.formElement} value={form.type}
                                        onChange={handleChange} name="type">
                                <FormControlLabel value="ANIME" control={<Radio/>} label="Аниме"/>
                                <FormControlLabel value="MANGA" control={<Radio/>} label="Манга"/>
                            </RadioGroup>
                            <RadioGroup className={styles.formElement} value={form.isNSFW}
                                        onChange={handleChange} name="isNSFW">
                                <FormControlLabel value={true} control={<Radio/>} label="NSFW"/>
                                <FormControlLabel value={false} control={<Radio/>} label="Не NSFW"/>
                            </RadioGroup>
                            <FormControl className={styles.formElement}>
                                <Select value={form.status} onChange={handleChange} name="status">
                                    <MenuItem value="ONGOING">Онгоинг</MenuItem>
                                    <MenuItem value="COMPLETED">Вышло</MenuItem>
                                    <MenuItem value="ANONSED">Анонсированно</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{margin: '10px 0'}} className={styles.formElement} variant="contained"
                                    style={{backgroundColor: '#7A8B99'}} type="submit">Сохранить</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTitlePage;