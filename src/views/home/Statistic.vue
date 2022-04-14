<!-- 我的页面 -->
<template>
  <div class='statistic'>
    <el-row type="flex" justify="center">
      <el-col :span="12">

        <h1 style="margin-top:20px;margin-bottom:20px">威胁情报报告信息总览</h1>

        <el-tabs v-model="activeName">
          <el-tab-pane label="报告发布时间" name="first" :key="'first'">
            <div id="report_year_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>

          <el-tab-pane label="报告来源厂商" name="second" :key="'second'">
            <div id="report_org_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>
          <el-tab-pane label="报告获取方式" name="third" :key="'third'">
            <div id="report_sources_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>
          <el-tab-pane label="报告格式" name="fourth" :key="'fourth'">
            <div id="report_format_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>
          <el-tab-pane label="报告语言" name="fifth" :key="'fifth'">
            <div id="report_lang_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>
          <el-tab-pane label="报告审核入库情况" name="sixth" :key="'sixth'">
            <div id="report_check_graph" style="width:800px;height:600px;margin-top:50px"></div>
          </el-tab-pane>


        </el-tabs>
      </el-col>
      <el-col :span="10">
        <h1 style="margin-top:20px;margin-bottom:20px">知识图谱信息总览</h1>
        <div id="graph_info_graph" style="width:800px;height:600px;margin-top:120px"></div>



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
      return_data : {
        "report_year": {"total": 20, "graph_x":["2017", "2018", "2019"],  "graph_y":[5, 7, 8]},
        "report_org": {"total": 20, "graph_x":["360", "微步在线", "绿盟"],  "graph_y":[2, 10, 8]},
        "report_sources": {"total": 20, "graph_x":["自动爬取", "用户上传"],  "graph_y":[5, 15]},
        "report_format": {"total": 20, "graph_x":["pdf", "txt"],  "graph_y":[5, 15]},
        "report_lang": {"total": 20, "graph_x":["中文", "英文"],  "graph_y":[15, 5]},
        "report_check": {"total": 20, "graph_x":["checked", "unchecked"],  "graph_y":[10, 10]},
        "graph_info": {"total": 100, "graph_x":["attacker","malware","technique"], "graph_y":[50,20,30]}
      },
      report_year_chart:null,
      report_org_chart:null,
      report_sources_chart:null,
      report_format_chart:null,
      report_lang_chart:null,
      report_check_chart:null,
      graph_info_chart:null,
      activeName:"first",
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
  mounted () {
    this.report_year_chart = echarts.init(document.getElementById("report_year_graph"))
    let option = {
      title:{
        text:'APT报告总数：'+this.return_data.report_year.total
      },
      xAxis: {
        type: 'category',
        data: this.return_data.report_year.graph_x
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.return_data.report_year.graph_y,
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },

      }]
    };
    this.report_year_chart.setOption(option);

    let graph_info_data = [];
    let len = this.return_data.graph_info.graph_x.length;
    for(let i=0;i<len;i++){
      graph_info_data.push({'name':this.return_data.graph_info.graph_x[i],'value':this.return_data.graph_info.graph_y[i]})
    }
    this.graph_info_chart = echarts.init(document.getElementById("graph_info_graph"))
    let option2 = {
      title:{
        text:'节点总数：'+this.return_data.graph_info.total
      },
      tooltip:{

        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:graph_info_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.graph_info_chart.setOption(option2)

    let report_org_data = [];
    len = this.return_data.report_org.graph_x.length;
    for(let i=0;i<len;i++){
      report_org_data.push({'name':this.return_data.report_org.graph_x[i],'value':this.return_data.report_org.graph_y[i]})
    }
    this.report_org_chart = echarts.init(document.getElementById("report_org_graph"))
    let option3 = {
      title:{
        text:'APT报告总数：'+this.return_data.report_org.total
      },
      tooltip:{

        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:report_org_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.report_org_chart.setOption(option3)

    let report_sources_data = [];
    len = this.return_data.report_sources.graph_x.length;
    for(let i=0;i<len;i++){
      report_sources_data.push({'name':this.return_data.report_sources.graph_x[i],'value':this.return_data.report_sources.graph_y[i]})
    }
    this.report_sources_chart = echarts.init(document.getElementById("report_sources_graph"))
    let option4 = {
      title:{
        text:'APT报告总数：'+this.return_data.report_sources.total
      },
      tooltip:{

        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:report_sources_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.report_sources_chart.setOption(option4)

    let report_format_data = [];
    len = this.return_data.report_format.graph_x.length;
    for(let i=0;i<len;i++){
      report_format_data.push({'name':this.return_data.report_format.graph_x[i],'value':this.return_data.report_format.graph_y[i]})
    }
    this.report_format_chart = echarts.init(document.getElementById("report_format_graph"))
    let option5 = {
      title:{
        text:'APT报告总数：'+this.return_data.report_format.total
      },
      tooltip:{
        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:report_format_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.report_format_chart.setOption(option5)

    let report_lang_data = [];
    len = this.return_data.report_lang.graph_x.length;
    for(let i=0;i<len;i++){
      report_lang_data.push({'name':this.return_data.report_lang.graph_x[i],'value':this.return_data.report_lang.graph_y[i]})
    }
    this.report_lang_chart = echarts.init(document.getElementById("report_lang_graph"))
    let option6 = {
      title:{
        text:'APT报告总数：'+this.return_data.report_lang.total
      },
      tooltip:{
        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:report_lang_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.report_lang_chart.setOption(option6)

    let report_check_data = [];
    len = this.return_data.report_check.graph_x.length;
    for(let i=0;i<len;i++){
      report_check_data.push({'name':this.return_data.report_check.graph_x[i],'value':this.return_data.report_check.graph_y[i]})
    }
    this.report_check_chart = echarts.init(document.getElementById("report_check_graph"))
    let option7 = {
      title:{
        text:'APT报告总数：'+this.return_data.report_check.total
      },
      tooltip:{
        formatter:function(val){
          return val.name +": "+ val.value
        }
      },
      series:[
        {
          type:'pie',
          radius:'55%',
          data:report_check_data,
          itemStyle:{
            normal:{
              label:{
                textStyle:{fontSize:"18"}
              }
            }

          }
        }
      ]

    }
    this.report_check_chart.setOption(option7)


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

  }
}
</script>

<style>


</style>
