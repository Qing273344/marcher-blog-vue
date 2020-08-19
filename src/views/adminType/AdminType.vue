<template>
  <div class="blog-admin-type">

    <div class="blog-admin-panel">
      <div class="blog-admin-type-content">
        <div class="blog-admin-table-head">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAddDialog()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="handleBatchDeleted()">批量删除</el-button>

          <el-input class="el-input-search" placeholder="搜索..." v-model="queryData.keyword"></el-input>
          <el-button class="el-button-search" type="primary" icon="el-icon-search" @click="query()"></el-button>
          <el-button class="el-button-refresh" type="primary" icon="el-icon-refresh" @click="refresh()"></el-button>
        </div>
        <div class="blog-admin-table-main">
          <el-table :data="articleTypeBeanList" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="类型" width="260"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button class="table-operation-button" type="primary" icon="el-icon-edit" @click="openEditDialog(scope.row)">编辑</el-button>
                <el-button class="table-operation-button" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.typeId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="blog-admin-table-footer">
          <Pagination :pageUtil="pageUtil" @changePage="changePage"></Pagination>
        </div>
      </div>
    </div>

    <AdminTypeAorU :typeId="typeId" :aORuTypeDialog="aORuTypeDialog" @closeShowDialog="closeShowDialog()"></AdminTypeAorU>

  </div>
</template>


<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import AdminTypeAorU from "@/views/adminType/AdminTypeAorU.vue";
  import Pagination from "@/components/pagination/pagination.vue";
  import PageUtil from "@/utils/pageUtil";
  import { ResponseBean } from "@/bean/common/ResponseBean";
  import QueryPage from "@/utils/queryPage";
  import QueryData from "@/utils/queryData";
  import Query from "@/utils/query";
  import { ArticleTypeBean } from "@/bean/articleTypeBean";
  import AdminTypeAPi from "@/api/adminType";

  @Component({
    components: {
      AdminTypeAorU, Pagination,
    },
  })
  export default class AdminType extends Vue {
    private aORuTypeDialog = false;
    private typeId: string = '';
    private pageUtil: PageUtil = new PageUtil();

    private responseBean: ResponseBean = new ResponseBean();

    private queryPage: QueryPage = new QueryPage();
    private queryData: QueryData = new QueryData();
    private queryArgs: Query<QueryData> = new Query(this.queryData, this.queryPage);
    private ids: string[] = [];
    private selectTypeBeanList: ArticleTypeBean[] = new Array<ArticleTypeBean>();
    private articleTypeBeanList: ArticleTypeBean[] = new Array<ArticleTypeBean>();

    /**
     * 复选框选择
     */
    private handleSelectionChange(rows: any) {
      this.ids = [];
      this.selectTypeBeanList = rows;
      for (let i = 0; i < this.selectTypeBeanList.length; i++) {
        this.ids[i] = this.selectTypeBeanList[i].typeId;
      }
    }

    private created() {
      this.query();
    }

    /**
     *  分页
     */
    private changePage(pageUtil: PageUtil) {
      this.pageUtil = pageUtil;
      this.queryPage = QueryPage.change(this.pageUtil);
      this.query();
    }

    /**
     * 打开新增弹框
     */
    private openAddDialog() {
      this.typeId = '';
      this.aORuTypeDialog = true;
    }

    /**
     * 打开编辑弹框
     */
    private openEditDialog(row: any) {
      this.typeId = row.typeId;
      this.aORuTypeDialog = true;
    }

    /**
     * 删除指定数据
     * @param id 数据Id
     */
    private handleDelete(id: string) {
      this.$confirm('是否删除该类型?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          this.ids[0] = id;
          AdminTypeAPi.remove(this.ids).then(() => {
            this.query();
            this.$message({
              type: 'success', message: '删除成功!',
            });
          });
        });
    }

    /**
     * 批量删除
     */
    private handleBatchDeleted() {
      this.$confirm('是否删除类型?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
          if (this.ids) {
            AdminTypeAPi.remove(this.ids).then(() => {
              this.query();
              this.$message({
                type: 'success', message: "'删除成功!",
              });
            });
          }
        });
    }

    /**
     * 关闭显示的弹框
     */
    private closeShowDialog() {
      this.aORuTypeDialog = false;
      this.typeId = '';
      this.query();
    }

    /**
     * 查询
     */
    private query() {
      // 更新query参数
      this.queryArgs = new Query(this.queryData, this.queryPage);

      /// query
      AdminTypeAPi.query(this.queryArgs).then((response: any) => {
        this.responseBean = response.data;
        this.articleTypeBeanList = this.responseBean.data.list;
        this.pageUtil = this.responseBean.page;
      });
    }

    /**
     * 刷新
     */
    private refresh() {
      this.queryData = new QueryData();
      this.queryPage = QueryPage.init();
      this.query();
    }

  }
</script>

<style lang="scss" scoped>
  .blog-admin-type {
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

  .blog-admin-type-content {
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
  }

  .el-table-column {
    height: 50px;
  }

  .table-operation-button {
    width: 60px;
    height: 26px;
    font-size: 15px;
    margin: 0 2px;
    padding: 4px 5px;
  }

</style>
