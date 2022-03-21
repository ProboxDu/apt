<!-- 我的页面 -->
<template>
  <div class='information' v-if="this.tableData">

       <el-row type="flex" justify="center">
      <el-col :span="18">

       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="组织名"
      width="180">
      <template slot-scope="scope">
          <div style="text-align:center;">
              <span v-if="scope.row.aptName&&scope.row.aptName.length==1">{{ scope.row.aptName[0] }}</span>
          </div>

      </template>
    </el-table-column>
    <el-table-column
      label="影响地点"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p v-if="scope.row.affectedLocation&&scope.row.affectedLocation.length>0">{{ scope.row.affectedLocation.join(",") }}</p>

          <div slot="reference" class="name-wrapper" style="text-align:center;">
            <el-tag size="medium" v-if="scope.row.affectedLocation&&scope.row.affectedLocation.length>0">{{ scope.row.affectedLocation[0] }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

      <el-table-column
      label="影响行业"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p v-if="scope.row.affectedSector&&scope.row.affectedSector.length>0">{{ scope.row.affectedSector.join(",") }}</p>

          <div slot="reference" class="name-wrapper" style="text-align:center;">
            <el-tag size="medium" v-if="scope.row.affectedSector&&scope.row.affectedSector.length>0">{{ scope.row.affectedSector[0] }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

          <el-table-column
      label="别名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p v-if="scope.row.attackerAlias&&scope.row.attackerAlias.length>0">{{ scope.row.attackerAlias.join(",") }}</p>

          <div slot="reference" class="name-wrapper" style="text-align:center;">
            <el-tag size="medium" v-if="scope.row.attackerAlias&&scope.row.attackerAlias.length>0">{{ scope.row.attackerAlias[0] }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

        <el-table-column
      label="所属地"
      width="180">
      <template slot-scope="scope">
          <div style="text-align:center;">
              <span v-if="scope.row.belongLocation&&scope.row.belongLocation.length>0">{{ scope.row.belongLocation[0] }}</span>
          </div>

      </template>
    </el-table-column>

    <el-table-column label="操作">

      <template slot-scope="scope">
              <div style="text-align:center;">
        <el-button
          size="mini"
          @click="handleSearch(scope.$index, scope.row)">详细信息</el-button>
           </div>
      </template>

    </el-table-column>
  </el-table>
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
        pagesize:10,
        total : 39,
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
      handleSearch(index, row) {
        console.log(index, row);
        let aptname = row.aptName
        this.$router.push({path:'/groupInfo?aptname='+aptname})
      },
      handleCurrentChange: async function(current){
        this.currentPage = current
          const { data: ret } = await this.$http.get('/api/apt/list/'+this.currentPage)
         this.total = ret.total
         this.tableData = ret.data

      }
  }
}
</script>

<style>


</style>
