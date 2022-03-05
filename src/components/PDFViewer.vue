<template>
  <iframe
      width="100%"
      height="100%"
      :src=pdfUrl
      id="myIframe"
  ></iframe>
</template>

<script>

export default {
  name: "PDFViewer",
  components: {
  },
  data() {
    return {
      pdfUrl : '/static/pdfjs-dist/web/viewer.html?file=http://10.2.13.232:8000/media/pdf_upload_data/【奇安信】双尾蝎（APT-C-23）伸向巴以两国的毒针.pdf'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
