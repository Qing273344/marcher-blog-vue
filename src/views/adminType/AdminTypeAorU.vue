<template>
  <div class="blog-admin-type-AorU">

    <el-dialog :title="!typeId ? '添加类型' : '编辑类型'" :visible.sync="aORuTypeDialog" :show-close="false">
      <el-form :model="articleTypeBean" lable-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input placeholder="请输入类型名称" v-model="articleTypeBean.name"></el-input>
        </el-form-item>
        <el-form-item label="类型描述">
          <el-input placeholder="请输入类型描述" v-model="articleTypeBean.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="!typeId ? handleAdd() : handleEdit()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
  import { ArticleTypeBean } from '@/bean/articleTypeBean';
  import AdminTypeAPi from '@/api/adminType';

  @Component({
    components: {}
  })
  export default class AdminTypeAorU extends Vue {
    @Prop() aORuTypeDialog: boolean;
    @Prop() typeId: string;

    public articleTypeBean: ArticleTypeBean = new ArticleTypeBean();

    /**
     * 新增类型
     */
    handleAdd() {
      AdminTypeAPi.add(this.articleTypeBean).then(() => {
        this.closeDialog();
      })
    }

    /**
     * 编辑类型
     */
    handleEdit() {
      this.articleTypeBean.typeId = this.typeId;
      AdminTypeAPi.update(this.articleTypeBean).then(() => {
        this.closeDialog();
      })
    }

    /**
     * 编辑回显指定数据(监听typeId值的变化, 有值回显)
     */
    @Watch('typeId')
    getTypeInfo() {
      if (this.typeId) {
        AdminTypeAPi.get({id: this.typeId}).then((response) => {
          this.articleTypeBean = response.info;
        });
      }
    }

    /**
     * 通知父组件关闭弹窗
     */
    @Emit("closeShowDialog")
    closeDialog() {
      this.articleTypeBean = new ArticleTypeBean();
    }
  }
</script>

<style lang="scss" scoped>

</style>
