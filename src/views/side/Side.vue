<!-- 博客右侧边栏 -->
<template>
  <div class="blog-side">
    <div class="side-auth">
        <div class="title">marcher博客</div>
        <div class="slogan">自娱自乐自嗨</div>
    </div>

    <div class="blog-tag">
      <div class="blog-tag-title">
        <span>上上签</span>
      </div>
      <div class="blog-tag-list">
        <el-tag v-for="tagName in tags">{{ tagName }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SideApi from '@/api/side';

  @Component
  export default class Side extends Vue {
    private tags: string[] = [];

    private created() {
      this.getHotTag();
    }

    /**
     * get 热门标签
     */
    private getHotTag() {
      SideApi.getHotTag(null).then((response: any) => {
        this.tags = response.list;
      });
    }

  }
</script>

<style lang="scss" scoped>
  .blog-side {
    width: 240px;
    height: 100%;
    margin-left: 20px;
  }

  .side-auth {
    width: 240px;
    height: 200px;
    margin-bottom: 15px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;
    .title{
	    margin-bottom: 5px;
	    font-size: 14px;
	    color: #2e3135;
	    font-weight: 600;
    }
    .slogan{
	    margin-bottom: 5px;
	    font-size: 14px;
	    color: #2e3135;
    }
  }

  .blog-tag {
    width: 240px;
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
      width: 240px;
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
