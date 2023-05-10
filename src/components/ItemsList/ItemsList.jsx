import React, {useContext} from 'react';
import styles from './ItemsList.module.scss'
import {NotesContext} from "../../notesContext";

const ItemsList = () => {
    const {notes, currentNoteId, setCurrentNoteId, setIsEditMode, searchString} = useContext(NotesContext)
    const filteredNotes = notes.filter(note => note?.markDown.toLowerCase().includes(searchString.toLowerCase()))

    const formatTitle = (markDownText, item) => {
        const splitForParagraph = markDownText.split('\n')[0];
        if (splitForParagraph.length === 0)
            return "Empty note";
        if (splitForParagraph.length > 14) {
            return splitForParagraph.slice(0, 13) + '...';
        }
        return splitForParagraph;
    }

    const formatMarkDownText = (markDownText) => {
        const splitForParagraph = markDownText.split('\n')[1] || markDownText.split('\n')[0];
        if (splitForParagraph.length === 0)
            return "";
        if (splitForParagraph.length > 24) {
            return splitForParagraph.slice(0, 22) + '...';
        }
        return splitForParagraph;
    }

    const selectNote = (note) => {
        if (note.id === currentNoteId) {
            return setIsEditMode(false)
        }
        setCurrentNoteId(note.id)
    }

    return (
        <div className={styles.list}>
            {(() => {
                if (!notes.length) {
                    return (
                        <div className={styles.anyCreated}>
                            {`Any created Notes..`}
                        </div>
                    )
                } else if (!filteredNotes.length) {
                    return (
                        <div className={styles.anyCreated}>
                            {`Any Notes of searching`}
                        </div>
                    )
                } else {
                    return (
                        filteredNotes.map((notesItem) =>
                            <div
                                className={`${styles.list__item} ${notesItem.id === currentNoteId ? styles.list__item_active : ''}`}
                                key={notesItem.id}
                                onClick={() => selectNote(notesItem)}
                            >
                                <h2 className={styles.noteTitle}>
                                    {formatTitle(notesItem.markDown, notesItem)}
                                </h2>
                                <div className={styles.contentWrapper}>
                                    <p className={styles.date}>
                                        {notesItem.date.toLocaleDateString()}
                                    </p>
                                    <p className={styles.noteContext}>
                                        {formatMarkDownText(notesItem.markDown)}
                                    </p>
                                </div>
                            </div>
                        )
                    )
                }
            })()}
        </div>
    );
};

export default ItemsList;