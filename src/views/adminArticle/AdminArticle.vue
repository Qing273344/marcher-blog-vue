<template>
  <div class="blog-admin-article">
    <div class="blog-admin-panel">
      <div class="blog-admin-article-content">
        <div class="blog-admin-table-head">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="publishMdLink()">写文章</el-button>

          <el-input class="el-input-search" placeholder="搜索..." v-model="queryData.keyword"></el-input>
          <el-button class="el-button-search" type="primary" icon="el-icon-search" @click="query()"></el-button>
          <el-button class="el-button-refresh" type="primary" icon="el-icon-refresh" @click="refresh()"></el-button>
        </div>

        <div class="blog-admin-table-main">
          <el-table :data="adminArticleListBeanList" stripe>
            <el-table-column prop="title" label="标题" width="360px">
              <template slot-scope="scope">
                <div class="article-publish-status" v-if="isPublish(scope.row)">
                  <span>已发布</span>
                </div>
                <div class="article-draft-status" v-else>
                  <span>草稿哟</span>
                </div>
                <span class="article-title" @click="toDetail()">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评论">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isComment === 1" active-color="#13ce66" @change="changeComment(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="置顶">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isTop === 1" active-color="#13ce66" @change="changeTop(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="viewsCount" label="浏览"></el-table-column>
            <el-table-column prop="description" label="评论"></el-table-column>
            <el-table-column prop="likedCount" label="喜欢"></el-table-column>
            <el-table-column prop="timeStr" label="发布时间" width="160"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button class="table-operation-button" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.articleId)">编辑</el-button>
                <el-button class="table-operation-button" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.articleId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="blog-admin-table-footer">
          <Pagination :pageUtil="pageUtil" @changePage="changePage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import BaseQuery from "@/bean/common/BaseQuery";
  import PageUtil from "@/utils/pageUtil";
  import { AdminArticleListBean } from "@/bean/AdminArticleListBean";
  import Pagination from "@/components/pagination/pagination.vue";
  import AdminArticleApi from "@/api/adminArticleApi";
  import { ArticleStatusEnum } from "@/commons/enums/ArticleStatusEnum";

  @Component({
    components: {
      Pagination,
    },
  })
  export default class AdminArticle extends Vue {
    private articleId: string = '';
    private pageUtil: PageUtil = new PageUtil();

    private queryData: BaseQuery = new BaseQuery();
    private adminArticleListBeanList: AdminArticleListBean[] = new Array<AdminArticleListBean>();

    private created() {
      this.query();
    }

    private toDetail() {
      console.log(111);
    }

    /**
     * 是否发布
     */
    private isPublish(row: AdminArticleListBean) {
      return row.status && row.status == ArticleStatusEnum.ARTICLE_STATUS_PUBLISH;
    }

    /**
     * 新窗口打开写文章页面
     */
    private publishMdLink() {
      const routeUrl = this.$router.resolve({name: 'publishMdLink'});
      window.open(routeUrl.href, '_blank');
    }

    /**
     * 分页
     */
    private changePage(pageUtil: PageUtil) {
      this.queryData.change(pageUtil);
      this.query();
    }

    /**
     * 编辑文章
     */
    private handleEdit(articleId: string) {
      const routeUrl = this.$router.resolve({name: 'publishMdLink', query: {articleId}});
      window.open(routeUrl.href, '_blank');
    }

    /**
     * 评论设置
     */
    private changeComment(row: any) {
      AdminArticleApi.comment({id: row.articleId}).then(() => {
        this.query();
      });
    }

    /**
     * 置顶设置
     */
    private changeTop(row: any) {
      AdminArticleApi.top({id: row.articleId}).then(() => {
        this.query();
      });
    }

    /**
     * 删除指定数据
     * @param articleId 文章id
     */
    private handleDelete(articleId: string) {
      this.$confirm('是否删除该文章?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          AdminArticleApi.remove({id: articleId}).then(() => {
            this.query();
            this.$message({
              type: 'success', message: '删除成功!',
            });
          });
        });
    }

    /**
     * query
     */
    private query() {
      AdminArticleApi.query(this.queryData).then((responseBean : any) => {
        this.adminArticleListBeanList = responseBean.data.list;
        this.pageUtil = responseBean.page;
      });
    }

    /**
     * 刷新查询
     */
    refresh() {
      this.queryData = new BaseQuery();
      this.query();
    }

  }
</script>

<style lang="scss" scoped>

  .blog-admin-article {
    width: 100%;
    height: 100%;
  }

  .blog-admin-panel {
    min-height: 200px;
    border: 1px solid #E6E9ED;
    position: absolute;
    top: 0;
    right: 20px;
    left: 20px;
    padding: 10px 20px;
    overflow: hidden;
    background-color: #fff;
  }

  .blog-admin-article-content {
    min-height: 200px;
    position: relative;
    padding: 0 5px;

    .blog-admin-table-head {
      width: 100%;;
      height: 60px;
      box-sizing: border-box;
      padding: 10px;

      .el-button {
        float: left;
      }

      .el-input-search {
        width: 200px;
        position: absolute;
        right: 130px;
      }

      .el-button-search {
        width: 60px;
        height: 40px;
        font-size: 24px;
        position: absolute;
        right: 60px;
        padding: 8px;
      }

      .el-button-refresh {
        width: 40px;
        height: 40px;
        font-size: 24px;
        position: absolute;
        right: 10px;
        padding: 8px;
      }
    }

    .blog-admin-table-main {
      width: 100%;
      min-height: 560px;
      box-sizing: border-box;
      border: 1px solid #E6E9ED;
    }

    .blog-admin-table-footer {
      width: 100%;
      height: 50px;
    }
  }

  .el-table {
    width: 100%;
    font-weight: bold;
  }

  .el-table-column {
    height: 50px;
  }

  .article-publish-status {
    width: 50px;
    height: 23px;
    float: left;
    font-size: 75%;
    padding-left: 7px;
    margin-right: 5px;
    background-color: #5cb85c;
    color: #fff;
    display: inline;
    border-radius:10px;
  }

  .article-draft-status {
    width: 50px;
    height: 23px;
    float: left;
    font-size: 75%;
    padding-left: 7px;
    margin-right: 5px;
    background-color: #DCDFE6;
    color: #fff;
    display: inline;
    border-radius:10px;
  }

  .article-title {
    font-size: 16px;
    color: #428bca;
  }

  .table-operation-button {
    width: 60px;
    height: 26px;
    font-size: 15px;
    margin: 0 2px;
    padding: 4px 5px;
  }

</style>
