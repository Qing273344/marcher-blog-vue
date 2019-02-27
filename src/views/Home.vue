<template>
  <div class="home">
    <el-container direction="vertical">

      <BlogHead></BlogHead>
      <router-view></router-view>
      <Footer></Footer>

    </el-container>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import BlogHead from "@/components/header/BlogHead.vue";
  import Footer from "@/components/footer/BlogFooter.vue";
  import ElContainer from "element-ui/packages/container/src/main.vue";
  import ElHeader from "element-ui/packages/header/src/main.vue";
  import ElFooter from "element-ui/packages/footer/src/main.vue";
  import ElMain from "element-ui/packages/main/src/main.vue";

  @Component({
    components: {
      ElMain,
      ElFooter,
      ElHeader,
      ElContainer,
      BlogHead, Footer,
    },
  })
  export default class Home extends Vue {

  }

</script>


<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  .el-footer {
    background-color: #80d1cd;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
