import React, {useContext} from 'react';
import styles from './WorkSpace.module.scss'
import {NotesContext} from "../../notesContext";

const WorkSpace = () => {
    const {currentNoteId, notes, isEditMode, setNotes} = useContext(NotesContext)
    const currentNote = currentNoteId ?
        notes.find(note => note.id === currentNoteId)
        : '';

    const changeArea = (event, specialKey = null) => {
        let specialText = '';
        if (specialKey === 'tab'){
            specialText += '   '
        }
        if (specialKey === 'enter'){
            specialText += '\n'
        }
        setNotes(notes => {
            return notes.map(note => {
                if (note.id === currentNoteId) {
                    return {...note, markDown: event.target.value + specialText, date: new Date()};
                }
                return note;
            })
        })
    }

    const SpecialKeyPressHandler = (event) => {
        if (event.keyCode === 9) {
            event.preventDefault()
            changeArea(event, 'tab')
        }
        if (event.keyCode === 13) {
            event.preventDefault()
            changeArea(event, 'enter')
        }
    }

    const toFormatDate = (date) => {
        return date.toDateString() +
            ' - ' +
            date.getHours() +
            ':' +
            (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes())
    }

    return (
        <div className={styles.workspace}>
            {currentNoteId &&
                <div className={styles.workspace__wrapper}>
                    <textarea
                        className={styles.markDown}
                        value={currentNote.markDown}
                        placeholder={'|<-'}
                        disabled={!isEditMode}
                        onKeyDown={SpecialKeyPressHandler}
                        onChange={changeArea}
                    >

                    </textarea>
                    <p className={styles.fullDate}>
                        {toFormatDate(currentNote.date)}
                    </p>
                </div>
            }

        </div>
    );
};

export default WorkSpace;