<template>
  <div class="login">
    <!-- 登录 -->
    <el-form :label-position="labelPosition" abel-width="80px" :model="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">用户名</el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" :type="passwordType" placeholder="请输入密码">密码</el-input>
        <span class="show-pwd" @click="showPwd()">
          <i>显示密码?</i>
        </span>
      </el-form-item>
      <el-button @click="handleLogin()" size="small" type="primary">登录</el-button>
    </el-form>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { UserModule } from "@/store/modules/user";
  import { userInfo } from "@/api/login";
  import { UserInfoBean } from "@/bean/UserInfoBean";
  import { Action } from "vuex-class";

  @Component
  export default class Login extends Vue {
    @Action private UserInfo!: (userInfoBean: UserInfoBean) => void;

    public userInfoBean: UserInfoBean = new UserInfoBean();

    private loginForm = {
      username: "",
      password: "",
    };
    private passwordType = "password";
    private labelPosition = "top";

    // 显示密码
    private showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    }

    // 登录
    private handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        alert("请输入完整的用户名和密码");
      } else {
        UserModule.Login(this.loginForm).then(() => {
          // 登录成功获取用户信息
          this.getUserInfo();
        }).catch(() => {
        });
      }
    }

    // 用户信息
    private getUserInfo() {
      userInfo(null).then((response) => {
        const userInfoBean = this.userInfoBean = response.info;

        this.UserInfo(userInfoBean);

        // this.$store.dispatch('UserInfo', userInfoBean);

        // 登录成功返回上一页
        this.$router.go(-1);
      }).catch(() => {
      });
    }

  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #8a7d70;
  $dark_gray: #1721a4;

  .login {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
