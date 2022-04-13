<!-- 我的页面 -->
<template>
  <div class='information' v-if="this.tableData">

    <el-row type="flex" justify="center" v-for="(o,index0) in 3" :key="o" >
      <el-col :span="8" v-for="(o,index1) in 3" :key="o" style="text-align:center;">

        <el-card :body-style="{ padding: '5px' }" style="margin:10px" v-if="tableData[index0*3+index1]">

          <img :src="require(`@/assets/img/apt-pic/${3*index0+index1+1}.png`)" class="image" style="width:100px;height:100px">

          <div style="padding: 14px;">

            <span style="font-weight:bold;font-size:20px">{{tableData[index0*3+index1].aptName[0]}}</span>

            <div class="bottom clearfix">
              <el-button type="text" class="button"  @click="handleSearch(tableData[index0*3+index1].aptName[0])">详细信息</el-button>
            </div>
          </div>
        </el-card>

      </el-col>

    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="20">

        <div style="text-align:center;margin-top:20px">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </el-col>

    </el-row>


  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      currentPage:1,
      pagesize:9,
      total : 40,
      tableData:null,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created () {
    const { data: ret } = await this.$http.get('/api/apt/list/'+this.currentPage)
    this.total = ret.total
    this.tableData = ret.data
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    handleSearch(aptname) {

      this.$router.push({path:'/groupInfo?aptname='+aptname})
    },
    handleCurrentChange: async function(current){
      this.currentPage = current
      const { data: ret } = await this.$http.get('/api/apt/list/'+this.currentPage)
      console.log(ret)
      this.total = ret.total
      this.tableData = ret.data


    }
  }
}
</script>

<style>
.information{
  margin: auto;
  width: 50%;
}

</style>
