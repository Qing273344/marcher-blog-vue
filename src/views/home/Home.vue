<template>
  <div class="blog-home">
    <el-container direction="vertical">

      <BlogHead></BlogHead>
      <BlogMain></BlogMain>
      <Footer></Footer>

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

  }

</script>


<style lang="scss" scoped>
  .blog-home, .el-container {
    height: 100%;
    width: 100%;
  }
</style>
