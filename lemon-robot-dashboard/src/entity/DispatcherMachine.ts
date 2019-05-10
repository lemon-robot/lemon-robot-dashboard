import DispatcherTag from '@/entity/DispatcherTag'

export default class DispatcherMachine {
  machineSign = '';
  cpuArch = '';
  operateSystem = '';
  dispatcherVersion = '';
  tags: DispatcherTag[] = [];
  alias = '';
}
