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
            <img src="https://marcher-blog.oss-cn-shenzhen.aliyuncs.com/project/touxiang.jpg" class="el-dropdown-link"/>
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
  import 'mavon-editor/dist/css/index.css';
  import ArticlePublish from '@/views/adminArticlePublish/ArticlePublish.vue';
  import { ArticlePublishFrom } from '@/bean/from/ArticlePublishFrom';
  import { Message } from 'element-ui';
  import AdminArticleApi from '@/api/AdminArticleApi';

  import mavonEditor from 'mavon-editor';
  import AdminCommonApi from '@/api/AdminCommonApi';
  import { OssSignatureBean } from '@/bean/OssSignatureBean';
  import DateUtil from '@/utils/DateUtil';
  import RandomUtil from '@/utils/RandomUtil';

  @Component({
    components: {
      mavonEditor: mavonEditor.mavonEditor,
      ArticlePublish,
    },
  })
  export default class PublishMd extends Vue {

    private articlePublishDialog = false;
    private articlePublishFrom: ArticlePublishFrom = new ArticlePublishFrom();
    private ossSignatureBean: OssSignatureBean = new OssSignatureBean();
    private articleId: any = '';

    private created() {
      this.articleId = (this.$route.query as any).articleId;
      if (this.articleId) {
        this.init(this.articleId);
      }
    }

    private init(articleId: string) {
      AdminArticleApi.getAsEdit({id: articleId}).then((data: any) => {
        this.articlePublishFrom = data;
      });

      // 获取 OSS 签名及相关信息
      this.getOssSignature();
    }

    /**
     * 文章图片上传
     */
    private $imgAdd(pos: any, $file: any) {
      // 获取 OSS 签名及相关信息
      // this.getOssSignature();

      let dir = DateUtil.dateFormat('YYYY-mm-dd', new Date()) + '/';
      let fileName = RandomUtil.guid();
      let suffix = this.getSuffix($file.name);
      const key = dir + fileName + suffix;

      const uploadHost: string = 'http://' + (this.ossSignatureBean.bucket + '.' + this.ossSignatureBean.endpoint);
      const imgUrl = uploadHost + '/' + key;

      // 图片数据
      const formData = new FormData();
      formData.append('key', key);                                            // 存储在oss的文件路径
      formData.append('OSSAccessKeyId', this.ossSignatureBean.accessKeyId);   // accessKeyId
      formData.append('policy', this.ossSignatureBean.policy);                // policy
      formData.append('Signature', this.ossSignatureBean.signature);          // 签名
      formData.append('success_action_status', '200');                        // 成功后返回的操作码
      formData.append('file', $file);                                         // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了

      AdminArticleApi.putImg(formData, uploadHost).then((data: any) => {
        // 替换url
        (this.$refs.mavon as any).$img2Url(pos, imgUrl);
      });
    }

    public getSuffix(fileName: string) {
      const pos = fileName.lastIndexOf('.');
      let suffix = '';
      if (pos != -1) {
        suffix = fileName.substring(pos);
      }
      return suffix;
    }

    /**
     * oss 签名
     */
    private getOssSignature() {
      AdminCommonApi.ossSignature(null).then((data: any) => {
        this.ossSignatureBean = data;
      });
    }

    /**
     * 点击发布打开博客属性弹窗
     */
    private openPublishDialog() {
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

    private closeShowDialog() {
      this.articlePublishDialog = false;
    }

    /**
     * 下拉菜单路由跳转
     * @param link  点击的下拉菜单项
     */
    private handleLink(link: string) {
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
