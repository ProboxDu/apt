<template>
<!--  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">-->
<!--    <el-tab-pane label="信息审核" name="text">-->
<!--      -->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-aside v-if="fileList.length > 0" :width="isCollapse ? '30px' : '350px' ">
      <el-row type="flex" justify="space-between" style="margin-top: 20px;">
        <el-select v-if="!isCollapse" v-model="radio" size="mini" style="width:90px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button v-if="!isCollapse" type="warning" @click="deleteReport" size="mini" icon="el-icon-delete"></el-button>
        <el-button v-if="isCollapse" type="primary" @click="toggleCollapse" circle size="mini" icon="el-icon-arrow-right"></el-button>
        <el-button v-if="!isCollapse" type="primary" @click="toggleCollapse" circle size="mini" icon="el-icon-arrow-left"></el-button>
      </el-row>
      <el-row type="flex" justify="center" v-if="fileList.length > 0 && !isCollapse" style="height: calc(90vh - 120px);margin-top: 20px;min-height: 300px">
        <el-col ref="auditList">
          <el-table
              :data="fileList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              highlight-current-row
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              style="width:100%">
            <el-table-column
                prop="file_name"
                label="文件名"
                :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <span v-if="scope.row.isOcrReport === 1">*</span>
                {{scope.row.file_name}}
              </template>
            </el-table-column>
            <el-table-column
                prop="state_code"
                label="抽取状态"
                width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.state_code === 1">已完成</span>
                <span v-else>未完成</span>
              </template>
            </el-table-column>
            <el-table-column
                type="selection"
                width="45">
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" >
            <el-pagination
                :hide-on-single-page="pageNumber / pageSize <= 1"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="pageNumber">
            </el-pagination>
          </el-row>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-row type="flex" justify="center" v-if="fileList.length > 0" style="height: calc(90vh - 90px);margin-top: 20px;min-height: 300px">
        <el-col :span="16" v-if="pdfUrl !== '' || htmlUrl !== '' || picUrl !== ''" style="margin-left: 10px">
          <iframe v-if="radio === 'PDF'"  :src="'/static/pdfjs-dist/web/viewer.html?file=' + pdfUrl" height="100%" width="100%" style="border: none"></iframe>
          <iframe v-else-if="radio === 'HTML'" :src="htmlUrl" height="100%" width="100%" style="border: none"></iframe>
          <img v-else :src="picUrl" height="100%" width="100%" alt="none">
        </el-col>
        <el-col :span="8" v-if="Object.keys(ioc_result).length > 0" style="height: 100%;margin-left: 10px">
          <el-row style="height: calc(90vh - 130px)">
            <JsonEditor
                ref="jsonEditor"
                v-model="ioc_result"
            >
              <el-row type="flex" justify="center" style="margin-top: 10px">
                <el-button-group>
                  <el-button type="primary" @click="onJsonSave" size="mini">保存</el-button>
                  <el-button type="primary" @click="onJsonSubmit" size="mini">提交</el-button>
                </el-button-group>
                <el-button type="primary" @click="onJsonExport" size="mini">导出</el-button>
              </el-row>
            </JsonEditor>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-if="fileList.length === 0"  style="margin-top: calc(30vh - 90px);min-height: 300px">
        <el-col :span="8">
          <el-row type="flex" justify="center" style="margin-bottom: 20px">
            <h1>当前暂无待审核文件</h1>
          </el-row>
          <img src="../../assets/img/error/404.png" alt="404" style="width: 100%">
        </el-col>
      </el-row>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
        <span>当前信息抽取未完成，请等待！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import JsonEditor from "@/components/JsonEditor";

export default {
  name: "Audit",
  components:{
    JsonEditor
  },
  data() {
    return {
      activeName: 'text',
      dialogVisible: false,
      radio: 'PDF',
      options:[{
        value: 'PDF',
        label: 'PDF',
      },{
        value: 'HTML',
        label: 'HTML',
      },{
        value: 'PICTURE',
        label: '图片',
      }],
      fileList:[],
      currentRow: null,
      pdfUrl:"",
      htmlUrl:"",
      picUrl: "",
      ioc_result: {},
      pageNumber: 1,
      currentPage: 1,
      pageSize:10,
      isCollapse:false,
      multipleSelection: [],
    };
  },
  methods: {
    deleteReport() {
      this.$confirm("此操作将删除服务器上传的报告文件，是否继续？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new FormData()
        let report_id = []
        for (let i in this.multipleSelection){
          report_id.push(this.multipleSelection[i].report_id)
        }
        // console.log(report_id)
        params.append("report_id", report_id)
        // console.log(params)
        this.$http.post('/api/infoExtract/delete_report/', params).then((res)=>{
          let status = res.status;
          if (status === 200){
            // console.log(res.data)
            if (res.data['label'] === 0){
              this.refreshProgress(this.radio)
            }else {
              this.$alert(res.data['message'], '提示', {
                confirmButtonText: '确定',
              });
            }
          }else{
            this.$message.error(res.message)
          }
        }).catch(function (error) {
          console.log(error);
          this.$message.error(error.toString())
        });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCurrentPageChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentRow = val;
      if (val.state_code === 1){
        if (this.radio === 'PDF'){
          this.pdfUrl = val.highlight_pdf_url
          // console.log(this.pdfUrl)
        }else if (this.radio === 'HTML'){
          this.htmlUrl = val.url
        }else{
          this.picUrl = val.url
        }

        this.ioc_result = JSON.parse(val.ioc_result_content)
        this.ioc_result.ner_result = JSON.parse(val.ner_result_content)
        this.ioc_result.ocr_result = JSON.parse(val.ocr_result_content).ioc_result
        // console.log(this.ioc_result)
      }else {
        this.pdfUrl = '';
        this.htmlUrl = '';
        this.picUrl = '';
        this.ioc_result = {}
        this.dialogVisible = true
      }
    },
    onJsonSave(){
      let value = this.$refs.jsonEditor.getValue()
      if (this.ioc_result !== value) {
        this.ioc_result = value;
      }
    },
    onJsonSubmit() {
      let params = new FormData()
      for (let i in this.ioc_result){
        params.append(i, this.ioc_result[i])
      }
      this.$http.post('/api/infoExtract/submit', params).then((res)=>{
        let status = res.status;
        if (status === 200){
          console.log(res.data);
          this.$alert(res.data['message'], '提示', {
            confirmButtonText: '确定',
          });
          // if (res.data['label'] === 0){
          //   this.reports = res.data['message']
          //
          // }else {
          //   this.$alert(res.data['message'], '提示', {
          //     confirmButtonText: '确定',
          //   });
          // }
        }else{
          this.$message.error(res.message)
        }
      }).catch(function (error) {
        console.log(error)
        this.$message.error(error.toString())
      });
    },
    onJsonExport(){
      var data = JSON.stringify(this.ioc_result)
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
      //通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "ioc_result.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;	//点击折叠按钮后，对isCollapse进行取反
    },
    refreshProgress(type){
      let params = {
        'type' : type
      }
      this.$http.post('/api/infoExtract/refresh_progress/', params).then((res)=>{
        let status = res.status;
        if (status === 200){
          // console.log(res.data)
          if (res.data['label'] === 0){
            this.fileList = JSON.parse(res.data['message']).progress_result_list
            this.pageNumber = this.fileList.length
            // console.log(this.fileList)
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
    }
  },
  created() {

  },
  mounted() {
    this.refreshProgress('PDF');
  },
  watch: {
  },
}
</script>

<style>
.edit-cell {
  min-height: 25px;
  cursor: pointer;
}
</style>
