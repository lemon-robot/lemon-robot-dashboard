import StoreDefineSystemSettings from '@/define/store/main/functions/system-settings'

export interface State {
  tagSettingDialogVisible: boolean
  tagChangeState: number
}

const state: State = {
  tagSettingDialogVisible: false,
  tagChangeState: 0
}

const getters = {
  [StoreDefineSystemSettings.GET_TAG_SETTING_DIALOG_VISIBLE] (state: State) {
    return state.tagSettingDialogVisible
  },
  [StoreDefineSystemSettings.GET_TAG_CHANGE_STATE] (state: State) {
    return state.tagChangeState
  }
}

const mutations = {
  [StoreDefineSystemSettings.SET_TAG_SETTING_DIALOG_VISIBLE] (state: State, tagSettingDialogVisible: boolean) {
    state.tagSettingDialogVisible = tagSettingDialogVisible
  },
  [StoreDefineSystemSettings.SET_TAG_CHANGE_STATE] (state: State, tagChangeState: number) {
    state.tagChangeState = tagChangeState
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
