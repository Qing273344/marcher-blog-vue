<!-- 点击发布文章按钮触发填写文章属性信息弹框 -->
<template>
  <div class="article-publish">

    <!-- 文章信息属性 -->
    <el-dialog title="发布文章" :visible.sync="articlePublishDialog" :show-close="false">
      <el-form :model="articlePublishFrom" lable-position="left" label-width="80px">
        <el-form-item label="分类:">
          <el-select class="type-select" v-model="articlePublishFrom.typeId" placeholder="请选择分类" value="">
            <el-option v-for="type in articleTypeBeanList" :key="type.typeId" :label="type.name" :value="type.typeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签:">
          <el-checkbox-group class="tag-checkbox" v-model="articlePublishFrom.tagIdList" :min="1" :max="3">
            <el-checkbox v-for="tag in articleTagBeanList" :key="tag.tagId" :label="tag.tagId">{{tag.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="公开文章">
          <el-switch v-model="articleStatus" active-color="#13ce66" :active-text="articleStatusRemark"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="warning" plain @click="handleDraft()">存为草稿</el-button>
        <el-button type="success" @click="handlePublish()">确定发布</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
  import AdminTagApi from "@/api/adminTag";
  import { ArticleTagBean } from "@/bean/ArticleTagBean";
  import { ArticlePublishFrom } from "@/from/ArticlePublishFrom";
  import { ArticleTypeBean } from "@/bean/articleTypeBean";
  import AdminTypeAPi from "@/api/adminType";
  import { Message } from "element-ui";
  import AdminArticleApi from "@/api/adminArticle";

  @Component({
    components: {}
  })
  export default class ArticlePublish extends Vue {
    @Prop() articlePublishDialog: boolean;
    @Prop() articlePublishFrom: ArticlePublishFrom;

    private articleStatus: boolean = true;
    private articleStatusRemark: string = '公开';
    private articleId = null;

    public articleTagBeanList: ArticleTagBean[] = new Array<ArticleTagBean>();
    public articleTypeBeanList: ArticleTypeBean[] = new Array<ArticleTypeBean>();

    @Watch("articleStatus")
    checkArticleStatusRemark() {
      if (this.articleStatus) {
        this.articleStatusRemark = '不公开';
      } else {
        this.articleStatusRemark = '公开';
      }
    }

    /**
     * 监控弹窗
     */
    @Watch('articlePublishDialog')
    initAttribute() {
      if (this.articlePublishDialog) {
        // 获取博客标签
        AdminTagApi.listAll(null).then((response) => {
          this.articleTagBeanList = response.list;
        });

        // 获取博客类型
        AdminTypeAPi.listAll(null).then((response) => {
          this.articleTypeBeanList = response.list;
        });

        // 是否编辑
        this.articleId = this.$route.query.articleId;
        if (this.articleId) {

        }
      }
    }

    /**
     * 存为草稿
     */
    handleDraft() {
      // 校验参数
      this.checkFrom();

      this.articlePublishFrom.status = this.articleStatus ? 1 : 0;

      AdminArticleApi.publishMd(this.articlePublishFrom).then(() => {
        // 保存成功, 跳转到首页
        this.$router.push({name: 'homeLink'});
      });
    }

    /**
     * 确定发布
     */
    handlePublish() {
      // 校验参数
      this.checkFrom();

      this.articlePublishFrom.status = this.articleStatus ? 1 : 0;

      AdminArticleApi.publishMd(this.articlePublishFrom).then(() => {
        // 发布成功, 跳转到首页
        this.$router.push({name: 'homeLink'});
      });
    }

    /**
     * 校验表单
     */
    private checkFrom() {
      if (!this.articlePublishFrom.typeId) {
        Message({message: '请选择博客类型', type: 'warning', duration: 2 * 1000});
        return;
      }
      if (!this.articlePublishFrom.typeId) {
        Message({message: '请选择博客标签', type: 'warning', duration: 2 * 1000});
        return;
      }
      if (!this.articlePublishFrom.typeId) {
        Message({message: '请选择博客状态', type: 'warning', duration: 2 * 1000});
        return;
      }
    }

    /**
     * 通知父组件关闭弹窗
     */
    @Emit("closeShowDialog")
    closeDialog() {
    }
  }
</script>

<style lang="scss" scoped>
  .type-select {
    position: absolute;
    left: 50px;
  }

  .tag-checkbox {
    position: absolute;
    left: 50px;
  }

  .el-checkbox {
    margin-right: 15px;
  }

  .el-switch {
    position: absolute;
    top: 10px;
    left: 50px;
  }
</style>
