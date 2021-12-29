<template>
  <div id="graph" style="width:100%;height:100%">
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入echarts
import * as echarts from 'echarts'

export default {
  name: "Graph",
  data () {
    return {
      myChart:null,
      nodes:this.$store.state.nodes,
      links:this.$store.state.links,
      categories:[
        {name:'Threat Actor'},
        {name:'Attack Pattern'},
        {name:'Courses of Action'},
        {name:'Vulnerability'},
        {name:'Identity'},
        {name:'Indicator'},
        {name:'Observed Data'},
        {name:'Campaign'},
        {name:'Malware'},
        {name:'Tool'},
        {name:'Infrastructure'},
        {name:'Instrusion Set'},
        {name:'Location'},
      ]
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    console.log(this.$store)

  },
  computed: {
    ...mapState(['change'])
  },
  watch:{
    change(){
      if(this.change===1){
        console.log("watch change==1")
        console.log(this.nodes)
        console.log(this.$store.state.nodes)
        this.nodes = this.$store.state.nodes
        this.links = this.$store.state.links
        let option = {

          series: [{
            nodes: this.nodes,  // 节点数据列表
            links: this.links, // 关系数据列表
          }]
        }

        this.myChart.setOption(option)
        this.$store.commit('reset')
      }else{
        console.log("watch change==0")
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
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
        formatter: "<div style='display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap;max-width: 80px'>" + "{b} " + "</div>"
      },
      series: [{
        type: 'graph', // 声明绘制关系图
        layout: 'force', // 声明绘制关系图中的力导向图
        symbolSize: 40,
        draggable: true, // 节点是否可拖拽
        roam: true,  // 是否开启鼠标缩放和平移漫游
        focusNodeAdjacency: true, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
        edgeSymbol: ['', 'arrow'],
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
              return x.data.name;
            }
          }
        },
        label: { // 节点label设置
          show: true,
          position: 'bottom',
          color: '#000',
          formatter: (record) => {
            console.log(record)

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
  },
  // 方法集合
  methods: {
    update(){
      console.log(this.nodes)
      console.log(this.links)
    }
  }
}
</script>

<style scoped>

</style>
