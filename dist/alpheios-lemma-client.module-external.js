import { Lemma, Translation } from 'alpheios-data-models';

/**
 * Base Adapter Class for a Lemma Service
 */
class BaseLemmaAdapter {
  /**
   * Translate lemma into a selected language
   * @param {Lemma[]} lemma Lemmas to translate
   * @param {String} outputLang A output destination language
   * @return {Promise} a Promise that resolves to a translated language
   */
  async getTranslation (lemmas, outputLang) {
    throw new Error('Unimplemented')
  }

  /**
   * Loads a data from a URL
   * @param {string} url - the url of the file
   * @returns {Promise} a Promise that resolves to the text contents of the loaded file
   */
  fetch (url) {
    // TODO figure out best way to load this data
    return new Promise((resolve, reject) => {
      window.fetch(url).then((response) => {
        try {
          if (response.ok) {
            let json = response.json();
            resolve(json);
          } else {
            reject(response.statusText);
          }
        } catch (error) {
          reject(error);
        }
      }).catch((error) => {
        reject(error);
      });
    })
  }
}

var DefaultConfig = "{\n  \"base_url\": \"http://127.0.0.1:5000\"\n}\n";

class AlpheiosLemmaAdapter extends BaseLemmaAdapter {
  /**
   * A Client Adapter for the Alpheios Lemma service
   * @constructor
   * @param {Object} config - JSON configuration object override
   */
  constructor (config = {}) {
    super();
    try {
      this.config = JSON.parse(DefaultConfig);
    } catch (e) {
      this.config = Object.assign({}, DefaultConfig);
    }
    Object.assign(this.config, config);
  }

  /**
   * @override BaseLemmaAdapter#getTranslation
   */
  async getTranslation (lemmas, outputLang = 'eng') {
    try {
      const inputLemmas = lemmas.map(lemma => new Lemma(lemma.word, lemma.languageID));
      const url = `${this.config.base_url}/${inputLemmas[0].languageCode}/${outputLang}?input=${inputLemmas.map(lemma => lemma.word).toString()}`;
      const res = await this.fetch(url);
      return res.map(item => Translation.readObject(item))
    } catch (e) {
      console.error(e);
    }
  }
}

export { AlpheiosLemmaAdapter };
