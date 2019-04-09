<template>
  <!-- 分页组件 -->
  <div class="blog-pagination">
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageUtil.curPage"
      :page-size="pageUtil.pageSize"
      :total="pageUtil.totalRow"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import PageUtil from '@/utils/pageUtil';

  @Component({
    components: {}
  })
  export default class Pagination extends Vue {
    @Prop() private pageUtil: PageUtil = new PageUtil();

    /**
     * 每页条数
     */
    @Emit("changePage")
    sizeChangeHandle(pageSize: number) {
      this.pageUtil.pageSize = pageSize;
      return this.pageUtil;
      // this.$emit("changePage", this.pageUtil);
    }

    /**
     * 翻页
     */
    @Emit("changePage")
    currentChangeHandle(curPage: number) {
      this.pageUtil.curPage = curPage;
      return this.pageUtil;
      // this.$emit("", this.pageUtil);
    }

  }
</script>

<style lang="scss" scoped>
  .el-pagination {
    margin: 10px 0 5px 0;
  }
</style>
