<!-- 博客右侧边栏 -->
<template>
  <div class="blog-side">
    <div class="side-auth">
        随便说点什么吧
    </div>

    <div class="blog-tag">
      <div class="blog-tag-title">
        <span>上上签</span>
      </div>
      <div class="blog-tag-list">
        <el-tag>标签一一一一一一</el-tag>
        <el-tag>标签二</el-tag>
        <el-tag>标签三</el-tag>
        <el-tag>标签四</el-tag>
        <el-tag>标签五</el-tag>
        <el-tag>标签六</el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class Side extends Vue {

  }
</script>

<style lang="scss" scoped>
  .blog-side {
    width: 260px;
    height: 100%;
    margin-left: 20px;
  }

  .side-auth {
    width: 260px;
    height: 200px;
    margin-bottom: 15px;
    background-color: #fff;
  }

  .blog-tag {
    width: 260px;
    height: 200px;
    margin-bottom: 15px;
    background-color: #fff;
    .blog-tag-title {
      height: 40px;
      box-sizing: border-box;
      padding: 9px 0 0 15px;
      font-weight: 600;
      font-size: 16px;
      text-align: left;
      border-bottom: 1px solid #E6E9ED;
    }
    .blog-tag-list {
      width: 260px;
      height: 160px;
      box-sizing: border-box;
      padding: 15px 15px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .el-tag {
        margin-right: 10px;
        margin-bottom: 15px;
        background-color: #f3f6f3;
        border: 0;
        border-radius: 10px;
      }
    }
  }
</style>
