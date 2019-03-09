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

          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">导航二</el-menu-item>
          <el-menu-item index="3">导航三</el-menu-item>

          <el-menu-item index="4">
            <router-link :to="{name:'aboutLink'}">关于</router-link>
          </el-menu-item>

          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>
          <el-menu-item index="null"></el-menu-item>


        <!-- 未登录 -->
        <el-menu-item index="5" v-if="!user.isLogin">
          <router-link :to="{name:'loginLink'}">登录</router-link>
          &nbsp;&nbsp;
          <router-link :to="{name:'registerLink'}">注册</router-link>
        </el-menu-item>

        <!-- 登录成功 -->
        <el-menu-item index="6" v-if="user.isLogin">
          <router-link :to="{name:'registerLink'}">写博客</router-link>
        </el-menu-item>
        <el-menu-item index="7" v-if="user.isLogin">
          <router-link :to="{name:'registerLink'}">{{ user.username }}</router-link>
        </el-menu-item>

        <!--<el-menu-item index="5">-->
          <!--<div class="blog-head-person">-->
            <!--<div v-if="!user.isLogin">-->
              <!--<router-link :to="{name:'loginLink'}">登录</router-link>-->
              <!--&nbsp;&nbsp;-->
              <!--<router-link :to="{name:'registerLink'}">注册</router-link>-->
            <!--</div>-->
            <!--<div v-else>-->
              <!--{{ user.username }}-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-menu-item>-->

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

  }
</script>


<style lang="scss" scoped>
  .blog-head, .el-header {
    height: 40px;
  }

  .el-menu, .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
</style>
