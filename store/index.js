export const state = () => ({
  res: null,
  isProgress: false,
  fileName: null,
  fileSetted: false,
  fileDom: null
})

export const getters = {
  getFiledom(state) {
    return state.fileDom
  }
}

export const mutations = {
  upload(state, msg) {
    state.res = msg
  },
  toggleProgress(state) {
    state.isProgress = !state.isProgress
  },
  fileSetToggle(state) {
    state.fileSetted = !state.fileSetted
  },
  updateFileName(state, dom) {
    state.fileName = dom.name
    state.fileDom = dom
  }
}
