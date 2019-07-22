import DispatcherTag from '@/entity/DispatcherTag'

export default class SystemSettingsUpdateTagReq {
  tagName: string
  tagKey: string

  constructor({tagName, tagKey}: DispatcherTag) {
    this.tagKey = tagKey
    this.tagName = tagName
  }
}
