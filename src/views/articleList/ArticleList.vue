<!-- 文章列表 -->
<template>
  <div class="article-list">

    <div class="article-list-content" v-for="site in articleListBeanList">
      <div class="article-details-link" @click="handleDetails(site.articleId)">
        <div class="article-title">
        <span>
          {{ site.title }}
        </span>
        </div>
        <div class="article-title-info">
          <i class="el-icon-date"></i>
          {{ site.timeStr }}
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ArticleListBean } from '@/bean/ArticleListBean';
  import QueryPage from '@/utils/queryPage';
  import QueryData from '@/utils/queryData';
  import PageUtil from '@/utils/pageUtil';
  import Query from '@/utils/query';
  import ArticleApi from '@/api/article';
  import { ResponseBean } from '@/bean/common/ResponseBean';

  @Component({
    components: {}
  })
  export default class ArticleList extends Vue {

    private pageUtil: PageUtil = new PageUtil;
    private queryPage: QueryPage = new QueryPage(this.pageUtil.curPage, this.pageUtil.pageSize);
    private queryData: QueryData = new QueryData();
    private queryArgs: Query<QueryData> = new Query(this.queryData, this.queryPage);
    private responseBean: ResponseBean = new ResponseBean();

    private articleListBean: ArticleListBean = new ArticleListBean();
    private articleListBeanList: ArticleListBean[] = new Array<ArticleListBean>();

    created() {
      this.query();
    }

    query() {
      // 更新query参数
      this.queryArgs = new Query(this.queryData, this.queryPage);

      ArticleApi.query(this.queryArgs).then((response) => {
        this.responseBean = response.data;
        this.articleListBeanList = this.responseBean.data.list;
      })
    }

    handleDetails(articleId) {
      let routeUrl = this.$router.resolve({name: "articleContentMainLink", query:{articleId: articleId}});
      window.open(routeUrl.href, "_blank");
    }

    getSites() {
      return [
        { title: '文章标题1', content: '文章信息1' },
        { title: '文章标题2', content: '文章信息2' },
        { title: '文章标题3', content: '文章信息3' },
        { title: '文章标题4', content: '文章信息4' },
        { title: '文章标题5', content: '文章信息5' },
        { title: '文章标题6', content: '文章信息6' },
        { title: '文章标题7', content: '文章信息7' },
        { title: '文章标题8', content: '文章信息8' }
      ]
    }


  }
</script>

<style lang="scss" scoped>
  .article-list {
    width: 790px;
    height: 100%;
  }

  .article-list-content {
    width: 788px;
    height: 98px;
    border-bottom: 1px solid #E6E9ED;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;
    cursor: pointer;
    .article-details-link {
      padding: 10px 22px;
    }

    .article-title {
      height: 22px;
      margin-top: 6px;
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .article-title-info {
      height: 26px;
    }
  }
</style>
