const stateDB = {
    dbName: 'notes-db',
    storeName: 'notes',
    version: 1
}
export const initIndexedDB = () => {
    return new Promise((resolve) => {
        let request = indexedDB.open(stateDB.dbName);

        request.onupgradeneeded = () => {
            let db = request.result;

            if (!db.objectStoreNames.contains(stateDB.storeName)) {
                db.createObjectStore(stateDB.storeName, {keyPath: 'id'});
            }
        };

        request.onsuccess = () => {
            let db = request.result;
            stateDB.version = db.version;
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addIndexedDBItem = (data) => {
    return new Promise((resolve) => {
        let request = indexedDB.open(stateDB.dbName, stateDB.version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(stateDB.storeName, 'readwrite');
            const store = tx.objectStore(stateDB.storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message
            if (error) {
                resolve(error);
            } else {
                resolve('Unknown error');
            }
        };
    });
};

export const getAllIndexedDBItems = () => {
    return new Promise((resolve) => {
        let request = indexedDB.open(stateDB.dbName);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(stateDB.storeName, 'readonly');
            const store = tx.objectStore(stateDB.storeName);
            const res = store.getAll();
            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};
export const deleteIndexedDBItem = (key) => {
    return new Promise((resolve) => {
        let request = indexedDB.open(stateDB.dbName, stateDB.version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(stateDB.storeName, 'readwrite');
            const store = tx.objectStore(stateDB.storeName);
            const res = store.delete(key);

            res.onsuccess = () => {
                resolve(true);
            };
            res.onerror = () => {
                resolve(false);
            }
        };
    });
};

export const updateIndexedDBItem = (data) => {
    return new Promise((resolve) => {
        let request = indexedDB.open(stateDB.dbName, stateDB.version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(stateDB.storeName, 'readwrite');
            const store = tx.objectStore(stateDB.storeName);
            const res = store.put(data);

            res.onsuccess = () => {
                resolve(true);
            };
            res.onerror = () => {
                resolve(false);
            }
        };
    });
};