<template>
  <div class="blog-footer">

    <el-footer height="100px">

      <hr>
      <p>BlogFooter</p>

    </el-footer>

  </div>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ElFooter from 'element-ui/packages/footer/src/main.vue';

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
    padding: 0;
  }

  /*.el-footer {*/
    /*height: 100px;*/
    /**/
  /*}*/
</style>
