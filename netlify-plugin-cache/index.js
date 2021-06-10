module.exports = {
  async onPreBuild({ utils, inputs }) {
    console.log('will restore cache for folders', inputs.folders)
    await utils.cache.restore(inputs.folders)
  },
  async onPostBuild({ utils, inputs }) {
    console.log('will save cache for folders', inputs.folders)
    await utils.cache.save(inputs.folders)
  },
}
