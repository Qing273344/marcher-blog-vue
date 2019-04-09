<template>

  <div class="login">
    <div class="login-content">
      <div class="login-bg"></div>
      <div class="login-content-main">

        <div class="login-form">
          <div class="login-form-main">
            <div class="login-form-main-head">账号登录</div>
            <!-- 登录 -->
            <el-form abel-width="80px" :model="loginForm" :rules="loginRules" ref="loginForm">
              <el-form-item class="login-form-main-input" prop="username">
                <el-input v-model="loginForm.username" placeholder="用户名"/>
              </el-form-item>
              <el-form-item class="login-form-main-input" prop="password">
                <el-input v-model="loginForm.password" :type="passwordType" placeholder="密码" @keypress.enter.native="handleLogin()"></el-input>
                <span class="show-pwd" @click="showPwd()">
                  <i class="el-icon-view"></i>
                </span>
              </el-form-item>
              <div class="login-form-main-input">
                <el-button @click="handleLogin()" size="small" type="primary">登录</el-button>
              </div>
            </el-form>
          </div>

          <div class="login-form-footer">
            <i> 左转 ------------------------------------> </i>
            <router-link class="go-register" :to="{name:'registerLink'}">注册</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { UserModule } from '@/store/modules/user';
  import LoginApi from '@/api/login';
  import { UserInfoBean } from '@/bean/UserInfoBean';
  import { Action } from 'vuex-class';
  import ValidateUtil from '@/utils/validateUtil';
  import { ElForm } from 'element-ui/types/form';

  @Component
  export default class Login extends Vue {
    @Action private UserInfo!: (userInfoBean: UserInfoBean) => void;

    public userInfoBean: UserInfoBean = new UserInfoBean();

    private loginForm = {
      username: '',
      password: '',
    };
    private passwordType = 'password';

    /**
     * 显示密码
     */
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    }

    /**
     * 登录
     */
    handleLogin() {
      (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
        if (valid) {
          UserModule.Login(this.loginForm).then(() => {
            // 登录成功获取用户信息
            this.getUserInfo();
          }).catch(() => { });
        } else {
          return false;
        }
      });
    }

    /**
     * 用户信息
     */
    private getUserInfo() {
      LoginApi.userInfo().then((response: any) => {
        const userInfoBean = this.userInfoBean = response.info;
        this.UserInfo(userInfoBean);
        // this.$store.dispatch('UserInfo', userInfoBean);
        // 登录成功返回上一页
        this.$router.go(-1);
      }).catch(() => {
      });
    }


    /**
     * 校验用户名
     */
    public validateUsername = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请填写用户名'));
      } else {
        callback();
      }
    }

    /**
     * 校验密码
     */
    public validatePwd = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请输入密码'));
      }
      if (!ValidateUtil.validatePassword(value)) {
        callback(new Error('密码不符规范'));
      } else {
        callback();
      }
    }

    public loginRules = {
      username: [{required: true, trigger: 'blur', validator: this.validateUsername}],
      password: [{required: true, trigger: 'blur', validator: this.validatePwd}],
    };

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray: #1721a4;

  .show-pwd {
    position: absolute;
    right: 15px;
    top: 2px;
    font-size: 22px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-content {
    width: 100%;
    height: 100%;
  }

  .login-bg {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    min-width: 1200px;
    position: absolute;
    margin: 0 auto;
    background: url(../../assets/login.jpg) no-repeat center center; /*背景图*/
    background-size: cover;
    z-index: -1;
  }

  .login-content-main {
    height: 700px;
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .login-form {
    width: 400px;
    height: 460px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    position: absolute;
    left: 75%;
    margin-left: -200px;
    top: 25%;
  }

  .login-form-footer {
    width: 400px;
    height: 65px;
    line-height: 65px;
    position: absolute;
    bottom: 0;
  }

  .login-form-footer i {
    margin-left: 30px;
    color: #00FFFF;
  }

  .login-form-footer .go-register {
    height: 40px;
    width: 100px;
    text-align: center;
    text-decoration: none;
    line-height: 40px;
    font-size: 14px;
    color: #00FFFF;
    margin-right: 25px;
    border: 1px solid rgb(216, 216, 216);
    float: right;
    margin-top: 12px;
    border-radius: 3px;
  }

  .login-form-main {
    width: 100%;
    height: 395px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0 30px;
  }

  .login-form-main-head {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    padding-top: 40px;
  }

  .login-form-main-input {
    height: 48px;
    width: 100%;
    margin-top: 30px;
  }

  .login-form-main-input input {
    height: 100%;
    width: 100%;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-left: 14px;
    font-size: 14px;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 0px 1000px #FFFFFF inset;
  }

  .login-form-main-input button {
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #0c81ce 0%, #81abe0 100%);
  }
</style>
