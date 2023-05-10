import React, {useContext, useEffect, useRef} from 'react';
import styles from './WorkSpace.module.scss'
import {NotesContext} from "../../notesContext";

const WorkSpace = () => {
    const {currentNoteId, currentNote, isEditMode, updateNote, setNotes, notes} = useContext(NotesContext)
    const timer = useRef(null)

    // Remember the latest callback if it changes.
    const changeAreaValue = (event, specialKey = null) => {
        let specialText = '';
        if (specialKey === 'tab'){
            specialText += '   '
        }
        if (specialKey === 'enter'){
            specialText += '\n'
        }
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
        setNotes(notes => {
            return notes.map((note) => {
                if(note.id === currentNoteId){
                    return {...note, markDown: event.target.value + specialText};
                }
                return note;
            })
        })

        timer.current = setTimeout(() => {
            updateNote(currentNoteId, event.target.value + specialText)
        }, 1000);
    }


    const SpecialKeyPressHandler = (event) => {
        if (event.keyCode === 9) {
            event.preventDefault()
            changeAreaValue(event, 'tab')
        }
        if (event.keyCode === 13) {
            event.preventDefault()
            changeAreaValue(event, 'enter')
        }
    }

    const toFormatDate = (date) => {
        return date.toDateString() +
            ' - ' +
            (date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()) +
            ':' +
            (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()) // format 0:0 to 00:00
    }

    return (
        <div className={styles.workspace}>
            {currentNote &&
                <div className={styles.workspace__wrapper}>
                    <textarea
                        className={styles.markDown}
                        value={currentNote.markDown}
                        placeholder={'|<-'}
                        disabled={!isEditMode}
                        onKeyDown={SpecialKeyPressHandler}
                        onChange={changeAreaValue}
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