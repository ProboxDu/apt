<template>
  <el-tabs type="border-card">
    <el-tab-pane label="报告检索">
      <el-container>
        <el-aside width="400px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型" required>
              <el-select v-model="form.range" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="条件" required>
              <el-input v-model="form.keywords" placeholder="请输入内容，多个输入请用中文分号分隔"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
              ref="singleTable"
              :data="reportsTable"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
              title="报告检索结果列表"
              max-height="300">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                property="id"
                label="ID">
            </el-table-column>
            <el-table-column
                property="name"
                label="名称">
            </el-table-column>
          </el-table>
        </el-aside>
        <el-main>
          Contents
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "ReportSearch",
  data() {
    return {
      form: {
        index: 'apt报告',
        range: 'title',
        keywords: '',
      },
      options:[{
        value: 'title',
        label: '报告名称',
      },{
        value: 'document',
        label: '报告内容',
      }],
      reportsTable: [],
      currentRow: 1
    }
  },
  methods: {
    async onSubmit() {
      console.log("submit")

      this.$http.post('/api/search/es_docs',this.form).then((res)=>{
        let status = res.status;
        if (status === 200){
          console.log(res.data)
          //this.$message.info("upload success!")//res.obj)
        }else{
          //this.$message.error(res.message)
        }
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
}
</script>

<style scoped>
</style>
