<template>
  <div class="blog-home">
    <el-container id="blog-container" direction="vertical">

      <BlogHead :scrollTop="scrollTop"></BlogHead>
      <BlogMain></BlogMain>
      <!--<Footer></Footer>-->

    </el-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BlogHead from "@/components/header/BlogHead.vue";
  import BlogMain from '@/components/main/BlogMain.vue';
  import Footer from '@/components/footer/BlogFooter.vue';
  import ElContainer from 'element-ui/packages/container/src/main.vue';

  @Component({
    components: {
      ElContainer,
      BlogHead, BlogMain, Footer,
    },
  })
  export default class Home extends Vue {

    private scrollTop: number = 0;

    // 头部下拉到指定位置设置背景色
    mounted() {
      let self = this;
      document.getElementById('blog-container').onscroll = function () {
        self.scrollTop = (this as any).scrollTop;
      }
    }

  }

</script>


<style lang="scss" scoped>
  .blog-home, .el-container {
    height: 100vh;
    width: 100%;
    overflow: auto;
    background-color: #f4f5f5;
  }

</style>
