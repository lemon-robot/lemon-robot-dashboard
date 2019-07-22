import StoreDefineSystemSettings from '@/define/store/main/functions/system-settings'

export interface State {
  dialogVisible: boolean
}

const state: State = {
  dialogVisible: false
}

const getters = {
  [StoreDefineSystemSettings.GET_TAGS_SETTING_DIALOG_VISIBLE] (state: State) {
    return state.dialogVisible
  }
}

const mutations = {
  [StoreDefineSystemSettings.SET_TAGS_SETTING_DIALOG_VISIBLE] (state: State, dialogVisible: boolean) {
    state.dialogVisible = dialogVisible
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
