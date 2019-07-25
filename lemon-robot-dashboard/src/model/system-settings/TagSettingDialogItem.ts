import DispatcherTag from '@/entity/DispatcherTag'

export default class TagSettingDialogItem {
  tagKey: string = ''
  tagName: string = ''
  disabled: boolean = true

  constructor(dispatcherTag: DispatcherTag) {
    this.tagKey = dispatcherTag.tagKey
    this.tagName = dispatcherTag.tagName
  }
}
