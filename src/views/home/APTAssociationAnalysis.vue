<!-- 我的页面 -->
<template>
  <div class='query' v-bind:class="{background: !has_search }">
    <!-- <div class="flex search_box" v-bind:class="{middle: !has_search }">
      <el-input placeholder="输入报告名称、APT组织名称、域名、IP、文件Hash、URL、邮箱等，逗号隔开" v-model="search_value"></el-input>
      <el-button type="primary" class="search_button" v-on:click="search">搜索</el-button>
    </div> -->
    <el-row type="flex" justify="center" class="search_box" v-bind:class="{middle: !has_search }">
      <el-col :span="18">
        <el-input class="input" :placeholder="placeholder" v-model="search_value">
          <el-select v-model="select" slot="prepend" placeholder="---请选择---" style="width:180px">
            <el-option label="关键字查询" value="query"></el-option>
            <el-option label="单个报告关联分析" value="report"></el-option>
            <el-option label="单个组织关联分析" value="group"></el-option>
          </el-select>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" class="search_button" v-on:click="search">搜索</el-button>
      </el-col>
    </el-row>
    <div v-if="has_search" class="content">
      <div class="tab_content flex">

        <el-row  justify="center" v-if="show_page=='query'">
          <el-col :span="6">
            <div style="margin-top:45px;margin-left:30px;height:600px">
              <el-table
                  :data="data"
                  key="query_table_1"
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
          <el-col :span="5">
            <div style="margin-right:40px">

              <div  style="margin-top:40px;margin-left:40px" v-if="kind==='report'">
                <el-table
                    :data="reportData"
                    style="width: 100%"
                    key="query_table_2"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="reportName"
                      width="200">
                  </el-table-column>

                </el-table>
              </div>
              <div  style="margin-top:40px;margin-left:40px" v-else>
                <el-table
                    :data="groupData"
                    style="width: 100%"
                    key="query_table_2"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="aptName"
                      width="200">
                  </el-table-column>

                </el-table>
              </div>


              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="ipData"
                    style="width: 100%"
                    key="query_table_3"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="ipName"
                      width="200">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="domainData"
                    style="width: 100%"
                    key="query_table_4"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="domainName"
                      width="200">
                  </el-table-column>

                </el-table>
              </div>

              <div  style="margin-top:30px;margin-left:40px">
                <el-table
                    :data="iocData"
                    style="width: 100%"
                    key="query_table_5"
                    max-height="150">
                  <el-table-column
                      fixed
                      prop="value"
                      :label="otherIOC"
                      width="200">
                  </el-table-column>

                </el-table>
              </div>


            </div>

          </el-col>
          <el-col :span="12">
            <div id="graph" style="width:1000px;height:760px;margin-top:50px"></div>
          </el-col>
        </el-row>

        <el-row  justify="center" v-else-if="show_page=='report'">
          <el-col :span="7">
            <div style="margin-top:50px;margin-left:70px;height:600px">
              <div>
                <h2>安全报告</h2>
                <div style="margin-top:10px;font-size:20px">
                  {{this.data[0].name}}
                </div>
              </div>

              <div style="margin-top:30px;margin-bottom:40px">
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
                  <span style="font-weight:bold;font-size:20px;padding-right:10px"><a href="/pdf/1.pdf" target="_blank">原文链接</a></span>
                  <!-- {{this.data[0].path}} -->
                </div>
              </div>

              <div style="width:350px">
                <el-table
                    :data="data.slice(1)"
                    style="width:100%"
                    key="report_table_1"
                    max-height="400">

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

            </div>



          </el-col>
          <el-col :span="6" v-if="middle_block">
            <div style="margin-top:100px;height:600px">
              <div style="width:200px">
                <h3>相似的报告</h3>
                <div style="margin-top:10px;font-size:20px">
                  {{this.middle_show_data.name}}
                </div>
              </div>

              <div style="margin-top:30px;width:300px;margin-bottom:40px">
                <div v-if="this.middle_show_data.theme!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">主题</span>
                  {{this.middle_show_data.theme}}
                </div>
                <div style="margin-top:10px"  v-if="this.middle_show_data.publisher!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">发布者</span>
                  {{this.middle_show_data.publisher}}
                </div>
                <div style="margin-top:10px" v-if="this.middle_show_data.release_time!=null">
                  <span style="font-weight:bold;font-size:15px;padding-right:10px">发布时间</span>
                  {{this.middle_show_data.release_time}}
                </div>
                <div style="margin-top:10px">
                  <span style="font-weight:bold;font-size:20px;padding-right:10px"><a href="/pdf/1.pdf" target="_blank">原文链接</a></span>
                  <!-- {{this.data[0].path}} -->
                </div>
              </div>

            </div>
          </el-col>
          <el-col :span="10">
            <div id="graph" style="width:1000px;height:760px;margin-top:50px"></div>
          </el-col>
        </el-row>

        <el-row  justify="center" v-else-if="show_page=='group'">
          <el-col :span="7">
            <div style="margin-top:100px;margin-left:10px;height:600px">
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
                    width="80">
                </el-table-column>
                <el-table-column
                    label="关键词"
                    prop="name"
                    width="100">
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

        <el-row justify="center" v-else>
          <el-col :span="7">
            <h1 style="margin-top:50px">没有找到搜索内容</h1>
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="10">
            <div style="margin-top:50px" id="graph"></div>
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
      placeholder:'输入报告名称、APT组织名称、域名、IP、文件Hash、URL、邮箱等，逗号隔开',
      has_search:false,
      middle_block:false,
      select:"query",
      show_page:"query",
      middle_show_data:"",
      search_value:"",
      show_type:"ioc",//展示的类型 ioc group report multiple
      myChart:null,
      val:null,
      data:[{"name": "","chineseLabel":"正在全力获取数据", "label": "正在全力获取数据", "theme": "", "publisher": "", "release_time": "", "path": "", "associated": {}}], //展示的数据
      nodes:[{id:0,name:'test1'},{id:1,name:'test2'}],
      links:[{source:0,target:1,name:'testline'}],
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
      kind:"report",
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
    select: function(newV) {
      //console.log('counter change to %d from %d', newV, oldV);
      if (newV === "query"){
        this.placeholder = '输入报告名称、APT组织名称、域名、IP、文件Hash、URL、邮箱等，逗号隔开'
      }else if (newV === 'group'){
        this.placeholder = '输入单个组织名称'
      }else {
        this.placeholder = '输入单个报告名称'
      }
    },
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
      const tempdata = {"name": "","chineseLabel":"没有搜索到内容", "label": "没有搜索到内容", "theme": "", "publisher": "","alias":[],"from":[],"location":[],"industry":[], "release_time": "", "path": "", "associated": {}}
      this.data = [tempdata]
      this.iocData = []
      this.reportData = []
      this.groupData = []
      this.ipData = [],
          this.domainData = []
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
    handleEdit(index) {
      this.groupData = []
      this.iocData = []
      this.ipData = []
      this.domainData = []
      this.reportData = []
      console.log(this.data[index].associated)
      this.createTableData(this.data[index].associated.report,this.reportData)
      this.createTableData(this.data[index].associated.group,this.groupData)
      this.createTableData(this.data[index].associated.ip,this.ipData)
      this.createTableData(this.data[index].associated.domain,this.domainData)
      this.createTableData(this.data[index].associated.sha1,this.iocData)
      this.createTableData(this.data[index].associated.sha256,this.iocData)
      this.createTableData(this.data[index].associated.email,this.iocData)
      this.createTableData(this.data[index].associated.file,this.iocData)
      this.createTableData(this.data[index].associated.registry,this.iocData)
      this.createTableData(this.data[index].associated.hostpath,this.iocData)
      this.reportName = "相关报告 数量：" + this.reportData.length
      this.otherIOC = "其它IOC 数量：" + this.iocData.length
      this.ipName= "相关IP 数量： " + this.ipData.length
      this.domainName="相关域名 数量："+ this.domainData.length
      this.aptName = "相关组织 数量: " + this.groupData.length
      // 把图改成单个的图
      if(this.data[index].label==='report'){
        this.kind = "group"
      }else{
        this.kind = "report"
      }

      this.nodes = this.data[index].graph.nodes
      this.links = this.data[index].graph.links

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
    async search(){

      this.has_search=true;

      let api = ""
      if(this.select==="query"){
        api = "/api/analyse/query/"
      }else if(this.select==="report"){
        api = "/api/analyse/report_similar/"
      }else{
        api = "/api/analyse/group_similar/"
      }

      this.show_page = this.select

      const { data: ret } = await this.$http.get(api,{params:{params:this.search_value}})

      this.val = ret

      this.nodes = this.val.graph.nodes
      this.links = this.val.graph.links
      this.data = this.val.data
      console.log(this.val.graph)
      if(this.data.length==0){
        this.select = "none"
        this.show_page = "none"
      }else{
        if(this.data[0].label==="report"){
          this.kind = "group"
        }else{
          this.kind = "report"
        }
      }


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
      this.reportData = []
      this.groupData = []
      this.iocData = []
      if(this.select == "query"){
        for(let i in this.data){
          this.createTableData(this.val.data[i].associated.report,this.reportData)
          this.createTableData(this.val.data[i].associated.group,this.groupData)
          this.createTableData(this.val.data[i].associated.ip,this.ipData)
          this.createTableData(this.val.data[i].associated.domain,this.domainData)
          this.createTableData(this.val.data[i].associated.sha1,this.iocData)
          this.createTableData(this.val.data[i].associated.sha256,this.iocData)
          this.createTableData(this.val.data[i].associated.email,this.iocData)
          this.createTableData(this.val.data[i].associated.file,this.iocData)
          this.createTableData(this.val.data[i].associated.registry,this.iocData)
          this.createTableData(this.val.data[i].associated.hostpath,this.iocData)
        }
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

          const { data: ret } = await that.$http.get('/api/analyse/explore_graph',{params:p.data})
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
  text-align: center;
}
</style>
