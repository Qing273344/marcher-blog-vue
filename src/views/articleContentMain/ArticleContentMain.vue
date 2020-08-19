<!-- 文章内容主体 -->
<template>
  <div class="article-content-main">
    <ArticleContent></ArticleContent>
    <Side></Side>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import ArticleContent from "@/views/articleContent/ArticleContent.vue";
  import Side from "@/views/side/Side.vue";

  @Component({
    components: {
      ArticleContent, Side,
    }
  })
  export default class ArticleContentMain extends Vue{

  }
</script>

<style lang="scss" scoped>
  .article-content-main {
    /*width: 85%;*/
   	width: 1280px;
    height: 100%;
    margin: 0 auto;
    display: flex;    
  }

  .blog-side {
    right: 0;
  }
</style>
