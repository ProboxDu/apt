<template>
  <el-menu :default-active="activeIndex"
           router mode="horizontal"
           @select="handleSelect"
           background-color="#1c1f24"
           text-color="#ababab"
           active-text-color="#ffffff">
    <el-row type="flex">
      <el-col>
        <el-menu-item index="/"><b>APT威胁情报知识库</b></el-menu-item>
      </el-col>
      <el-col>
        <el-menu-item index="" disabled="true"></el-menu-item>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-menu-item v-for="(item,i) in indexList"
                        :key="i"
                        :index="item.index">
            {{ item.label }}
          </el-menu-item>
        </el-row>
      </el-col>
    </el-row>

  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      indexList:[
        {index:'/home/reportsearch', label: '报告全文检索'},
        {index:'/home/intelligence', label: '情报查询'},
        {index:'/home/aptaa', label: 'APT图谱关联分析'},
        {index:'/home/reportmanage', label: '报告上传与管理'},
        {index:'/home/audit', label: '信息审核'},
      ],
      activeIndex: "/home/reportsearch"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.activeIndex = this.$route.path;
  }
}
</script>
<style scoped>
.el-menu {
  min-width: 600px;
  padding-left: 10px;
  padding-right: 10px;
}
.el-menu > .el-menu-item {
  min-width: fit-content;
  padding: 0 10px;
  box-sizing: content-box;
  text-align: center;
}


</style>
