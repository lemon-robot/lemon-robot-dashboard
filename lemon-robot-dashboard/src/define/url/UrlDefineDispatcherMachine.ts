export default class UrlDefineDispatcherMachine {
  private static readonly DISPATCHER_TAGS = '/dispatcher_tag'
  static readonly PUT_ALIAS = '/dispatcher_machine/alias'
  static readonly PUT_TAGS = '/dispatcher_machine/tags'
  static readonly GET_TAGS = `${UrlDefineDispatcherMachine.DISPATCHER_TAGS}/list`
  static readonly CREATE_TAGS = UrlDefineDispatcherMachine.DISPATCHER_TAGS
  static readonly UPDATE_TAGS = UrlDefineDispatcherMachine.DISPATCHER_TAGS
  static readonly DELETE_TAGS = UrlDefineDispatcherMachine.DISPATCHER_TAGS
}
