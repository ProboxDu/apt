<!-- 我的页面 -->
<template>
  <div class='analysis'>

    <div class="flex search_box" v-bind:class="{middle: !has_search }">
      <el-row type="flex" justify="center">
        <el-col :span="26">
          <el-input placeholder="输入报告名称或APT组织名称" v-model="search_value" style="width:800px">
            <el-select v-model="select" slot="prepend" placeholder="---请选择---" style="width:120px">
              <el-option label="报告" value="report"></el-option>
              <el-option label="组织" value="group"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="search_button" v-on:click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <div v-if="has_search" class="content">
      <el-row  justify="center" v-if="show_type=='report'" >
        <el-col :span="8">
          <div style="margin-top:100px;margin-left:10px;height:600px">
            <div>
              <h2>安全报告</h2>
              <div style="margin-top:10px;font-size:20px">
                {{this.data[0].name}}
              </div>
            </div>

            <div style="margin-top:30px">
              <div>
                <span style="font-weight:bold;font-size:20px;padding-right:10px">主题</span>
                {{this.data[0].theme}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px">发布者</span>
                {{this.data[0].publisher}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px">发布时间</span>
                {{this.data[0].release_time}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px"><a href="/pdf/1.pdf">原文链接</a></span>
                {{this.data[0].path}}
              </div>
            </div>
            <div  style="margin-top:30px">
              <div>
                <span style="font-weight:bold;font-size:20px;">相关报告</span>
              </div>
              <el-table
                  :data="reportData"
                  style="width: 100%"
                  max-height="300">
                <el-table-column
                    fixed
                    prop="value"
                    :label="reportName"
                    width="400">
                </el-table-column>

              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div id="graph" style="width:1250px;height:760px"></div>
        </el-col>
      </el-row>

      <el-row  justify="center" v-else-if="show_type=='group'">
        <el-col :span="8">
          <div style="margin-top:100px;margin-left:10px;height:600px">
            <div>
              <h2>APT组织</h2>
              <div style="margin-top:10px;font-size:20px">
                {{this.data[0].name}}
              </div>
            </div>

            <div style="margin-top:30px">
              <div>
                <span style="font-weight:bold;font-size:20px;padding-right:10px">别名</span>
                {{this.data[0].alias.join(",")}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px">所属地区</span>
                {{this.data[0].from.join(",")}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击地区</span>
                {{this.data[0].location.join(",")}}
              </div>
              <div style="margin-top:10px">
                <span style="font-weight:bold;font-size:20px;padding-right:10px">攻击行业</span>
                {{this.data[0].industry.join(",")}}
              </div>
            </div>

            <div  style="margin-top:50px">
              <div>
                <span style="font-weight:bold;font-size:20px;">相关APT组织</span>
              </div>
              <el-table
                  :data="groupData"
                  style="width: 100%"
                  max-height="200">
                <el-table-column
                    fixed
                    prop="value"
                    :label="groupName"
                    width="400">
                </el-table-column>

              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div id="graph" style="width:1250px;height:760px"></div>
        </el-col>
      </el-row>

      <el-row justify="center"  v-else>
        <el-col :span="8">
          <div style="margin-top:100px;margin-left:10px;height:600px">
            <div>
              <h2>{{this.data[0].chineseLabel}}</h2>
              <div style="margin-top:10px;font-size:20px">
                {{this.data[0].name}}
              </div>
            </div>
            <div  style="margin-top:50px;margin-left:100px">
              <div>
                <span style="font-weight:bold;font-size:20px;">相关APT组织</span>
              </div>
              <el-table
                  :data="groupData"
                  style="width: 100%"
                  max-height="200">
                <el-table-column
                    fixed
                    prop="value"
                    :label="groupName"
                    width="500">
                </el-table-column>

              </el-table>
            </div>

            <div  style="margin-top:50px;margin-left:100px">
              <div>
                <span style="font-weight:bold;font-size:20px;">相关报告</span>
              </div>
              <el-table
                  :data="reportData"
                  style="width: 100%"
                  max-height="300">
                <el-table-column
                    fixed
                    prop="value"
                    :label="reportName"
                    width="500">
                </el-table-column>

              </el-table>
            </div>

          </div>

        </el-col>

        <el-col :span="10">
          <div id="graph" style="width:0px;height:0px"></div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
// import Graph from '@/components/Graph.vue'
// 引入echarts
import * as echarts from 'echarts'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
  },
  data () {
    // 这里存放数据
    return {
      select:"group",
      has_search:false,
      search_value:"",
      show_type:"report",//展示的类型 ioc group report multiple
      activeName: 'first',
      myChart:null,
      data:[{"name": "APT29测试报告", "label": "report", "theme": "关于攻击组织APT29的描述", "publisher": "绿盟", "release_time": "2021-12-30", "path": "/opt/data/pdf/ lvmeng+20211230145001.pdf", "associated": {"report": [], "group": ["APT29"], "location": ["Russia", "China", "USA"], "industry": ["government"], "target": ["White House"], "technique": ["Spear phishing"], "ip": ["169.239.128.110", "178.211.39.6", "31.170.107.186", "146.0.76.37", "122.114.197.185", "192.48.88.107", "119.81.173.130"], "domain": ["cityloss.com", "theadminforum.com", "techiefly.com", "trendignews.com"], "md5": ["dc146f77caaaea3deae053d9dc5a82d2", "71fcbce4a9071e779dd9212cdffedc0a", "a9485f3ecf7f35ba16a680a03d17c9ee"], "sha1": [], "sha256": [], "url": [], "email": [], "file": [], "registry": [], "hostpath": []}}], //展示的数据
      nodes:[{id:0,name:'test1'},{id:1,name:'test2'}],
      links:[{source:0,target:1,name:'testline'}],
      categories:[
        {name:'report'},
        {name:'group'},
        {name:'background'},
        {name:'IOC'},
        {name:'technique'},
      ],
      groupData: [],
      reportData: [],
      reportName : "相关报告 数量：",
      groupName : "相关组织 数量: "
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

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
    createTableData(fromArray,toArray){
      for(let i in fromArray){
        toArray.push({value:fromArray[i]});
      }
    },
    initData(){
      const tempdata = {"name": "","chineseLabel":"没有找到搜索内容", "label": "没有找到搜索内容", "theme": "", "publisher": "", "release_time": "", "path": "", "associated": {}}
      this.data = [tempdata]
      this.iocData = []
      this.reportData = []
      this.groupData = []
    },
    async search(){
      this.has_search=true;
      const { data: ret } = await this.$http.get('/api/analyse/query/',{params:{params:this.search_value,kind:this.select}})
      let val = ret

      this.nodes = val.graph.nodes
      this.links = val.graph.links
      this.data = val.data

      if(val.data.length==0){
        this.initData()
      }
      console.log("啦啦啦")
      console.log(val)
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
      // 判断展示类型
      console.log(val.data)
      if(val.data[0].label==="group"||val.data[0].label==="report"){
        this.show_type = val.data[0].label;
      }else{
        this.show_type = "ioc";
      }

      this.groupData = []
      this.reportData = []
      if(val.data.length>0){
        this.createTableData(val.data[0].associated.group,this.groupData)
        this.createTableData(val.data[0].associated.report,this.reportData)
      }

      this.reportName = "相关报告 数量："+ this.reportData.length
      this.groupName = "相关组织 数量: " + this.groupData.length

      //准备得到我们的图了
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
        this.myChart = echarts.init(document.getElementById("graph"))
        //this.myChart = echarts.init(document.getElementById("graph"))
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
            //formatter: "<div style='display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap;max-width: 120px'>" + "{b} " + "</div>"
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
                  if(x.data.predict===2){
                    return "相似度"+x.data.similar;
                  }else if(x.data.predict===1){
                    return "预测"
                  }
                  return "";
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
              repulsion: 80, // 节点之间的斥力因子
              gravity: 0.02, // 节点受到的向中心的引力因子 越大越往中心靠拢
              edgeLength: 240, // 边的两个节点之间的距离
              layoutAnimation: true, // 显示布局的迭代动画
            },
            nodes: this.nodes,  // 节点数据列表
            links: this.links, // 关系数据列表
            categories: this.categories
          }]
        }
        this.myChart.setOption(option)
      })

    },
  }
}
</script>

<style>
.search_box{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
.search_button{
  width:100px;
  margin-left: 2px;
}
.middle{
  margin-top: 300px;
}
.analysis{
  width:100%;
  height: 100%;
}
.tab_content{
  background-color: white;
  width:100%;
  height: 100%;
}
.content{
  width:90%;
  height:90%;
  margin: 0 auto;
}
.leftpart{
  border-left-style:dashed;
  border-left-width: 1px;
  border-left-color: rgb(4, 4, 8);
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 40px;
  width: 100%;
}
</style>
