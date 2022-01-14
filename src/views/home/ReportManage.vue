<template>
<!--  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">-->
<!--    <el-tab-pane label="报告上传" name="upload">-->
<!--    </el-tab-pane>-->
<!--    <el-tab-pane label="报告管理" name="manage">报告管理</el-tab-pane>-->
<!--  </el-tabs>-->
  <el-container>
    <el-main>
      <el-row type="flex" justify="center" style="margin-top: calc(30vh - 90px)">
        <el-col :span="8" >
          <el-row type="flex" justify="center">
            <el-upload
                ref="upload"
                drag
                :file-list="fileList"
                :accept="fileType"
                :limit="10"
                action=""
                multiple
                :auto-upload="false"
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :http-request="uploadFile"
                :show-file-list="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将待上传文件拖到此处，或<em>点击添加</em>
                <div slot="tip" class="el-upload__tip">只能上传pdf、word、excel、jpg/png/gif格式文件</div>
                <div slot="tip" class="el-upload__tip">文件大小不超过100MB</div>
              </div>
            </el-upload>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" icon="el-icon-upload" @click="submitUpload">上传</el-button>
          </el-row>
        </el-col>
        <el-col :span="6" v-if="fileList.length > 0">
          <h2 style="text-align: center">待上传文件列表</h2>
          <el-table
              :data="fileList"
              stripe
              style="width: 100%"
              max-height="300">
            <el-table-column
                prop="name"
                label="文件名">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick2(scope.$index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "ReportManagement",
  data() {
    return {
      activeName: 'upload',
      dialogVisible: false,
      fileType: '.png,.gif,.jpeg,.jpg,.xls,.xlsx,.doc,.docx,.pdf',
      fileData: '',  // 文件上传数据（多文件合一）
      fileList:[]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(index){
      this.fileList.splice(index,1);
      console.log(index);
    },
    // 选取文件超过数量提示
    handleExceed() {
      this.$message.warning(`当前限制选择 50 个文件`);
    },
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
      console.log(this.fileList);
    },
    beforeUpload(){
      const isLt100M = this.fileList.every(file => file.size / 1024 / 1024 < 100);
      if (!isLt100M) {
        this.$message.error('请检查，上传文件大小不能超过100MB!');
      }
      console.log("before upload");
    },
    uploadFile(file) {
      this.fileData.append("upload_file",file.file);
      //console.log("http-request:",file);
    },
    submitUpload() {
      // if (this.userKey === '') {
      //   this.$message({
      //     message: '填写用户密钥',
      //     type: 'warning'
      //   })
      // }
      // else
      if (this.fileList.length === 0) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
      } else {
        const isLt100M = this.fileList.every(file => file.size / 1024 / 1024 < 100);
        if (!isLt100M) {
          this.$message.error('请检查，上传文件大小不能超过100MB!');
        } else {
          this.fileData = new FormData(); // new formData对象
          this.$refs.upload.submit(); // 提交调用uploadFile函数
          //this.fileData.append('key', this.userKey); // 除了上传文件还能同时传数据
          ///console.log("data:", this.fileData)
          this.$http.post('/upload/',this.fileData).then((res)=>{
            let status = res.status;
            if (status === 200){
              this.fileList = [];
              this.dialogVisible=true
              this.$message.info("upload success!")//res.obj)
            }else{
              this.$message.error(res.message)
            }
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.el-upload__tip {
  font-size: 8px;
  margin-top: 5px;
}
</style>
