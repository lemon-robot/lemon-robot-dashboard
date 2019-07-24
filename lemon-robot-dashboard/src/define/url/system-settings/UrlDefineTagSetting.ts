export default class UrlDefineTagSetting {
  private static readonly DISPATCHER_TAGS = '/dispatcher_tag'
  static readonly GET_TAGS = `${UrlDefineTagSetting.DISPATCHER_TAGS}/list`
  static readonly CREATE_TAG = UrlDefineTagSetting.DISPATCHER_TAGS
  static readonly UPDATE_TAG = UrlDefineTagSetting.DISPATCHER_TAGS
  static readonly DELETE_TAG = `${UrlDefineTagSetting.DISPATCHER_TAGS}?tagKey=`
}
