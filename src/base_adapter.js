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
            let json = response.json()
            resolve(json)
          } else {
            reject(response.statusText)
          }
        } catch (error) {
          reject(error)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default BaseLemmaAdapter
