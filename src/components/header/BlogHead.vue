<template>
  <!-- 页头菜单 -->
  <div class="blog-head">
    <el-header height="40px">
      <el-menu
        class="blog-head-menu"
        :default-active="activeIndex"
        text-color="#000000"
        active-text-color="#8B0000"
        mode="horizontal">

        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>

        <el-menu-item index="1" @click="homeLink()">首页</el-menu-item>
        <el-menu-item index="2" @click="articleContentMainLink()">测试文章详情</el-menu-item>
        <el-menu-item index="3">导航三</el-menu-item>

        <el-menu-item index="4" @click="aboutLink()">
          <router-link :to="{name:''}">关于</router-link>
        </el-menu-item>

        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="null"></el-menu-item>
        <el-menu-item index="10" @click="publishMdLink()">写博客</el-menu-item>
        <el-menu-item index="11" @click="adminMainLink()">管理主页</el-menu-item>

        <!-- 未登录 -->
        <el-menu-item class="head-login-register" index="5" v-if="!user.isLogin" @click="loginLink()">登录</el-menu-item>
        <el-menu-item class="head-login-register" index="6" v-if="!user.isLogin" @click="registerLink()">注册</el-menu-item>

        <!-- 登录成功 -->
        <el-menu-item index="7" v-if="user.isLogin" @click="publishMdLink()">写博客</el-menu-item>
        <el-menu-item index="8" v-if="user.isLogin" @click="registerLink()">{{ user.username }}</el-menu-item>

      </el-menu>
    </el-header>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { State } from "vuex-class";
  import { IUserState, UserModule } from "@/store/modules/user";
  import ElHeader from "element-ui/packages/header/src/main.vue";

  @Component({
    components: {ElHeader}
  })
  export default class BlogHead extends Vue {
    @State private user!: IUserState;


    private activeIndex = "1";

    articleContentMainLink() {
      this.$router.push({name: "articleContentMainLink"});
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

    aboutLink() {
      this.$router.push({name: "aboutLink"});
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
  }

  .el-menu, .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .head-login-register {
    width: 36px;
    padding: 0 2px;
    display: block;
    text-align: center;
  }
</style>
