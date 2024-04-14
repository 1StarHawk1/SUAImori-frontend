import React from 'react';
import styles from "../ListPage/ListPage.module.css";
import MenuBar from "../../blocks/MenuBar/MenuBar";
import NavBar from "../../blocks/NavBar/NavBar";
import commonStyles from '../../../styles/commonStyles.module.css';

const ListPage = () => {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPage;