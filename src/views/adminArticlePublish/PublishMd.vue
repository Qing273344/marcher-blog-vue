<!-- 文章内容, MD格式 -->
<template>
  <div class="blog-publish-md">

    <div class="article-bar">
      <div class="article-bar-title">
        <el-input placeholder="请输入标题..." v-model="articlePublishFrom.title"></el-input>
      </div>
      <div class="article-bar-publish">
        <el-button type="danger" @click="openPublishDialog()">发布文章</el-button>

        <!-- 头像 -->
        <div class="article-bar-userinfo">
          <el-dropdown @command="handleLink">
            <img src="http://ppikh5m4w.bkt.clouddn.com/touxiang.jpg" class="el-dropdown-link"/>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="homeLink">首页</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </div>

    <div class="article-editor">
      <mavon-editor ref=mavon class="article-editor-content"
                    v-model="articlePublishFrom.articleContent"
                    placeholder="请开始你的表演..."
                    @imgAdd="$imgAdd" />
    </div>

    <ArticlePublish ref="article_publish" :articlePublishDialog="articlePublishDialog" :articlePublishFrom="articlePublishFrom"
                    @closeShowDialog="closeShowDialog()"></ArticlePublish>

  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  const mavonEditor = require('mavon-editor');
  import 'mavon-editor/dist/css/index.css';
  import ArticlePublish from '@/views/adminArticlePublish/ArticlePublish.vue';
  import { ArticlePublishFrom } from '@/from/ArticlePublishFrom';
  import { Message } from 'element-ui';
  import AdminArticleApi from '@/api/adminArticle';

  @Component({
    components: {
      "mavonEditor": mavonEditor.mavonEditor,
      ArticlePublish,
    }
  })
  export default class PublishMd extends Vue {

    private articlePublishDialog = false;
    private articlePublishFrom: ArticlePublishFrom = new ArticlePublishFrom();
    private articleId: any = '';

    created() {
      this.articleId = (this.$route.query as any).articleId;
      if (this.articleId) {
        this.init(this.articleId);
      }
    }

    init(articleId: string) {
      AdminArticleApi.getAsEdit({id: articleId}).then((response: any) => {
        this.articlePublishFrom = response.info;
      })
    }

    /**
     * 文章图片上传
     */
    private $imgAdd(pos: any, $file: any) {
      // 图片
      const formData = new FormData();
      formData.append('file', $file);
      AdminArticleApi.putImg(formData).then((response: any) => {
        const fileUrl = response.info;
        // 替换url
        (this.$refs.mavon as any).$img2Url(pos, fileUrl);
      });
    }

    /**
     * 点击发布打开博客属性弹窗
     */
    openPublishDialog() {
      if (!this.articlePublishFrom.title) {
        Message({message: '请填写博客标题', type: 'warning', duration: 2 * 1000});
        return;
      }
      if (!this.articlePublishFrom.articleContent) {
        Message({message: '请填写博客内容', type: 'warning', duration: 2 * 1000});
        return;
      }
      this.articlePublishDialog = true;

      // 调用子组件初始化编辑数据
      (this.$refs.article_publish as ArticlePublish).init();
      // (this.$refs.article_publish as ArticlePublish).$emit('init');
    }

    closeShowDialog() {
      this.articlePublishDialog = false;
    }

    /**
     * 下拉菜单路由跳转
     * @param link  点击的下拉菜单项
     */
    handleLink(link: string) {
      this.$router.push({name: link});
    }
  }
</script>

<style lang="scss" scoped>
  .blog-publish-md {
    width: 100%;
    height: 100%;
    min-height: 900px;
  }

  .article-bar {
    width: 100%;
    height: 60px;

    .article-bar-title {
      width: calc(100vw - 200px);
      box-sizing: border-box;
      padding: 10px 30px 10px 30px;
    }

    .article-bar-publish {
      width: 200px;
      height: 60px;
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      padding: 10px 0 10px 0;

      .el-button {
        height: 40px;
        position: absolute;
        left: 10px;
      }

      .article-bar-userinfo {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 30px;
        /* 圆形头像 */
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border: 2px solid #fff;
        box-shadow: 0 0 4px #ccc;
        display: inline-block;
        overflow: hidden;
      }

      .article-bar-userinfo img {
        width: 40px;
        height: 40px;
      }

      .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
      }
    }
  }

  .article-editor {
    width: 100%;
    height: calc(100vh - 60px);
    min-height: 800px;

    .article-editor-content {
      height: 100%;
    }
  }

</style>
