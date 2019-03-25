<!-- 博客右侧边栏 -->
<template>
  <div class="blog-side">

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class Side extends Vue {

  }
</script>

<style lang="scss" scoped>
  .blog-side {
    width: 260px;
    height: 100%;
    border: 1px solid #E6E9ED;
    margin-left: 20px;
  }
</style>
