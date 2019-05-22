import ServerNodeResp from '@/dto/ServerNodeResp'
import Axios from 'axios'
import UrlDefineServerNode from '@/define/url/UrlDefineServerNode'

export default class ServerNodeService {
  static list (): Promise<ServerNodeResp[]> {
    return new Promise<ServerNodeResp[]>((resolve, reject) => {
      Axios.get(UrlDefineServerNode.LIST)
        .then(resp => {
          let serverNodeResp: ServerNodeResp[] = resp.data.data
          resolve(serverNodeResp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
