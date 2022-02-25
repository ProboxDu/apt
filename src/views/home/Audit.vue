<template>
<!--  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">-->
<!--    <el-tab-pane label="信息审核" name="text">-->
<!--      -->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" v-if="fileList.length > 0" style="height: calc(90vh - 90px);margin-top: 20px;min-height: 300px">
        <el-col ref="auditList" >
          <h2 style="text-align: center;margin-bottom: 10px;">待审核文件列表</h2>
          <el-row type="flex" justify="center">
            <el-radio-group v-model="radio" @change="radioChange()">
              <el-radio-button label="PDF"></el-radio-button>
              <el-radio-button label="HTML"></el-radio-button>
              <el-radio-button label="图片"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-table
              :data="fileList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="">
            <el-table-column
                prop="file_name"
                label="文件名"
                :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column
                prop="state_code"
                label="抽取状态"
                width="90">
              <template slot-scope="scope">
                <span v-if="scope.row.state_code === 1">已完成</span>
                <span v-else>未完成</span>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="center" >
            <el-col :span="6">
              <el-pagination
                  :hide-on-single-page="pageNumber <= 1"
                  @current-change="handleCurrentPageChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="pageNumber">
              </el-pagination>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" v-if="pdfUrl !== '' || htmlUrl !== '' || picUrl !== ''" style="margin-left: 10px">
          <iframe v-if="radio === 'PDF'" :src="pdfUrl" height="100%" width="100%" style="border: none"></iframe>
          <iframe v-else-if="radio === 'HTML'" :src="htmlUrl" height="100%" width="100%" style="border: none"></iframe>
          <img v-else :src="picUrl" height="100%" width="100%" alt="none">
        </el-col>
        <el-col :span="6" v-if="Object.keys(ioc_result).length > 0" style="height: 100%;margin-left: 10px">
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
              </el-row>
            </JsonEditor>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" v-else style="margin-top: calc(30vh - 90px);min-height: 300px">
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
      fileList:[],
      currentRow: null,
      pdfUrl:"",
      htmlUrl:"",
      picUrl: "",
      ioc_result: {},
      pageNumber: 1,
      currentPage: 1,
      pageSize:10,
    };
  },
  methods: {
    radioChange(){
      console.log(this.radio)
    },
    handleCurrentPageChange(val) {
      // 改变默认的页数
      this.currentPage = val
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
        this.$refs.auditList.span = 5
      }else {
        this.pdfUrl = '';
        this.htmlUrl = '';
        this.picUrl = '';
        this.ioc_result = {}
        this.dialogVisible = true
        this.$refs.auditList.span = 9
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
  },
  created() {

  },
  mounted() {
    let params = {
      'type' : 'PDF'
    }
    this.$http.post('/api/infoExtract/refresh_progress/', params).then((res)=>{
      let status = res.status;
      if (status === 200){
        // console.log(res.data)
        if (res.data['label'] === 0){
          this.fileList = JSON.parse(res.data['message']).progress_result_list
          this.pageNumber = this.fileList.length
          console.log(this.fileList)
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
  watch: {
    fileList: function(newValue) {
      if (newValue.length > 0){
        this.$refs.auditList.span = 9
      }
    },
  },
}
</script>

<style>
.edit-cell {
  min-height: 25px;
  cursor: pointer;
}
</style>
