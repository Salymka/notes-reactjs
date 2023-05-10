import React, {useContext} from 'react';
import styles from './ToolBar.module.scss'

import addIcon from '../../static/add-icon.png'
import editIcon from '../../static/edit-icon.png'
import removeIcon from '../../static/remove-icon.png'
import searchIcon from '../../static/search-icon.png'
import {NotesContext} from "../../notesContext";

const ToolBar = () => {
    const {
        currentNoteId,
        addNewNote,
        deleteNote,
        setIsEditMode,
        setCurrentNoteId,
        setSearchString,
        searchString
    } = useContext(NotesContext)
    const editModeHandler = () => {
        setIsEditMode(true);
    }

    const addNewNoteAndSetCurrent = async () => {
        setSearchString('');
        await addNewNote();
    }

    const deleteCurrentNote = async () => {
        let deleteConfirm = window.confirm('Delete this note?');
        if(!deleteConfirm){
            return;
        }
        setCurrentNoteId(null)
        await deleteNote(currentNoteId);
    }

    const changeSearchString = (event) => {
        setCurrentNoteId(null)
        setSearchString(event.target.value)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbar__tools}>
                        <button
                            className={`${styles.toolBtn}`}
                            onClick={addNewNoteAndSetCurrent}
                        >
                            <img src={addIcon} alt={'add note'}/>
                        </button>
                        <button
                            disabled={!currentNoteId}
                            className={`${styles.toolBtn}`}
                            onClick={deleteCurrentNote}
                        >
                            <img src={removeIcon} alt={'remove note'}/>
                        </button>
                        <button
                            disabled={!currentNoteId}
                            className={`${styles.toolBtn}`}
                            onClick={editModeHandler}
                        >
                            <img src={editIcon} alt={'change note'}/>
                        </button>
                    </div>
                    <div className={styles.search}>
                        <img src={searchIcon} alt={'search in notes'}/>
                        <input
                            type={'text'}
                            className={styles.search__input}
                            onChange={changeSearchString}
                            value={searchString}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ToolBar;