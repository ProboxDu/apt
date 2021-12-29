<template>
  <el-menu :default-active="activeIndex"
           router mode="horizontal"
           @select="handleSelect"
           background-color="#1c1f24"
           text-color="#ffffff"
           active-text-color="#ffffff">
    <el-menu-item index="/home/reportsearch"> 报告全文检索</el-menu-item>
    <el-menu-item index="/home/intelligence"> 情报查询</el-menu-item>
    <el-menu-item index="/home/aptaa">APT图谱关联分析</el-menu-item>
    <el-menu-item index="/home/reportmanage">报告上传与管理</el-menu-item>
    <el-menu-item index="/home/audit">信息审核</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/reportsearch"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.defaultActive = this.$route.path;
  }
}
</script>
<style scoped>

</style>
