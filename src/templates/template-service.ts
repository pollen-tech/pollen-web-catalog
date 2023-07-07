import { Templates, type TemplateDataType } from './template-types'
export default class TemplateService {
  static instance: TemplateService
  // Singleton pattern
  static getInstance() {
    if (!this.instance) {
      this.instance = new TemplateService()
    }
    return this.instance
  }

  /**
   * load html template
   * @param template
   * @param data
   * @returns [subject, html-template]
   */
  loadEmailTemplate<K extends keyof TemplateDataType>(
    template: K,
    data: TemplateDataType[K]
  ): [string, string] {
    let templateHtml = Templates[template].template
    for (const props in data) {
      templateHtml = templateHtml.replace(
        new RegExp(`{{.${props}}}`, 'g'),
        data[props] as string
      )
    }
    let templateSubject = Templates[template].subject
    for (const props in data) {
      templateSubject = templateSubject.replace(
        new RegExp(`{{.${props}}}`, 'g'),
        data[props] as string
      )
    }
    return [templateSubject, templateHtml]
  }
}
