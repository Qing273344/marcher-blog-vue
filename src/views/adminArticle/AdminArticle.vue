<template>
  <div class="blog-admin-article">
    <div class="blog-admin-panel">
      <div class="blog-admin-article-content">
        <div class="blog-admin-table-head">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="publishMdLink()">写文章</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="handleBatchDeleted()">批量删除</el-button>

          <el-input class="el-input-search" placeholder="搜索..." v-model="queryData.keyword"></el-input>
          <el-button class="el-button-search" type="primary" icon="el-icon-search" @click="query()"></el-button>
          <el-button class="el-button-refresh" type="primary" icon="el-icon-refresh" @click="refresh()"></el-button>
        </div>

        <div class="blog-admin-table-main">
          <el-table :data="adminArticleListBeanList" stripe @selection-change="handleSelectionChange">
            <el-table-column prop="title" label="标题" width="260px"></el-table-column>
            <el-table-column prop="title" label="评论"></el-table-column>
            <el-table-column label="置顶">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.top === 1" active-color="#13ce66" @change="changeTop(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="浏览"></el-table-column>
            <el-table-column prop="description" label="评论"></el-table-column>
            <el-table-column prop="description" label="喜欢"></el-table-column>
            <el-table-column prop="description" label="发布时间"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button class="table-operation-button" type="primary" icon="el-icon-edit" @click="">编辑</el-button>
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
  import QueryPage from '@/utils/queryPage';
  import QueryData from '@/utils/queryData';
  import Query from '@/utils/query';
  import PageUtil from '@/utils/pageUtil';
  import { AdminArticleListBean } from '@/bean/AdminArticleListBean';
  import Pagination from '@/components/pagination/pagination.vue';
  import AdminArticleApi from '@/api/adminArticle';
  import { ResponseBean } from '@/bean/common/ResponseBean';

  @Component({
    components: {
      Pagination,
    }
  })
  export default class AdminArticle extends Vue {
    private articleId: string = null;
    private pageUtil: PageUtil = new PageUtil;

    private isTop: boolean = true;
    private responseBean: ResponseBean = new ResponseBean();

    private queryPage: QueryPage = new QueryPage(this.pageUtil.curPage, this.pageUtil.pageSize);
    private queryData: QueryData = new QueryData();
    private queryArgs: Query<QueryData> = new Query(this.queryData, this.queryPage);
    private ids: number[] = [];
    private adminArticleListBeanList: AdminArticleListBean[] = new Array<AdminArticleListBean>();

    created() {
      this.query();
    }

    /**
     * 新窗口打开写文章页面
     */
    publishMdLink() {
      let routeUrl = this.$router.resolve({name: "publishMdLink"});
      window.open(routeUrl.href, "_blank");
    }

    handleSelectionChange(rows) {
      this.ids = [];
    }

    changePage(pageUtil) {

    }

    changeTop(row) {
      if (row.top == 1) {
        row.top = 0;
      } else {
        row.top = 1
      }
      console.log(row)
    }

    /**
     * 删除指定数据
     * @param id 数据Id
     */
    handleDelete(id: number) {
      this.$confirm("是否删除该文章?", "提示", {confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"})
        .then(() => {
          this.ids[0] = id;
          AdminArticleApi.remove(this.ids).then(() => {
            this.query();
            this.$message({
              type: "success", message: "删除成功!"
            });
          });
        });
    }

    /**
     * query
     */
    private query() {
      // 更新query参数
      this.queryArgs = new Query(this.queryData, this.queryPage);

      AdminArticleApi.query(this.queryArgs).then((response) => {
        this.responseBean = response.data;
        this.adminArticleListBeanList = this.responseBean.data.list;
        this.pageUtil = this.responseBean.page;
      })
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
    top: 50px;
    right: 20px;
    left: 20px;
    padding: 10px 20px;
    overflow: hidden;
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

  .article-title {
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-operation-button {
    width: 60px;
    height: 26px;
    font-size: 15px;
    margin: 0 2px;
    padding: 4px 5px;
  }

</style>
