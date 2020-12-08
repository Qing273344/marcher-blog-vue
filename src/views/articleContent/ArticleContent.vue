<!-- 文章内容 -->
<template>
  <div class="article-content">
    <div class="article-head">
      <span>{{ articleDetail.title }}</span>
    </div>
    <div class="markdown-body" v-highlight v-html="articleContentHtml"></div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ArticleApi from '@/api/ArticleApi';
  import marked from 'marked';
  import 'mavon-editor/dist/markdown/github-markdown.min.css';
  import 'mavon-editor/src/lib/css/md.css';
  import { ArticleDetailBean } from '@/bean/ArticleDetailBean';
  import Highlight from "@/components/plugs/Highlight";

  @Component({
    components: {
      Highlight,
    },
  })
  export default class ArticleContent extends Vue {

    private articleDetail: ArticleDetailBean = new ArticleDetailBean();
    private articleContentHtml = '';

    private articleId: any = '';

    private created() {
      this.articleId = (this.$route.query as any).articleId;
      this.getArticleContent();
    }

    getArticleContent() {
      ArticleApi.detail({id: this.articleId}).then((data: any) => {
        this.articleDetail = data;
        this.articleContentHtml = marked(this.articleDetail.articleContentMd);
      })
    }

  }
</script>

<style lang="scss" scoped>
  .article-content {
    width: calc(100vw - 280px);
    min-height: 100%;
  }

  .article-head {
    /*height: 50px;*/
    width: 100%;
    font-size: 32px;
    box-sizing: border-box;
    color: lightslategrey;
    /*background-color: lemonchiffon;*/
    padding: 20px 10px;
    margin-bottom: 10px;
  }

  .markdown-body {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    background-color: #fff;
  }

  .markdown-body img {
    cursor: pointer;
    transform: scale(1);
    transition: all ease 0.2s;
  }

  .markdown-body img.hover {
    transform: scale(1.5);
  }

</style>
