import React, {createContext, useEffect, useState} from "react";

export const NotesContext = createContext({});
export const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        setIsEditMode(false)
    }, [currentNoteId])

    useEffect(() => {
        setSearchString('')
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
                setIsEditMode
            }}>
            {children}
        </NotesContext.Provider>
    );
};

