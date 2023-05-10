export const configuration = {
    apiKey: 'bCltBcRmnnWR7dVmk8otbU',
    entityID: 'aUWR7dMvzlfyoMCCopW5T2',
    markDown: 'ajFmogx8noWPKbpx1FW54k',
    user: 'aNWO1XhfPpWOC2WQVcRCoV',
    form: 'dcK8odW5Xlk5ypWPtcQSkE'
}


class QuantaDBService{
    async getQuantaAllNotes(user) {
        try {
            const res = await fetch(`https://quintadb.com.ua/search/${configuration.form}.json?rest_api_key=${configuration.apiKey}&entity_id=${configuration.entityID}&view=`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {"search": [[{"a": configuration.user, "b": user, "o": "is"}]]})
            })
            return await res.json();
        }catch (e) {
            console.log(e);
            return null;
        }
    }

    async addQuantaNewNote(user, noteId) {
        try {
            const res = await fetch(`https://quintadb.com.ua/apps/${configuration.form}/dtypes.json?rest_api_key=${configuration.apiKey}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {"values": {"entity_id" : configuration.entityID, 'aNWO1XhfPpWOC2WQVcRCoV': user, 'id': noteId}})
            })
            return await res.json();
        }catch (e) {
            console.log(e);
            return null;
        }
    }
    async updateQuantaNote(id, markDown) {
        try {
            const res = await fetch(`https://quintadb.com.ua/apps/${configuration.form}/dtypes/${id}.json?rest_api_key=${configuration.apiKey}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {"values": {"ajFmogx8noWPKbpx1FW54k": markDown}})
            })
            return await res.json();
        }catch (e) {
            console.log(e);
            return null;
        }

    }

    async deleteQuantaNote(id) {
        try {
            const res = await fetch(`https://quintadb.com.ua/apps/${configuration.form}/dtypes/${id}.json?rest_api_key=${configuration.apiKey}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            return await res.json();
        }catch (e) {
            console.log(e);
            return null;
        }

    }

}
export default new QuantaDBService();