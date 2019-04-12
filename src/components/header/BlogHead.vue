<template>
  <!-- 页头菜单 -->
  <div class="blog-head">
    <el-header height="40px">
      <el-menu
        class="blog-head-menu"
        :default-active="activeIndex"
        active-text-color="#8B0000"
        mode="horizontal">

        <el-menu-item index="null" class="blog-logo" @click="homeLink()">marcher博客</el-menu-item>
        <el-menu-item index="1" @click="homeLink()">首页</el-menu-item>
        <el-menu-item index="2">专栏一</el-menu-item>
        <el-menu-item index="3">专栏二</el-menu-item>
        <el-menu-item index="4">专栏三</el-menu-item>
        <el-menu-item index="5">专栏四</el-menu-item>

        <div class="blog-head-info">
          <input class="blog-search" placeholder="找呀找..." v-model="articleKeyword"/>
          <el-button class="el-button-search info-local" type="primary" icon="el-icon-search"  @click="query()"></el-button>

          <!-- 未登录 -->
          <div class="blog-head-login" v-if="!isLogin">
          <el-menu-item class="head-login-register info-local" index="7" @click="loginLink()">登录</el-menu-item>
          <el-menu-item class="head-login-register info-local" index="8" @click="registerLink()">注册</el-menu-item>
          </div>

          <!-- 登录成功 -->
          <div class="blog-head-login" v-if="isLogin">
            <el-menu-item index="9" class="write-blog info-local el-icon-document" v-if="isAdmin" @click="publishMdLink()">写博客</el-menu-item>
            <el-menu-item index="10" class="info-local" v-if="isAdmin" @click="adminMainLink()">管理主页</el-menu-item>

            <!-- 头像 -->
            <div class="head-personal-info info-local">
              <el-dropdown trigger="click">
                <img :src="avatar" class="el-dropdown-link"/>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>登出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>

      </el-menu>
    </el-header>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { IUserState } from "@/store/modules/user";
  import ElHeader from "element-ui/packages/header/src/main.vue";
  import { Action, State } from "vuex-class";

  @Component({
    components: {
      ElHeader,
    }
  })
  export default class BlogHead extends Vue {
    @Action private LoadUserInfo!: () => void;
    @Action private QueryKeyword!: (keyword: string) => void;
    @State private user!: IUserState;

    private avatar = 'http://ppikh5m4w.bkt.clouddn.com/touxiang.jpg';

    private articleKeyword: string = '';
    private activeIndex = '1';

    /**
     * get计算属性 登录状态
     */
    get isLogin() {
      // 若vux中的状态因刷新初始化了, 则重新加载回来
      if (!this.user.username) {
        this.LoadUserInfo();
      }
      return this.user.isLogin;
    }

    /**
     * 是否博主
     */
    get isAdmin() {
      return this.user.userType === 1;
    }

    private query() {
      this.QueryKeyword(this.articleKeyword);
    }

    homeLink() {
      this.$router.push({name: "homeLink"});
    }
    /**
     * 新窗口打开写博客页面
     */
    publishMdLink() {
      let routeUrl = this.$router.resolve({name: "publishMdLink"});
      window.open(routeUrl.href, "_blank");
    }

    adminMainLink() {
      this.$router.push({name: "adminMainLink"});
    }

    loginLink() {
      this.$router.push({name: "loginLink"});
    }
    registerLink() {
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
   	z-index: 999;
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

  .blog-head-login {
    float: left;
    box-sizing: border-box;
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

  .head-personal-info {
    width: 32px;
    height: 32px;
    position: absolute;
    /* 圆形头像 */
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border: 2px solid #fff;
    box-shadow: 0 0 4px #ccc;
    display: inline-block;
    overflow: hidden;
    margin: 2px 20px;
  }

  .head-personal-info img {
    width: 32px;
    height: 32px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-dropdown-menu {
    margin: 0;
    width: 100px;
  }

</style>
