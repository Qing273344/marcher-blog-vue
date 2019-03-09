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
  .blog-main, .el-main {
    height: 80%;
    width: 100%;
    min-height: 750px;
  }
</style>
