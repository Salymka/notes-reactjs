import React, {createContext, useEffect, useState} from "react";
import {logDOM} from "@testing-library/react";

export const NotesContext = createContext({});
export const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        if(isEditMode){
            setIsEditMode(false)
        }
    }, [currentNoteId])

    useEffect(() => {
        if(currentNoteId){
            setIsEditMode(true)
        }
    }, [notes])


    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                currentNoteId,
                setCurrentNoteId,
                isEditMode,
                setIsEditMode,
                searchString,
                setSearchString
            }}>
            {children}
        </NotesContext.Provider>
    );
};

