import React, {createContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
//DcU8o5isDoW75VW4LlW4v8
import {
    addIndexedDBItem,
    deleteIndexedDBItem,
    getAllIndexedDBItems,
    initIndexedDB,
    updateIndexedDBItem
} from "./indexeddb/indexedDBService";

import QuantaDBService, {configuration} from "./api/QuantaDBService";
import {useLocalStorage} from "./hooks/useLocalStorage";

const USER_SAVE_TYPES = {
    db: 'bd',
    restApi: 'restApi',
}

export const NotesContext = createContext({});

export const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [searchString, setSearchString] = useState('')
    const currentNote = currentNoteId
        ? notes.find(note => note.id === currentNoteId)
        : null;
    const [user, setUser] = useLocalStorage("Notes-User")
    const [isDBReady, setIsDBReady] = useState((!(user && user.saveType === 'db')));

    if (!user) {
        const user = {};
        const saveService = prompt('You can choose save service:\n1 - indexeddb(default)\n2 - Quintadb', '1')
        if (saveService === '1') {
            user.saveType = USER_SAVE_TYPES.db
        }
        if (saveService === '2') {
            user.saveType = USER_SAVE_TYPES.restApi
        }
        user.userName = uuidv4()
        setUser(user)
    }


    const handleInit = async () => {
        if (!isDBReady) {
            const status = await initIndexedDB();
            setIsDBReady(status);
        }
        await getAllNotes()
    };

    useEffect(() => {
        handleInit().then()
    }, [])

    useEffect(() => {
        if (isEditMode) {
            setIsEditMode(false)
        }
    }, [currentNoteId])

    useEffect(() => {
        if (currentNoteId) {
            setIsEditMode(true)
        }
    }, [notes])

    const toCorrectFormat = (noteData) => {
        if (user.saveType === USER_SAVE_TYPES.db) {
            return noteData.map((note) => {
                const {id, markDown, date} = note;
                return {id, markDown, date}
            })
        }
        if (user.saveType === USER_SAVE_TYPES.restApi) {
            return noteData.records.map((note) => {
                const {id, values, updated_at} = note;
                return {
                    id,
                    markDown: (values[configuration.markDown] ? values[configuration.markDown] : ''),
                    date: new Date(updated_at)
                }
            })
        } else return []
    }

    const getAllNotes = async () => {
        if (user) {
            const notes = user.saveType === USER_SAVE_TYPES.db
                ? await getAllIndexedDBItems()
                : await QuantaDBService.getQuantaAllNotes(user.userName)
            const formattedNotes = toCorrectFormat(notes)
            setNotes(formattedNotes)
        }
    }

    const setNewNoteId = (length = 22) => {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return id;
    }

    const addNewNote = async () => {
        const newNoteId = setNewNoteId();
        const newNote = {id: newNoteId, markDown: "", date: new Date()}
        const addNew = user.saveType === USER_SAVE_TYPES.db
            ? await addIndexedDBItem(newNote)
            : await QuantaDBService.addQuantaNewNote(user.userName, newNoteId)
        await setCurrentNoteId(newNoteId)
        await getAllNotes()
    }

    const updateNote = async (id, markDown) => {
        const updatedNote = {id, markDown, date: new Date()};
        const updateCurrent = user.saveType === USER_SAVE_TYPES.db
            ? await updateIndexedDBItem(updatedNote)
            : await QuantaDBService.updateQuantaNote(currentNoteId, markDown)
        await getAllNotes()
    }

    const deleteNote = async (id) => {
        const deleteCurrent = user.saveType === USER_SAVE_TYPES.db
            ? await deleteIndexedDBItem(id)
            : await QuantaDBService.deleteQuantaNote(currentNoteId)
        await getAllNotes()
    }

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
                setSearchString,
                getAllNotes,
                addNewNote,
                updateNote,
                deleteNote,
                currentNote
            }}>
            {isDBReady && children}
        </NotesContext.Provider>
    );
};

