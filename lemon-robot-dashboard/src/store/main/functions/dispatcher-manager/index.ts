import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'
import ServerNodeResp from '@/dto/server-node/ServerNodeResp'

export interface State {
  selectedServerNodeInfo: ServerNodeResp,
  refreshServerNodeState: boolean
}

const state: State = {
  selectedServerNodeInfo: new ServerNodeResp(),
  refreshServerNodeState: false
}

const getters = {
  [StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_INFO] (state: State) {
    return state.selectedServerNodeInfo
  },
  [StoreDefineDispatcherManager.GET_REFRESH_SERVER_NODE_STATE] (state: State) {
    return state.refreshServerNodeState
  }
}

const mutations = {
  [StoreDefineDispatcherManager.SET_SELECTED_SERVER_NODE_INFO] (state: State, selectMachineInfo: ServerNodeResp) {
    state.selectedServerNodeInfo = selectMachineInfo
  },
  [StoreDefineDispatcherManager.SET_REFRESH_SERVER_NODE_STATE] (state: State, refreshState: boolean) {
    state.refreshServerNodeState = refreshState
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
