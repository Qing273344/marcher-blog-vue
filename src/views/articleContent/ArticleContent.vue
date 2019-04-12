<!-- 文章内容 -->
<template>
  <div class="article-content">
    <div class="article-head">
      <h1>{{ articleDetails.title }}</h1>
    </div>
    <div class="markdown-body" v-highlight v-html="articleContentHtml"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ArticleApi from '@/api/article';
  import marked from 'marked';
  import markedPlug from '@/components/plugs/markedPlug.ts';
  import 'mavon-editor/dist/markdown/github-markdown.min.css';
  import 'mavon-editor/src/lib/css/md.css';

  // import highlight from '@/components/plugs/highlight.ts';          // markdown高亮插件
  import 'highlight.js/styles/googlecode.css';
  import { ArticleDetailsBean } from '@/bean/ArticleDetailsBean';                   //样式文件

  const highlight = require('@/components/plugs/highlight.ts');

  @Component({
    components: {
      markedPlug,
      highlight,
    },
  })
  export default class ArticleContent extends Vue {

    private articleDetails: ArticleDetailsBean = new ArticleDetailsBean();
    private articleContentHtml = '';

    private articleId: any = '';

    created() {
      this.articleId = this.$route.query.articleId;
      this.getArticleContent();
    }

    getArticleContent() {
      ArticleApi.details({id: this.articleId}).then((response: any) => {
        this.articleDetails = response.info;
        this.articleContentHtml = marked(this.articleDetails.articleContentMd);
      })
    }

  }
</script>

<style lang="scss" scoped>
  .article-content {
    width: calc(100vw - 280px);
    min-height: 100%;
    background-color: #fff;
  }

  .article-head {
    height: 50px;
    width: 100%;
    padding: 0 10px;
    text-align: left;
    box-sizing: border-box;
    color: lightslategrey;
    border-bottom: 1px solid #E6E9ED;
  }

  .markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
  }

</style>
