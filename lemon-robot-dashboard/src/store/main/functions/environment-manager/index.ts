import StoreDefineEnvironmentManager from '@/define/store/main/functions/environment-manager'
export interface State {
  environmentComponentList: boolean
}

const state: State = {
  environmentComponentList: false,
}

const getters = {
  [StoreDefineEnvironmentManager.GET_ENVIRONMENT_COMPONENT_LIST] (state: State) {
    return state.environmentComponentList
  }
}

const mutations = {
  [StoreDefineEnvironmentManager.SET_ENVIRONMENT_COMPONENT_LIST] (state: State, environmentComponentList: boolean) {
    state.environmentComponentList = environmentComponentList
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
