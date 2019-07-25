import axios from 'axios'
import UrlDefineEnvironment from '@/define/url/UrlDefineEnvironment'
import EnvironmentCreateEvCompReq from '@/dto/EnvironmentCreateEvCompReq'
import EnvironmentComponent from '@/dto/EnvironmentComponent'

export default class EnvironmentService {
  static CreateEvComponents(environmentComponentName: string, environmentComponentDescribe: string) {
    return new Promise((resolve, reject) => {
      axios.put(UrlDefineEnvironment.CREATE_EV_COMPONENTS, new EnvironmentCreateEvCompReq(environmentComponentName, environmentComponentDescribe)).then((resp) => {
        resolve(resp.data.success)
      }).catch(err => {
        reject(err)
      })
    })
  }

  static GetEvComponentsList(): Promise<EnvironmentComponent[]> {
    return new Promise<EnvironmentComponent[]>((resolve, reject) => {
      axios.get(UrlDefineEnvironment.GET_EV_COMPONENTS_LIST).then((resp) => {
        let EnvironmentComponent: EnvironmentComponent[] = resp.data.data
        resolve(EnvironmentComponent)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // static DeleteEvComponents(environmentComponentKey: string) {
  //
  // }
}
