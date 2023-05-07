import React from 'react';
import styles from './SideBar.module.scss'
import ItemsList from "../ItemsList/ItemsList";
const SideBar = () => {
    return (
        <aside className={styles.sidebar}>
            <ItemsList/>
        </aside>
    );
};

export default SideBar;