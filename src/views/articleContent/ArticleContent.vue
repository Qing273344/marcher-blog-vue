<!-- 文章内容 -->
<template>
  <div class="article-content">
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

  import highlight from '@/components/plugs/highlight.ts';          // markdown高亮插件
  import 'highlight.js/styles/googlecode.css';                   //样式文件

  @Component({
    components: {
      // marked,
      markedPlug,
      highlight,
    },
  })
  export default class ArticleContent extends Vue {

    private articleContentMd = '';
    private articleContentHtml = '';

    private articleId: any = '';

    created() {
      this.articleId = this.$route.query.articleId;
      this.getArticleContent();
    }

    getArticleContent() {
      ArticleApi.details({id: this.articleId}).then((response: any) => {
        this.articleContentMd = response.details;
        this.articleContentHtml = marked(this.articleContentMd);
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

  .markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    /*float: left;*/
    text-align: left;
    padding: 0 10px;
  }

</style>
