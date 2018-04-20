import BaseLemmaAdapter from '../base_adapter'
import { Lemma, Translation } from 'alpheios-data-models'
import DefaultConfig from './config.json'

class AlpheiosLemmaAdapter extends BaseLemmaAdapter {
  /**
   * A Client Adapter for the Alpheios Lemma service
   * @constructor
   * @param {Object} config - JSON configuration object override
   */
  constructor (config = {}) {
    super()
    try {
      this.config = JSON.parse(DefaultConfig)
    } catch (e) {
      this.config = Object.assign({}, DefaultConfig)
    }
    Object.assign(this.config, config)
  }

  /**
   * @override BaseLemmaAdapter#getTranslation
   */
  async getTranslation (lemmas, outputLang = 'eng') {
    try {
      const inputLemmas = lemmas.map(lemma => new Lemma(lemma.word, lemma.languageID))
      const url = `${this.config.base_url}/${inputLemmas[0].languageCode}/${outputLang}?input=${inputLemmas.map(lemma => lemma.word).toString()}`
      const res = await this.fetch(url)
      return res.map(item => Translation.readObject(item))
    } catch (e) {
      console.error(e)
    }
  }
}
export default AlpheiosLemmaAdapter
