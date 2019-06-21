export const state = () => ({
  res: null,
  isProgress: false,
  fileName: null,
  fileSetted: false,
  fileDom: null,
  isShowUploadButton: false,
  isModalOpen: false
})

export const getters = {
  getFiledom(state) {
    return state.fileDom
  },
  isModalOpen(state) {
    return state.isModalOpen
  }
}

export const mutations = {
  upload(state, msg) {
    state.res = msg
  },
  toggleProgress(state) {
    state.isProgress = !state.isProgress
    state.isShowUploadButton = false
  },
  fileSetToggle(state) {
    state.fileSetted = !state.fileSetted
  },
  updateFileName(state, doms) {
    state.fileName = Object.keys(doms).map(key => doms[key].name)
    state.fileDom = doms
    state.isShowUploadButton = true
  },
  toggleIsModalOpen(state) {
    state.isModalOpen = !state.isModalOpen
  }
}
