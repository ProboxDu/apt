<!-- 我的页面 -->
<template>
  <div class='group'>
    <el-col :span="6">
      <div style="margin-top:50px;margin-left:80px;height:600px">
        <router-link to="/information" tag="button" style="background-color:#6698cb;color:white;font-size:10px;border-radius:4px;padding:6px">返回组织列表页面</router-link>
        <div style="width:200px;margin-top:20px">
          <h2>APT组织</h2>
          <div style="margin-top:10px">
            <p style="font-weight:bold;font-size:20px;padding:5px;background-color:#409EFF;color:white;text-align:center;">{{this.data.name}}</p>

          </div>
        </div>

        <div style="margin-top:30px;width:300px;margin-bottom:40px">
          <div v-if="this.data.alias!=null">
            <span style="font-weight:bold;font-size:20px;padding-right:10px">别名</span>
            {{this.data.alias.join(",")}}
          </div>
          <div style="margin-top:10px"  v-if="this.data.from!=null">
            <span style="font-weight:bold;font-size:20px;padding-right:10px">所属地区</span>
            {{this.data.from.join(",")}}
          </div>
          <div style="margin-top:10px" v-if="this.data.location!=null">
            <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击地区</span>
            {{this.data.location.join(",")}}
          </div>
          <div style="margin-top:10px" v-if="this.data.industry!=null">
            <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击行业</span>
            {{this.data.industry.join(",")}}
          </div>
        </div>

      </div>
    </el-col>
    <el-col :span="4">
      <div style="margin-right:10px">

        <div  style="margin-top:40px;margin-left:10px">
          <el-table
              :data="reportData"
              style="width: 100%"
              key="query_table_2"
              max-height="150">
            <el-table-column
                fixed
                prop="value"
                :label="reportName"
                width="250">
            </el-table-column>

          </el-table>
        </div>

        <div  style="margin-top:30px;margin-left:10px">
          <el-table
              :data="ipData"
              style="width: 100%"
              key="query_table_3"
              max-height="150">
            <el-table-column
                fixed
                prop="value"
                :label="ipName"
                width="250">
            </el-table-column>

          </el-table>
        </div>

        <div  style="margin-top:30px;margin-left:10px">
          <el-table
              :data="domainData"
              style="width: 100%"
              key="query_table_4"
              max-height="150">
            <el-table-column
                fixed
                prop="value"
                :label="domainName"
                width="250">
            </el-table-column>

          </el-table>
        </div>

        <div  style="margin-top:30px;margin-left:10px">
          <el-table
              :data="iocData"
              style="width: 100%"
              key="query_table_5"
              max-height="150">
            <el-table-column
                fixed
                prop="value"
                :label="otherIOC"
                width="250">
            </el-table-column>

          </el-table>
        </div>


      </div>

    </el-col>
    <el-col :span="12">
      <div id="graph" style="width:1000px;height:760px;margin-top:50px"></div>
      <div v-if="nodes.length>=50">
        <span>已达到图谱展示节点数量上限</span>
      </div>
    </el-col>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import * as echarts from 'echarts'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      aptNameSearch:null,
      middle_show_data:"",
      val:null,
      data:[{"name": "","chineseLabel":"正在全力获取数据", "label": "正在全力获取数据", "theme": "", "publisher": "", "release_time": "", "path": "", "associated": {}}], //展示的数据
      nodes:[{id:0,name:'test1'},{id:1,name:'test2'}],
      links:[{source:0,target:1,name:'testline'}],
      middle_block:false,
      categories:[
        {name:'报告'},
        {name:'组织'},
        {name:'背景'},
        {name:'失陷指标'},
        {name:'技术'},
      ],
      groupData: [],
      iocData:[],
      ipData:[],
      domainData:[],
      reportData: [],

      otherIOC : "其它IOC 数量：",
      ipName: "相关IP 数量： ",
      domainName:"相关域名 数量：",
      aptName:"相关组织 数量:",
      reportName:"相关报告 数量："

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted () {

    this.aptNameSearch = this.$route.query.aptname;
    //console.log(this.aptNameSearch)
    //this.aptNameSearch = '海莲花' //先写固定的
    let api = "/api/analyse/query_one/"
    const { data: ret } = await this.$http.get(api,{params:{params:this.aptNameSearch}})
    this.val = ret
    console.log(this.val)
    this.nodes = this.val.graph.nodes
    this.links = this.val.graph.links
    this.data = this.val.data

    this.reportData = []
    this.groupData = []
    this.iocData = []
    this.domainData = []
    this.ipData = []
    console.log(this.val.data)

    this.createTableData(this.val.data.associated.report,this.reportData)
    this.createTableData(this.val.data.associated.group,this.groupData)
    this.createTableData(this.val.data.associated.ip,this.ipData)
    this.createTableData(this.val.data.associated.domain,this.domainData)
    this.createTableData(this.val.data.associated.sha1,this.iocData)
    this.createTableData(this.val.data.associated.sha256,this.iocData)
    this.createTableData(this.val.data.associated.email,this.iocData)
    this.createTableData(this.val.data.associated.file,this.iocData)
    this.createTableData(this.val.data.associated.registry,this.iocData)
    this.createTableData(this.val.data.associated.hostpath,this.iocData)
    this.createTableData(this.val.data.associated.md5,this.iocData)
    this.createTableData(this.val.data.associated.vulnerability,this.iocData)


    this.otherIOC = "其它IOC 数量：" + this.iocData.length
    this.ipName= "相关IP 数量： " + this.ipData.length
    this.domainName="相关域名 数量："+ this.domainData.length
    this.aptName = "相关组织 数量: " + this.groupData.length
    this.reportName = "相关报告 数量： "+ this.reportData.length



    this.data.chineseLabel="组织"


    this.myChart = echarts.init(document.getElementById("graph"))
    let option = {
      legend: { // 图例
        x:'left',
        data: this.categories.map(function (a) {
          return a.name;
        })
      },
      tooltip: {
        show: true,
        formatter: (record) => {
          if(record.dataType==="node"){
            return "<div style='display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap;max-width: 120px'>" +record.data.name +" " + "</div>"
          }
        }
      },
      series: [{
        type: 'graph', // 声明绘制关系图
        layout: 'force', // 声明绘制关系图中的力导向图
        symbolSize: 40,
        draggable: true, // 节点是否可拖拽
        roam: true,  // 是否开启鼠标缩放和平移漫游
        focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
        //edgeSymbol: ['', 'arrow'],
        cursor: 'pointer',
        lineStyle: {
          color:"#34baed"
        },
        emphasis:{ //  鼠标悬浮高亮图形的样式
          itemStyle: {
            borderColor: 'black',
            borderWidth: 1,
            borderType: 'solid',
            symbolSize: 40,
          },
          label: {
            show: true,
            formatter: (record) => {
              if (record.name.length > 10) {
                return record.name.substr(0, 5) + '...'
              } else {
                return record.name
              }
            }
          }
        },
        edgeLabel: { // 设置连线label样式
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#000'
            },
            formatter(x) {
              return x.data.type;
            }
          }
        },
        label: { // 节点label设置
          show: true,
          position: 'bottom',
          color: '#000',
          formatter: (record) => {
            //console.log(record)

            if (record.name.length > 10) {
              return record.name.substr(0, 5) + '...'
            } else {
              return record.name
            }
          }
        },
        force: { // 力引导布局相关的配置项
          repulsion: 200, // 节点之间的斥力因子
          gravity: 0.02, // 节点受到的向中心的引力因子 越大越往中心靠拢
          edgeLength: 100, // 边的两个节点之间的距离
          layoutAnimation: true, // 显示布局的迭代动画
        },
        nodes: this.nodes,  // 节点数据列表
        links: this.links, // 关系数据列表
        categories: this.categories
      }]
    }
    this.myChart.setOption(option)

    let that = this
    that.myChart.on('click',async function(p){
      //console.log("打印变量")
      let param = {"clickdata":p.data,"nodes":that.nodes,"links":that.links}
      const { data: ret } = await that.$http.post('/api/analyse/explore_graph/',param)
      let val = ret

      that.nodes = val.nodes
      that.links = val.links

      let option = {
        series: [{
          nodes: that.nodes,  // 节点数据列表
          links: that.links, // 关系数据列表
        }]
      }
      that.myChart.setOption(option)
    })
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
    createTableData(fromArray,toArray){
      for(let i in fromArray){
        toArray.push({value:fromArray[i]});
      }
    },
  }
}
</script>

<style>


</style>
