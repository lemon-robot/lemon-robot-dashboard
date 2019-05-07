import DispatcherOnline from '@/entity/DispatcherOnline'

export default class ServerNode {
  machineSign = '';
  cpuArch = '';
  operateSystem = '';
  serverVersion = '';
  alias = '';
  startAt = '';
  activeTime = '';
  onlineDispatchers: DispatcherOnline[] = [];
}
