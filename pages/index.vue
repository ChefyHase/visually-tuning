<template lang="pug">
section.hero.is-fullheight
  .hero-head
    nav.navbar
      .container
        .navbar-brand
        .navbar-menu
          .navbar-end
            a.navbar-item About
            a(@click="toggleModal").navbar-item API
  .hero-body
    .container
      p.has-text-centered.is-size-1 {{ $store.state.fileName }}
      progress(v-if="$store.state.isProgress").progress.is-danger.is-large
      p(v-else).has-text-centered.is-size-1 {{ $store.state.res }}
      div(v-if="!$store.state.fileSetted").file.is-boxed
        label.file-label.is-center
          input(type="file" name="file" @change="showFileName")#file.file-input
          span.file-cta
            span.file-label Choose a file…

  div#modal.modal
    .modal-background
    .modal-content
    button(@click="toggleModal").modal-close.is-large
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    showFileName: function() {
      const fileSelectDom = document.getElementById('file').files[0]
      this.$store.commit('updateFileName', fileSelectDom)
      this.$store.commit('fileSetToggle')

      this.upload()
    },
    upload: async function() {
      const fileSelectDom = this.$store.getters.getFiledom
      const params = new FormData()

      if (!fileSelectDom || fileSelectDom.type !== 'audio/wav') {
        this.$store.commit('upload', 'invaild')
        this.$store.commit('fileSetToggle')
      } else {
        this.$store.commit('toggleProgress')

        params.append('file', fileSelectDom)
        const res = await axios.post(
          process.env.HOST + '/api/genshiChouritsu',
          params
        )

        this.$store.commit('toggleProgress')
        this.$store.commit('upload', res.data.msg)
        this.$store.commit('fileSetToggle')
      }
    },
    toggleModal: function() {
      const modal = document.getElementById('modal')
      if (this.$store.getters.isModalOpen) {
        modal.classList.remove('is-active')
        this.$store.commit('toggleIsModalOpen')
      } else {
        modal.classList.add('is-active')
        this.$store.commit('toggleIsModalOpen')
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
