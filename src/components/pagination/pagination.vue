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
      :layout="pageLayout">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
  import PageUtil from '@/utils/pageUtil';
  import { PageStyleEnum } from '@/commons/enums/PageStyleEnum';

  @Component({
    components: {}
  })
  export default class Pagination extends Vue {
    @Prop() private pageUtil!: PageUtil;

    private fullLayout: string = 'total, sizes, prev, pager, next, jumper';
    private simplLayout: string = 'prev, pager, next';
    private pageLayout: string = this.fullLayout;

    created() {
      if (this.pageUtil.pageStyle === PageStyleEnum.SIMPL_LAYOUT) {
        this.pageLayout = this.simplLayout;
      }
    }

    /**
     * 每页条数
     */
    @Emit('changePage')
    sizeChangeHandle(pageSize: number) {
      this.pageUtil.pageSize = pageSize;
      return this.pageUtil;
      // this.$emit("changePage", this.pageUtil);
    }

    /**
     * 翻页
     */
    @Emit('changePage')
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
