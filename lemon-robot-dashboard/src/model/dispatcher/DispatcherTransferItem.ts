export default class DispatcherTransferItem {
  key: string = ''
  label: string = ''
  disabled: boolean = false

  constructor (key: string, label: string, disabled: boolean) {
    this.key = key
    this.label = label
    this.disabled = disabled
  }
}
