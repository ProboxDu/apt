<template>
<!--  <el-tabs type="border-card">-->
<!--    <el-tab-pane label="报告检索">-->
<!--      -->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" v-bind:class="{middle: !(search && (reportsTableData.length > 0)) }">
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
<!--            <el-button type="primary" slot="append" icon="el-icon-search" @click="onSubmit"></el-button>-->
          </el-input>

<!--          <div style="margin-top: 10px">-->
<!--            <el-checkbox v-model="form.condition" true-label="and" false-label="or">精确查询(多条件)</el-checkbox>-->
<!--            <el-checkbox v-model="form.word_segment" true-label="true" false-label="false">模糊匹配</el-checkbox>-->
<!--          </div>-->
        </el-col>
        <el-col :span="3">
          <el-button type="primary" class="search_button"  @click="onSubmit">搜索</el-button>
        </el-col>
      </el-row>
      <el-row  v-if="search && (reportsTableData.length > 0)" type="flex" justify="space-around" style="height: calc(85vh - 100px); margin-top: 10px">
        <el-col :span="6" >
          <el-table
              ref="reportsTable"
              :data="reportsTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
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
              <template v-slot="scope">
                <span v-html="showHighlight(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" >
            <el-pagination
                :hide-on-single-page="pageNumber <= 1"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="pageNumber">
            </el-pagination>
          </el-row>
        </el-col>
        <el-col :span="16" style="height:100%">
            <iframe :src="'/static/pdfjs-dist/web/viewer.html?file=' + pdfUrl" height="100%" width="100%" style="border: none"></iframe>
<!--          <iframe :src="pdfUrl" height="100%" width="100%" style="border: none"></iframe>-->
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
      reportsTableData: [],
      currentRow: null,
      pdfUrl:'',
      pageNumber: 1,
      currentPage: 1,
      pageSize:10,
    }
  },
  methods: {
    async onSubmit() {
      this.currentRow = null
      this.reportsTableData = []
      this.search = true
      if (this.form.keywords === ''){
        this.$message.error('请输入关键词查询')
        return
      }
      // 重写搜索参数
      let query = this.$router.history.current.query;
      let path = this.$router.history.current.path;
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery.query = this.form.keywords
      await this.$router.push({path, query: newQuery})

      let params = new FormData()
      for (let i in this.form){
        params.append(i, this.form[i])
      }
      this.$http.post('/api/search/es_doc/', params).then((res)=>{
        let status = res.status;
        if (status === 200){
          // console.log(res.data)
          if (res.data['label'] === 0){
            this.reportsTableData = res.data['message']
            this.pageNumber = this.reportsTableData.length
            // console.log(this.reportsTableData)
            // console.log(this.pageNumber)
            this.$nextTick(() => {
              if( this.reportsTableData.length > 0){
                // console.log('set currentrow')
                this.$refs.reportsTable.setCurrentRow(1);
                this.pdfUrl = this.reportsTableData[Object.keys(this.reportsTableData)[0]].url + '&query=' + this.form.keywords
              }
            });
          }else {
            this.$alert(res.data['message'], '提示', {
              confirmButtonText: '确定',
            });
          }
        }else{
          this.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log(error)
        this.$message.error(error.toString())
      });
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentRow = val;

      this.pdfUrl = val.url + '&query=' + this.form.keywords
      console.log(this.pdfUrl.toString())
    },
    // // 每页显示的条数
    // handlePageSizeChange(val) {
    //   // 改变每页显示的条数
    //   this.pageSize = val
    //   // 注意：在改变每页显示的条数时，要将页码显示到第一页
    //   this.currentPage = 1
    // },
    // 显示第几页
    handleCurrentPageChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    showHighlight(val){
      // console.log(val)
      let text = val.highlight_title + '';
      if ( text.indexOf('<em>') !== -1 &&  text.indexOf('</em>') !== -1) {
        text = text.replaceAll('<em>', '<span class="highlight_keywords">')
        text = text.replaceAll('</em>', '</span>')
      }
      // console.log(text)
      return text
    }
  }
}
</script>

<style>
.middle{
  margin-top: calc(40vh - 90px);
}
.highlight_keywords{
  color: red
}
</style>
