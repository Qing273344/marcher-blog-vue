<template>
  <!-- 页头菜单 -->
  <div class="blog-head">
    <el-header height="40px">
      <el-menu
        class="blog-head-menu"
        :default-active="activeIndex"
        active-text-color="#8B0000"
        mode="horizontal">

        <!--<el-menu-item index="null" class="blog-logo" @click="homeLink()">marcher博客</el-menu-item>-->
				<el-menu-item index="null" class="blog-logo" @click="homeLink()">钱大妈</el-menu-item>
        <el-menu-item index="1" @click="homeLink()">首页</el-menu-item>
        <el-menu-item index="2" >专栏一</el-menu-item>
        <el-menu-item index="3">专栏二</el-menu-item>
        <el-menu-item index="4">专栏三</el-menu-item>
        <el-menu-item index="10"  class="info-local" @click="adminMainLink()">管理主页</el-menu-item>

        <div class="blog-head-info">
          <input class="blog-search" placeholder="找呀找..." v-model="articleKeyword"/>
          <el-button class="el-button-search info-local" type="primary" icon="el-icon-search"  @click="query()"></el-button>

          <!--<el-menu-item class="info-local" index="5" @click="publishMdLink()">写博客</el-menu-item>-->
          <!--<el-menu-item class="info-local" index="6" @click="adminMainLink()">管理主页</el-menu-item>-->

          <!-- 未登录 -->
          <el-menu-item class="head-login-register info-local" index="7" v-if="!user.isLogin" @click="loginLink()">登录</el-menu-item>
          <el-menu-item class="head-login-register info-local" index="8" v-if="!user.isLogin" @click="registerLink()">注册</el-menu-item>

          <!-- 登录成功 -->
          <el-menu-item index="9" class="write-blog info-local el-icon-document" v-if="user.isLogin" @click="publishMdLink()">写博客</el-menu-item>
          <el-menu-item index="10"  class="info-local"  v-if="user.isLogin" @click="adminMainLink()">管理主页</el-menu-item>
          <el-menu-item index="11" class="head-personal-info info-local" v-if="user.isLogin" @click="registerLink()">{{ user.username }}</el-menu-item>
        </div>

      </el-menu>
    </el-header>

  </div>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from 'vue-property-decorator';
  import { IUserState } from '@/store/modules/user';
  import ElHeader from 'element-ui/packages/header/src/main.vue';
  import { Action, State } from 'vuex-class';

  @Component({
    components: {
      ElHeader,
    }
  })
  export default class BlogHead extends Vue {
    @Action private QueryKeyword!: (keyword: string) => void;
    @State private user!: IUserState;

    private articleKeyword: string = '';

    private activeIndex = '1';

    private query() {
      this.QueryKeyword(this.articleKeyword);
    }

    public homeLink() {
      this.$router.push({name: "homeLink"});
    }
    /**
     * 新窗口打开写博客页面
     */
    public publishMdLink() {
      let routeUrl = this.$router.resolve({name: "publishMdLink"});
      window.open(routeUrl.href, "_blank");
    }

    public adminMainLink() {
      this.$router.push({name: "adminMainLink"});
    }

    public loginLink() {
      this.$router.push({name: "loginLink"});
    }
    public registerLink() {
      this.$router.push({name: "registerLink"});
    }

  }
</script>


<style lang="scss" scoped>
  .blog-head, .el-header {
    height: 40px;
    padding: 0;
    position: fixed;
    top: 0;
   	right: 0;
   	left: 0;
   	background-color: #FFFFFF;
   	box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }

  .el-menu, .el-menu-item {
    height: 40px;
    line-height: 40px;
    color: black;
  }

  .el-menu {
    width: 1200px;
    margin: 0 auto;
  }

  .blog-logo {
    font-weight: 900;
    font-size: 22px;
    color: #285aff;
  }

  .blog-head-info {
    min-width: 500px;
    height: 40px;
    float: right;
    right: 0;
  }

  .blog-search {
    width: 180px;
    height: 32px;
    float: left;
    margin-top: 4px;
    padding: 0 15px;
    box-sizing: border-box;
    display: inline-block;
    outline: 0;
    font-size: inherit;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  .write-blog{
    font-weight: 400;
    color: dodgerblue;
    padding: 0 10px;
  }

  .el-button-search {
    width: 42px;
    height: 32px;
    margin: 4px 15px 4px 10px;
    padding: 5px;
    font-size: 22px;
  }

  .head-login-register {
    width: 36px;
    padding: 0 2px;
    display: block;
    text-align: center;
  }

  .info-local {
    float: left;
    position: relative;
  }

</style>
