import Axios from 'axios'
import UrlDefineTagSetting from '@/define/url/system-settings/UrlDefineTagSetting'
import DispatcherTag from '@/entity/DispatcherTag'
import TagSettingCreateTagReq from '@/dto/tag-setting/TagSettingCreateTagReq'
import TagSettingUpdateTagReq from '@/dto/tag-setting/TagSettingUpdateTagReq'
import {reject} from 'q'

export default class TagSettingService {
  static GetTags(): Promise<DispatcherTag[]> {
    return new Promise<DispatcherTag[]>((resolve, reject) => {
      Axios.get(UrlDefineTagSetting.GET_TAGS)
        .then(resp => {
          resolve(resp.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static CreateTag(tagName: string) {
    const req = new TagSettingCreateTagReq(tagName)
    return new Promise((resolve, reject) => {
      Axios.put(UrlDefineTagSetting.CREATE_TAG, req)
        .then(resp => {
          resolve(resp.data.success)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static UpdateTag(tagKey: string, tagName: string) {
    const req = new TagSettingUpdateTagReq({tagKey, tagName})
    return new Promise((resolve, reject) => {
      Axios.put(UrlDefineTagSetting.UPDATE_TAG, req)
        .then(resp => {
          resolve(resp.data.success)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static DeleteTag(tagKey: string) {
    const _url = UrlDefineTagSetting.DELETE_TAG + tagKey
    return new Promise((resolve, reject) => {
      Axios.delete(_url)
        .then(resp => {
          resolve(resp.data.success)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
