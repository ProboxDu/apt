<template>
  <div :style="conTop" class="homeTitle">
    <main id="home-main">
      <div class="home-name">
        A&nbsp;P&nbsp;T&nbsp;&nbsp;威&nbsp;&nbsp;胁&nbsp;&nbsp;情&nbsp;&nbsp;报&nbsp;&nbsp;知&nbsp;&nbsp;识&nbsp;&nbsp;库
      </div>
      <div class="home-description">「APT威胁情报知识库」</div>
      <div class="home-tr"></div>
      <a class="home-btn" href="/home">查询入口</a>
<!--      <div class="home-tr"></div>-->
    </main>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      conTop: {
        backgroundImage: "url(" + require("../assets/img/pic.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  }

}
</script>

<style scoped>
@import "../assets/css/home.css";
</style>
