export default class EnvironmentCreateEvCompReq {
  environmentComponentName: string
  environmentComponentDescription: string

  constructor(environmentComponentName: string, environmentComponentDescription: string) {
    this.environmentComponentName = environmentComponentName
    this.environmentComponentDescription = environmentComponentDescription
  }
}
