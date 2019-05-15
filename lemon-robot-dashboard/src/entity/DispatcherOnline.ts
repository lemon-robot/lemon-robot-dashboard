import DispatcherMachine from '@/entity/DispatcherMachine'

export default class DispatcherOnline {
  onlineKey = '';
  relationDispatcherMachine: DispatcherMachine = new DispatcherMachine();
  relationMachineSign = '';
  ipAddress = '';
  bindServerMachineSign: string = ''
}
