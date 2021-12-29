<template>
  <div>
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
import IntelligenceSearch from "@/views/home/IntelligenceSearch";
import APTAssociationAnalysis from "@/views/home/APTAssociationAnalysis";
import ReportManage from "@/views/home/ReportManage";
import Audit from "@/views/home/Audit";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    Footer,
    Header,
    ReportSearch,
    IntelligenceSearch,
    APTAssociationAnalysis,
    ReportManage,
    Audit
  }
}
</script>

<style scoped>

.el-container{
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*margin: auto;*/
  width: 100%;
}
.el-main{
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.el-footer {
  text-align: center;
  justify-content: center
}
</style>
