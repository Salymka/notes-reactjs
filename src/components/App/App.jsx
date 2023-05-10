import React from "react";
import styles from './App.module.scss'
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import WorkSpace from "../WorkSpace/WorkSpace";

function App() {

    return (
        <div className={styles.app}>
            <ToolBar/>
            {
                <main className={styles.main}>
                    <SideBar/>
                    <WorkSpace/>
                </main>
            }
        </div>
    );
}

export default App;
