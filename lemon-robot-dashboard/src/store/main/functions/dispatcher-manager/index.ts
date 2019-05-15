import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'
import ServerNodeResp from '@/dto/server-node/ServerNodeResp'

export interface State {
  selectedServerNodeInfo: ServerNodeResp
}

const state: State = {
  selectedServerNodeInfo: new ServerNodeResp()
}

const getters = {
  [StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_INFO] (state: State) {
    return state.selectedServerNodeInfo
  }
}

const mutations = {
  [StoreDefineDispatcherManager.SET_SELECTED_SERVER_NODE_INFO] (state: State, selectMachineInfo: ServerNodeResp) {
    state.selectedServerNodeInfo = selectMachineInfo
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
