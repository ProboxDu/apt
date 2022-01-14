<template>
<!--  <el-tabs type="border-card">-->
<!--    <el-tab-pane label="报告检索">-->
<!--      -->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" v-bind:class="{middle: !(search && (reports.length > 0)) }">
        <el-col :span="12">
          <el-input placeholder="请输入关键词，多个输入请用中文分号分隔" v-model="form.keywords">
            <el-select v-model="form.range" slot="prepend" style="width:120px">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
          </el-input>
          <div style="margin-top: 10px">
            <el-checkbox v-model="form.condition" true-label="and" false-label="or">精确查询(多条件)</el-checkbox>
            <el-checkbox v-model="form.word_segment" true-label="true" false-label="false">模糊匹配</el-checkbox>
          </div>
        </el-col>
      </el-row>
      <el-row  v-if="search && (reports.length > 0)" type="flex" justify="space-around" style="height: calc(85vh - 100px); margin-top: 10px">
        <el-col :span="6" >
          <el-table
              ref="reportsTable"
              :data="reports"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
              title="报告检索结果列表">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                property="title"
                label="标题">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16" style="height:100%">
          <iframe :src="pdfUrl" height="100%" width="100%" style="border: none"></iframe>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ReportSearch",
  data() {
    return {
      search:false,
      checkList:[],
      form: {
        index: 'apt',
        range: 'title',
        keywords: '',
        condition: 'or',
        word_segment: 'false',
      },
      options:[{
        value: 'title',
        label: '报告名称',
      },{
        value: 'document',
        label: '报告内容',
      }],
      reports: [],
      currentRow: null,
      pdfUrl:''
    }
  },
  methods: {
    async onSubmit() {
      this.currentRow = null
      this.reports = []
      this.search = true
      if (this.form.keywords === ''){
        this.$message.error('请输入关键词查询')
        return
      }
      let params = new FormData()
      for (let i in this.form){
        params.append(i, this.form[i])
      }
      this.$http.post('/api/search/es_doc/', params).then((res)=>{
        let status = res.status;
        if (status === 200){
          console.log(res.data)
          if (res.data['label'] === 0){
            this.reports = res.data['message']
            this.$nextTick(() => {
              if( this.reports.length > 0){
                this.$refs.reportsTable.setCurrentRow(1);
              }
            });
          }else {
            this.$alert(res.data['message'], '提示', {
              confirmButtonText: '确定',
            });
          }
          //this.pdfUrl = this.reports[Object.keys(this.reports)[0]].url
          //console.log(this.pdfUrl)
        }else{
          this.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log(error)
        this.$message.error(error.toString())
      });
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val;
      //this.pdfUrl = "/static/【奇安信】盲眼鹰（APT-C-36）针对哥伦比亚政企机构的攻击活动揭露.pdf"
      this.pdfUrl = this.reports[Object.keys(this.reports)[val - 1]].url
    }
  }
}
</script>

<style scoped>
.middle{
  margin-top: calc(40vh - 90px);
}

</style>
