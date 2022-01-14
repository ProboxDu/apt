<!-- 我的页面 -->
<template>
  <div class='query' v-bind:class="{background: !has_search }">
    <!-- <div class="flex search_box" v-bind:class="{middle: !has_search }">
      <el-input placeholder="输入报告名称、APT组织名称、域名、IP、文件Hash、URL、邮箱等，逗号隔开" v-model="search_value"></el-input>
      <el-button type="primary" class="search_button" v-on:click="search">搜索</el-button>
    </div> -->
    <el-row type="flex" justify="center" class="search_box" v-bind:class="{middle: !has_search }">
      <el-col :span="16">
        <el-input class="input" placeholder="输入报告名称、APT组织名称、域名、IP、文件Hash、URL、邮箱等，逗号隔开" v-model="search_value"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" class="search_button" v-on:click="search">搜索</el-button>
      </el-col>
    </el-row>
    <div v-if="has_search" class="content">
      <div class="tab_content flex">

        <el-row  justify="center" v-if="show_type=='multiple'">
          <el-col :span="5">
            <div style="margin-top:100px;margin-left:30px;height:600px">
              <el-table
                  :data="data"
                  style="width: 100%"
                  max-height="600">
                <el-table-column type="expand">

                  <template slot-scope="props" v-if="props.row.label==='report'||props.row.label==='group'">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="主题" v-if="props.row.label==='report'">
                        <span>{{ props.row.theme }}</span>
                      </el-form-item>
                      <el-form-item label="发布者" v-if="props.row.label==='report'">
                        <span>{{ props.row.publisher }}</span>
                      </el-form-item>
                      <el-form-item label="发布时间" v-if="props.row.label==='report'">
                        <span>{{ props.row.release_time }}</span>
                      </el-form-item>
                      <el-form-item label="别名" v-if="props.row.label==='group'">
                        <span>{{ props.row.alias.join(",") }}</span>
                      </el-form-item>
                      <el-form-item label="所属地区" v-if="props.row.label==='group'">
                        <span>{{ props.row.from.join(",") }}</span>
                      </el-form-item>
                      <el-form-item label="攻击地区" v-if="props.row.label==='group'">
                        <span>{{ props.row.location.join(",") }}</span>
                      </el-form-item>
                      <el-form-item label="攻击行业" v-if="props.row.label==='group'">
                        <span>{{ props.row.industry.join(",") }}</span>
                      </el-form-item>
                    </el-form>
                  </template>

                </el-table-column>
                <el-table-column
                    label="类别"
                    prop="chineseLabel"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="关键词"
                    prop="name"
                    width="100">
                </el-table-column>
                <el-table-column width="100" label="显示信息">

                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index)">显示</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </el-col>
          <el-col :span="8">
            <div style="margin-right:40px">
              <div  style="margin-top:40px;margin-left:40px">
                <el-table
                    :data="groupData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="aptName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="ipData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="ipName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="domainData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="domainName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="iocData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="otherIOC"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>


            </div>

          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px"></div>
          </el-col>
        </el-row>

        <el-row  justify="center" v-else-if="show_type=='report'">
          <el-col :span="5">
            <div style="margin-top:100px;margin-left:70px;height:600px">
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

            </div>
          </el-col>
          <el-col :span="8">
            <div style="margin-left:50px;margin-right:50px">
              <div  style="margin-top:50px;margin-left:80px">

                <el-table
                    :data="groupData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="aptName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>
              <div  style="margin-top:30px;margin-left:80px">
                <el-table
                    :data="ipData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="ipName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:80px">
                <el-table
                    :data="domainData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="domainName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:80px">
                <el-table
                    :data="iocData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="otherIOC"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px"></div>
          </el-col>
        </el-row>

        <el-row  justify="center" v-else-if="show_type=='group'">
          <el-col :span="5">
            <div style="margin-top:100px;margin-left:50px;height:600px">
              <div style="width:100px">
                <h2>APT组织</h2>
                <div style="margin-top:10px;font-size:20px">
                  {{this.data[0].name}}
                </div>
              </div>

              <div style="margin-top:30px;width:200px">
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

            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div  style="margin-top:60px;margin-left:40px">
                <el-table
                    :data="reportData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="reportName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>
              <div  style="margin-top:20px;margin-left:40px">
                <el-table
                    :data="ipData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="ipName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="domainData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="domainName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="iocData"
                    style="width: 100%"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="otherIOC"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>

            </div>
          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px"></div>
          </el-col>
        </el-row>

        <el-row justify="center" v-else>
          <el-col :span="5">
            <div style="margin-top:100px;height:600px;width:200px;margin-left:50px">
              <div>
                <h2>{{this.data[0].chineseLabel}}</h2>
                <div style="margin-top:10px;font-size:20px">
                  {{this.data[0].name}}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div  style="margin-top:50px">

                <el-table
                    :data="groupData"
                    style="width: 100%"
                    max-height="200">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="aptName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>
              <div  style="margin-top:30px">
                <el-table
                    :data="reportData"
                    style="width: 100%"
                    max-height="300">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="reportName"
                      width="300">
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px"></div>
          </el-col>
        </el-row>

      </div>
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
      has_search:false,
      search_value:"",
      show_type:"ioc",//展示的类型 ioc group report multiple
      myChart:null,
      data:[{"name": "","chineseLabel":"没有搜索到内容", "label": "没有搜索到内容", "theme": "", "publisher": "", "release_time": "", "path": "", "associated": {}}], //展示的数据
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
      this.ipData = [],
          this.domainData = []
    },
    handleEdit(index) {
      this.groupData = []
      this.iocData = []
      this.ipData = []
      this.domainData = []
      this.createTableData(this.data[index].associated.group,this.groupData)
      this.createTableData(this.data[index].associated.ip,this.ipData)
      this.createTableData(this.data[index].associated.domain,this.domainData)
      this.createTableData(this.data[index].associated.sha1,this.iocData)
      this.createTableData(this.data[index].associated.sha256,this.iocData)
      this.createTableData(this.data[index].associated.email,this.iocData)
      this.createTableData(this.data[index].associated.file,this.iocData)
      this.createTableData(this.data[index].associated.registry,this.iocData)
      this.createTableData(this.data[index].associated.hostpath,this.iocData)
      this.otherIOC = "其它IOC 数量：" + this.iocData.length
      this.ipName= "相关IP 数量： " + this.ipData.length
      this.domainName="相关域名 数量："+ this.domainData.length
      this.aptName = "相关组织 数量: " + this.groupData.length
    },
    async search(){
      //this.initData()
      this.has_search=true;
      const { data: ret } = await this.$http.get('/api/search/query/',{params:{params:this.search_value}})
      console.log(this.search_value)
      let val = ret

      this.nodes = val.graph.nodes
      this.links = val.graph.links
      this.data = val.data

      console.log(val)
      console.log(this.data)

      if(this.data.length==0){
        this.initData()
      }


      for(let i in this.data){
        console.log(this.data[i])
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
      if(val.data.length===1){
        if(val.data[0].label==="group"||val.data[0].label==="report"){
          this.show_type = val.data[0].label;
        }else{
          this.show_type = "ioc";
        }
        this.groupData = []
        this.createTableData(val.data[0].associated.group,this.groupData)
        this.iocData = []
        this.createTableData(val.data[0].associated.ip,this.ipData)
        this.createTableData(val.data[0].associated.domain,this.domainData)
        this.createTableData(val.data[0].associated.sha1,this.iocData)
        this.createTableData(val.data[0].associated.sha256,this.iocData)
        this.createTableData(val.data[0].associated.email,this.iocData)
        this.createTableData(val.data[0].associated.file,this.iocData)
        this.createTableData(val.data[0].associated.registry,this.iocData)
        this.createTableData(val.data[0].associated.hostpath,this.iocData)
        this.reportData = []
        this.createTableData(val.data[0].associated.report,this.reportData)

      }else if(val.data.length>1){
        this.show_type = "multiple";
        this.groupData = []
        this.iocData = []
        for(let i in this.data){
          this.createTableData(val.data[i].associated.group,this.groupData)
          this.createTableData(val.data[i].associated.ip,this.ipData)
          this.createTableData(val.data[i].associated.domain,this.domainData)
          this.createTableData(val.data[i].associated.sha1,this.iocData)
          this.createTableData(val.data[i].associated.sha256,this.iocData)
          this.createTableData(val.data[i].associated.email,this.iocData)
          this.createTableData(val.data[i].associated.file,this.iocData)
          this.createTableData(val.data[i].associated.registry,this.iocData)
          this.createTableData(val.data[i].associated.hostpath,this.iocData)
        }
      }else{//说明没有返回结果,还是按照ioc的格式返回
        this.show_type = "ioc"
        this.groupData = []
        this.iocData = []
        this.reportData = []
        this.ipData = []
        this.domainData = []
      }
      this.otherIOC = "其它IOC 数量：" + this.iocData.length
      this.ipName= "相关IP 数量： " + this.ipData.length
      this.domainName="相关域名 数量："+ this.domainData.length
      this.aptName = "相关组织 数量: " + this.groupData.length
      this.reportName = "相关报告 数量： "+ this.reportData.length

      let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(() => {
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

              color:function (params){
                console.log("lalalla",params)
                return "#34baed"
              }

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
              // normal: {
              //     show: true,
              //     textStyle: {
              //     fontSize: 12,
              //     color: '#000'
              //     },
              //     formatter(x) {
              //     return x.data.name;
              //     }
              // }
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
  transform: scale(1.3);
}
.search_button{
  width:100px;
  margin-left: 2px;
}
.middle{
  margin-top: 300px;

}
.query{
  /* background-color: rgb(183, 206, 231); */
  width:100%;
  height: 100%;
}
.background{
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


.el-table th.el-table__cell>.cell {
  font-size: 15px;
  color: black;
}
</style>
