export default class SystemSettings {
  private static readonly NAMESPACE = 'system-settings_system_settings_';
  static readonly GET_TAG_SETTING_DIALOG_VISIBLE = SystemSettings.NAMESPACE + 'get_tag_setting_dialog_visible'
  static readonly SET_TAG_SETTING_DIALOG_VISIBLE = SystemSettings.NAMESPACE + 'set_tag_setting_dialog_visible'
  static readonly SET_TAG_CHANGE_STATE = SystemSettings.NAMESPACE + 'set_tag_change_state'
  static readonly GET_TAG_CHANGE_STATE = SystemSettings.NAMESPACE + 'get_tag_change_state'
}
