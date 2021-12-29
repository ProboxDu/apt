<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="单项查询" name="single">
      <el-container>
        <el-aside width="400px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型" required>
              <el-select v-model="form.option" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="条件" required>
              <el-input v-model="form.value" placeholder="请输入内容，多个输入请用中文分号分隔"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main>
          <Graph/>
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="多项查询" name="multiple">
      <el-container>
        <el-aside width="400px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型" required>
              <el-select v-model="form.option" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="条件" required>
              <el-input v-model="form.value" placeholder="请输入内容，多个输入请用中文分号分隔"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main>
          Contents
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Graph from "@/components/Graph";
export default {
  name: "IntelligenceSearch",
  components: {Graph},
  data() {
    return {
      form: {
        option: 'IP',
        value: '',
      },
      options:[{
        value: 'ip',
        label: 'IP',
      },{
        value: 'domain',
        label: '域名',
      },],
      activeName: 'single'
    };
  },
  methods: {
    async onSubmit() {
      //console.log(this.form.options, this.form.value)
      //console.log("submit")
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
</style>
