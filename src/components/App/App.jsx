import React, {useContext, useEffect,} from "react";
import styles from './App.module.scss'
import ToolBar from "../ToolBar/ToolBar";
import SideBar from "../SideBar/SideBar";
import WorkSpace from "../WorkSpace/WorkSpace";
import {NotesContext} from "../../notesContext";

const NOTES = [
    {id: 1, markDown: 'Hello world \ntatatat yuu jsjd', date: new Date()},
    {id: 2, markDown: 'Hello world  tatatat yuu\njsjd', date: new Date()},
    {id: 3, markDown: 'Hello world  tatatat yuu jsjd', date: new Date()},
    {id: 4, markDown: 'Hello\nworld tatatat yuu jsjd', date: new Date()},

]

function App() {
    const {setNotes} = useContext(NotesContext)

    useEffect(() => {
        setNotes(NOTES)
    }, [])
    return (
        <div className={styles.app}>
            <ToolBar/>
            <main className={styles.main}>
                <SideBar/>
                <WorkSpace/>
            </main>
        </div>
    );
}

export default App;
