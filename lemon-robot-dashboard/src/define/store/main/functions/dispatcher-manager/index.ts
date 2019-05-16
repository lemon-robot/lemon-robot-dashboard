export default class StoreDefineDispatcherManager {
  private static readonly NAMESPACE = 'dispatcher-manager_dispatcher_manager_';
  static readonly GET_SELECTED_SERVER_NODE_INFO = StoreDefineDispatcherManager.NAMESPACE + 'get_selected_server_node_info'
  static readonly SET_SELECTED_SERVER_NODE_INFO = StoreDefineDispatcherManager.NAMESPACE + 'set_selected_server_node_info'
  static readonly GET_REFRESH_SERVER_NODE_STATE = StoreDefineDispatcherManager.NAMESPACE + 'get_refresh_server_node_state'
  static readonly SET_REFRESH_SERVER_NODE_STATE = StoreDefineDispatcherManager.NAMESPACE + 'set_refresh_server_node_state'
}
