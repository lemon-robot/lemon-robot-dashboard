export default class DispatcherMachineSetTagsReq {
  machineSign: string
  tagKeys: string[] = []

  constructor (machineSign: string) {
    this.machineSign = machineSign
  }
}
