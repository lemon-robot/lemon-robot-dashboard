import StoreDefineLogin from '@/define/store/login/login'
import { Store, Commit, Dispatch } from 'vuex'
import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'

export interface State {
  selectedServerNodeMachineSign: string
}

const state: State = {
  selectedServerNodeMachineSign: ''
}

const getters = {
  [StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_MACHINE_SIGN] (state: State) {
    return state.selectedServerNodeMachineSign
  }
}

const mutations = {
  [StoreDefineDispatcherManager.SET_SELECTED_SERVER_NODE_MACHINE_SIGN] (state: State, selectMachineSign: string) {
    state.selectedServerNodeMachineSign = selectMachineSign
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
