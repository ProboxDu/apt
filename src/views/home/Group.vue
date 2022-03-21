<!-- 我的页面 -->
<template>
  <div class='group'>
      <el-row  justify="center">
          <el-col :span="5">
            <div style="margin-top:50px;margin-left:20px;height:600px">
            <router-link to="/information" tag="button" style="background-color:#6698cb;color:white;font-size:10px;border-radius:4px;padding:6px">返回组织列表页面</router-link>
              <div style="width:100px">
                <h2>APT组织</h2>
                <div style="margin-top:10px;font-size:20px">
                  {{this.data[0].name}}
                </div>
              </div>

              <div style="margin-top:30px;width:300px;margin-bottom:40px">
                <div v-if="this.data[0].alias!=null">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px">别名</span>
                  {{this.data[0].alias.join(",")}}
                </div>
                <div style="margin-top:10px"  v-if="this.data[0].from!=null">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px">所属地区</span>
                  {{this.data[0].from.join(",")}}
                </div>
                <div style="margin-top:10px" v-if="this.data[0].location!=null">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击地区</span>
                  {{this.data[0].location.join(",")}}
                </div>
                <div style="margin-top:10px" v-if="this.data[0].industry!=null">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击行业</span>
                  {{this.data[0].industry.join(",")}}
                </div>
                <div style="margin-top:10px;" v-if="this.data[0].predict!=null">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px;background-color:#409EFF;color:white;text-align:center;display:block;">预测</span>
                  {{this.data[0].predict}}
                </div>
              </div>

              <el-table
                  :data="data.slice(1)"
                  style="width: 100%"
                  key="group_table_1"
                  max-height="400">

                <el-table-column
                    label="类别"
                    prop="chineseLabel"
                    width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="关键词"
                    prop="name"
                    width="100"
                    align="center">
                </el-table-column>
                <el-table-column width="160" label="显示信息">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                          size="mini"
                          type="primary"
                          @click="showMiddle(scope.$index)">显示</el-button>
                      <el-button
                          size="mini"
                          @click="hideMiddle()">缩回</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="6" v-if="middle_block">

            <div style="margin-top:100px;height:600px">
              <div style="width:200px">
                <h3>相似的APT组织</h3>
                <div style="margin-top:10px;font-size:20px">
                  {{this.middle_show_data.name}}
                </div>
              </div>

              <div style="margin-top:30px;width:300px;margin-bottom:40px">
                <div v-if="this.middle_show_data.alias!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">别名</span>
                  {{this.middle_show_data.alias.join(",")}}
                </div>
                <div style="margin-top:10px"  v-if="this.middle_show_data.from!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">所属地区</span>
                  {{this.middle_show_data.from.join(",")}}
                </div>
                <div style="margin-top:10px" v-if="this.middle_show_data.location!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">攻击地区</span>
                  {{this.middle_show_data.location.join(",")}}
                </div>
                <div style="margin-top:10px" v-if="this.middle_show_data.industry!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">攻击行业</span>
                  {{this.middle_show_data.industry.join(",")}}
                </div>
                <div style="margin-top:10px" v-if="this.middle_show_data.sim_value!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">相似度</span>
                  {{this.middle_show_data.sim_value}}
                </div>
                <div style="margin-top:10px" v-if="this.middle_show_data.predict!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">预测</span>
                  {{this.middle_show_data.predict}}
                </div>
              </div>

            </div>
          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px;margin-top:50px"></div>
          </el-col>
        </el-row>
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
        aptName:null,
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

    this.aptName = this.$route.query.aptname;
    console.log(this.aptName)
    //this.aptName = 'APT29' //先写固定的
    let api = "/api/analyse/group_similar/"
    const { data: ret } = await this.$http.get(api,{params:{params:this.aptName}})
    this.val = ret
    this.nodes = this.val.graph.nodes
    this.links = this.val.graph.links
    this.data = this.val.data
    for(let i in this.data){
        if(this.data[i].label==="group"){
          this.data[i].chineseLabel="组织"
        }else if(this.data[i].label==="report"){
          this.data[i].chineseLabel="报告"
        }else if(this.data[i].label==="location"){
          this.data[i].chineseLabel = "地点"
        }else if(this.data[i].label==="industry"){
          this.data[i].chineseLabel = "行业"
        }else if(this.data[i].label==="target"){
          this.data[i].chineseLabel = "目标"
        }else if(this.data[i].label==="technique"){
          this.data[i].chineseLabel = "技术"
        }else if(this.data[i].label==="file"){
          this.data[i].chineseLabel = "文件"
        }else if(this.data[i].label === "registry"){
          this.data[i].chineseLabel = "注册表"
        }else if(this.data[i].label === "hostpath"){
          this.data[i].chineseLabel = "主机路径"
        }
        else{
          this.data[i].chineseLabel=this.data[i].label
        }
      }
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

        const { data: ret } = await that.$http.get('/api/analyse/explore_graph/',{params:p.data})
        let val = ret
        //console.log(val)
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
   showMiddle(index) {

      this.middle_show_data = this.data[index+1]
      this.middle_block = true

      this.nodes = this.middle_show_data.graph.nodes
      this.links = this.middle_show_data.graph.links

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
            color: 'source',
            //   curveness: 0.3

          },
          emphasis: { //  鼠标悬浮高亮图形的样式
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

      setTimeout(this.myChart.setOption(option), 500);

    },
    hideMiddle(){
      this.middle_block = false
      this.nodes = this.val.graph.nodes
      this.links = this.val.graph.links

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
            color: 'source',
            //   curveness: 0.3

          },
          emphasis: { //  鼠标悬浮高亮图形的样式
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
      console.log(option)
      setTimeout(this.myChart.setOption(option), 500);
    },
  }
}
</script>

<style>


</style>
