import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAdminInfo
} from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        adminInfo: {
            avatar: 'default.jpg'
        }
    },
    getters: {},
    mutations: {
        saveAdminInfo(state, adminInfo) {
            state.adminInfo = adminInfo
        }
    },
    actions: {
        async getAdminData({
            commit
        }) {
            try {
                const res = await getAdminInfo()
                if (res.status == 1) {
                    commit('saveAdminInfo', res.data)
                } else {
                    throw new Error(res.type)
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    modules: {}
})