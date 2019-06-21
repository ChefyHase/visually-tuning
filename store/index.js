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
  updateFileName(state, dom) {
    state.fileName = dom.name
    state.fileDom = dom
    state.isShowUploadButton = true
  },
  toggleIsModalOpen(state) {
    state.isModalOpen = !state.isModalOpen
  }
}
