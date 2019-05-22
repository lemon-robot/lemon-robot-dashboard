import ServerNode from '@/entity/ServerNode'

export default class ServerNodeResp {
  nodeInfo: ServerNode = new ServerNode()
  activeState = false
}
