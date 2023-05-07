import React, {useContext} from 'react';
import styles from './ToolBar.module.scss'

import addIcon from '../../static/add-icon.png'
import editIcon from '../../static/edit-icon.png'
import removeIcon from '../../static/remove-icon.png'
import searchIcon from '../../static/search-icon.png'
import {NotesContext} from "../../notesContext";

const ToolBar = () => {
    const {currentNoteId, setIsEditMode, setNotes, setCurrentNoteId} = useContext(NotesContext)
    const editModeHandler = () => {
        setIsEditMode(true)
    }

    const setNoteId = (notes) => {
        let maxId = 0;
        notes.forEach(note => {
            if(note.id > maxId){
                maxId = note.id
            }
        })
        return maxId + 1;
    }


    const addNewNote = () => {
        let noteId
        setNotes((notes) => [...notes,
            {
                id: noteId = setNoteId(notes),
                markDown: '',
                date: new Date()
            }])
        setCurrentNoteId(noteId)

    }

    const deleteCurrentNote = () => {
        setCurrentNoteId(null)
        setNotes(notes => {
            return notes.filter(note => note.id !== currentNoteId)
        })
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbar__tools}>
                        <button
                            className={`${styles.toolBtn}`}
                            onClick={addNewNote}
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
                        <input type={'text'} className={styles.search__input}/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ToolBar;