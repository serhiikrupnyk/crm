import firebase from "firebase/compat/app";

export default {
    actions: {
        async fetchCategories({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/category`).once('value')).val() || {}
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            }
            catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({dispatch, commit}, {id, title, limit}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/category`).child(id).update({title, limit})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({dispatch, commit}, {title, limit}) {
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/category`).push({title, limit})
                return {title, limit, id: category.key}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}
