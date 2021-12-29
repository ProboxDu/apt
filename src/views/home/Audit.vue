<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="文本信息" name="text">文本信息</el-tab-pane>
    <el-tab-pane label="图片信息" name="pic">图片信息</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Audit",
  data() {
    return {
      activeName: 'text'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

</style>