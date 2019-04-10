<template>
  <div class="blog-main">

    <el-main>

    <router-view/>

    </el-main>
    <Footer></Footer>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ElMain from 'element-ui/packages/main/src/main.vue';
	import Footer from '@/components/footer/BlogFooter.vue';
  @Component({
    components: {ElMain,Footer}
  })
  export default class BlogMain extends Vue {
  }
</script>


<style lang="scss" scoped>
  .blog-main {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    /*position: absolute;
    top: 40px;
    bottom: 0px;*/
    background-color: #f4f5f5;
    padding-top: 40px;
    min-height: 100%;
  }

  .el-main {
    width: 100%;
    padding: 0;
    overflow: auto;
    padding-top: 10px;
    min-height: calc(100vh - 156px);
    /*position: absolute;
    margin-top: 10px;
    top: 0;
    bottom: 0;*/
  }
</style>
