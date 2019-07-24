import DispatcherTag from '../../entity/DispatcherTag'

export default class TagSettingUpdateTagReq {
  tagName: string
  tagKey: string

  constructor({tagName, tagKey}: DispatcherTag) {
    this.tagKey = tagKey
    this.tagName = tagName
  }
}
