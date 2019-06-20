<template lang="pug">
section.hero.is-info.is-fullheight
  .hero-head
    nav
  .hero-body
    .container
      div(v-if="!$store.state.fileSetted").file.is-boxed
        label.file-label.is-center
          input(type="file" name="file" @change="showFileName")#file.file-input
          span.file-cta
            span.file-label Choose a file…
      p(v-else).has-text-centered {{ $store.state.fileName }}
      a(@click="upload" v-if="!$store.state.isProgress").button.is-link.is-center upload
      progress(v-else).progress.is-danger.is-large
      p.has-text-centered {{ $store.state.res }}
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    showFileName: function() {
      const fileSelectDom = document.getElementById('file').files[0]
      this.$store.commit('updateFileName', fileSelectDom)
      this.$store.commit('fileSetToggle')
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

<style lang="scss">
.is-center {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
</style>
