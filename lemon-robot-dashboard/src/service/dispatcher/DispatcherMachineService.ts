import Axios from 'axios'
import UrlDefineDispatcherMachine from '@/define/url/UrlDefineDispatcherMachine'
import CommonMachineSetAliasReq from '@/dto/CommonMachineSetAliasReq'
import DispatcherMachineSetTagsReq from '@/dto/DispatcherMachineSetTagsReq'
import {reject, resolve} from "q";

export default class DispatcherMachineService {
  static SetAlias(machineSign: string, alias: string) {
    return new Promise((resolve, reject) => {
      Axios.put(UrlDefineDispatcherMachine.PUT_ALIAS, new CommonMachineSetAliasReq(machineSign, alias))
        .then(resp => {
          resolve(resp.data.success)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static SetTags(machineSign: string, tagKeys: string[]) {
    let req = new DispatcherMachineSetTagsReq(machineSign)
    req.tagKeys = tagKeys
    return new Promise((resolve, reject) => {
      Axios.put(UrlDefineDispatcherMachine.PUT_TAGS, req)
        .then(resp => {
          resolve(resp.data.success)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static GetTags() {
    return new Promise((resolve, reject) => {
      Axios.get(UrlDefineDispatcherMachine.GET_TAGS)
        .then(resp => {
          // if(resp.data.success){
          //   resolve(resp.data.data)
          // }
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static CreateTags() {

  }

}
