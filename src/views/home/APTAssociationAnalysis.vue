<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="APT组织" name="a">

    </el-tab-pane>
    <el-tab-pane label="APT报告" name="b">

    </el-tab-pane>
    <el-tab-pane label="IOCs" name="c">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "APTAssociationAnalysis",
  data() {
    return {
      activeName: 'a'
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