<template>
  <div class="blog-main">

    <el-main>

    <router-view/>

    </el-main>

  </div>
</template>


<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ElMain from 'element-ui/packages/main/src/main.vue';

  @Component({
    components: {ElMain}
  })
  export default class BlogMain extends Vue {
  }
</script>


<style lang="scss" scoped>
  .blog-main {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    position: absolute;
    top: 40px;
    bottom: 100px;
    background-color: #f4f5f5;
  }

  .el-main {
    width: 100%;
    padding: 0;
    position: absolute;
    margin-top: 10px;
    top: 0;
    bottom: 0;
  }
</style>
