<template>
  <div class="blog-admin-tag-AorU">

    <el-dialog :title="!tagId ? '添加标签' : '编辑标签'" :visible.sync="aORuTagDialog" :show-close="false">
      <el-form :model="articleTagBean" lable-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input placeholder="请输入标签名称" v-model="articleTagBean.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述">
          <el-input placeholder="请输入标签描述" v-model="articleTagBean.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="!tagId ? handleAdd() : handleEdit()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
  import { ArticleTagBean } from "@/bean/ArticleTagBean";
  import AdminTagApi from "@/api/adminTag";

  @Component({
    // components: {}
  })
  export default class AdminTagAorU extends Vue {
    @Prop() private aORuTagDialog: boolean = false;
    @Prop() private tagId: string = '';

    public articleTagBean: ArticleTagBean = new ArticleTagBean();

    /**
     * 新增标签
     */
    private handleAdd() {
      AdminTagApi.add(this.articleTagBean).then(() => {
        this.closeDialog();
      });
    }

    /**
     * 编辑标签
     */
    private handleEdit() {
      this.articleTagBean.tagId = this.tagId;
      AdminTagApi.update(this.articleTagBean).then(() => {
        this.closeDialog();
      });
    }

    /**
     * 编辑回显指定数据(监听tagId值的变化, 有值回显)
     */
    @Watch('tagId')
    private getTagInfo() {
      if (this.tagId) {
        AdminTagApi.get({id: this.tagId}).then((data: any) => {
          this.articleTagBean = data;
        });
      }
    }

    /**
     * 通知父组件关闭弹窗
     */
    @Emit("closeShowDialog")
    private closeDialog() {
      this.articleTagBean = new ArticleTagBean();
    }
  }
</script>

<style lang="scss" scoped>

</style>
