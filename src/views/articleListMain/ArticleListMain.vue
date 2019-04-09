<!-- 博客列表主体 -->
<template>
  <div class="article-list-main">
    <ArticleList></ArticleList>
    <Side></Side>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ArticleList from '@/views/articleList/ArticleList.vue';
  import Side from '@/views/side/Side.vue';

  @Component({
    components: {
      ArticleList, Side,
    }
  })
  export default class ArticleListMain extends Vue {

  }
</script>

<style lang="scss" scoped>
  .article-list-main {
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    display: flex;
  }
</style>
