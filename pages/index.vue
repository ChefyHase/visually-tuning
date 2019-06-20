<template lang="pug">
section.hero.is-fullheight
  .hero-head
    nav.navbar
      .container
        .navbar-brand
        .navbar-menu
          .navbar-end
            a.navbar-item About
            a.navbar-item API
  .hero-body
    .container
      div(v-if="!$store.state.fileSetted").file.is-boxed
        label.file-label.is-center
          input(type="file" name="file" @change="showFileName")#file.file-input
          span.file-cta
            span.file-label Choose a file…
      p(v-else).has-text-centered.is-size-1 {{ $store.state.fileName }}
      progress(v-if="$store.state.isProgress").progress.is-danger.is-large
      p.has-text-centered.is-size-1 {{ $store.state.res }}
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
      } else {
        this.$store.commit('toggleProgress')

        params.append('file', fileSelectDom)
        const res = await axios.post(
          'http://localhost:3000/api/genshiChouritsu',
          params
        )

        this.$store.commit('toggleProgress')
        this.$store.commit('upload', res.data.msg)
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
