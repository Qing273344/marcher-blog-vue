<template>
  <div class="blog-main">

    <el-main>

    <router-view/>

    </el-main>
    <!--<Footer></Footer>-->
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
    box-sizing: border-box;
    background-color: #f4f5f5;
    min-height: 100%;
  }

  .el-main {
    width: 100%;
    overflow: auto;
    padding: 30px 20px;
    min-height: 100%;
  }
</style>
