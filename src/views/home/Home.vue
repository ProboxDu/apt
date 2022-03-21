<template>
  <div id="home">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ReportSearch from "@/views/home/ReportSearch";
import APTAssociationAnalysis from "@/views/home/APTAssociationAnalysis";
import Information from "@/views/home/Information";
import Group from "@/views/home/Group";
import ReportManage from "@/views/home/ReportManage";
import Audit from "@/views/home/Audit";
import Footer from "@/components/Footer";
export default {
  name: "Home",
  components: {
    Footer,
    Header,
    ReportSearch,
    Information,
    Group,
    APTAssociationAnalysis,
    ReportManage,
    Audit,
  }
}
</script>

<style scoped>

#home{
  height: 100%;
}
.el-container{
  height: 100%;
  width: 100%;
}
.el-header .el-footer{
  height: 60px;
}

.el-footer {
  padding: 20px 20px;
  text-align: center;
  justify-content: center
}
</style>
