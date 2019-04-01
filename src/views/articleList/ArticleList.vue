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
  import { Component, Prop, Vue, Watch } from "vue-property-decorator";
  import { ArticleListBean } from '@/bean/ArticleListBean';
  import QueryPage from '@/utils/queryPage';
  import QueryData from '@/utils/queryData';
  import PageUtil from '@/utils/pageUtil';
  import Query from '@/utils/query';
  import ArticleApi from '@/api/article';
  import { ResponseBean } from '@/bean/common/ResponseBean';
  import { State } from 'vuex-class';
  import { IMainQueryState } from '@/store/modules/mainQuery';

  @Component({
    components: {}
  })
  export default class ArticleList extends Vue {
    @State private mainQuery!: IMainQueryState;

    private articleKeyword: string = '';

    private pageUtil: PageUtil = new PageUtil;
    private queryPage: QueryPage = new QueryPage(this.pageUtil.curPage, this.pageUtil.pageSize);
    private queryData: QueryData = new QueryData();
    private queryArgs: Query<QueryData> = new Query(this.queryData, this.queryPage);
    private responseBean: ResponseBean = new ResponseBean();

    private articleListBeanList: ArticleListBean[] = new Array<ArticleListBean>();

    @Watch("articleKeyword")
    queryByKeyword() {
      console.log(111);
    }

    created() {
      console.log(this.articleKeyword);
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
