export default class CommonMachineSetAliasReq {
  machineSign: string = ''
  alias: string = ''

  constructor (machineSign: string, alias: string) {
    this.machineSign = machineSign
    this.alias = alias
  }
}
