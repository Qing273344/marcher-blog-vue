<template>
  <div class="blog-footer">

    <el-footer>

      <!--<p>-->
        <!--Github:-->
        <!--<a href="https://github.com/Qing273344/marcher-blog-vue" target="_blank">https://github.com/Qing273344/marcher-blog-vue</a>-->
      <!--</p>-->


    </el-footer>

  </div>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ElFooter from "element-ui/packages/footer/src/main.vue";

  @Component({
    components: {
      ElFooter
    }
  })
  export default class Footer extends Vue {

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .blog-footer, .el-footer {
    height: 100px;
    width: 100%;
    background: #b5b5b5 url("https://marcher-blog.oss-cn-shenzhen.aliyuncs.com/project/title_img.jpeg") no-repeat center center;
  }

  .blog-footer p {
    color: aqua;
  }

  .blog-footer a {
    color: lemonchiffon;
  }

</style>
