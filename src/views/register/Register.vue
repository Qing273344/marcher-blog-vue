<template>

  <div class="blog-register">
    <div class="register-content">
      <div class="register-bg"></div>
      <div class="register-content-main">

        <div class="register-form">
          <div class="register-form-main">
            <div class="register-form-main-head">账号注册</div>
            <!-- 登录 -->
            <el-form abel-width="80px" :model="registerForm" :rules="registerRules" ref="registerForm">
              <el-form-item class="register-form-main-input" prop="username">
                <el-input v-model.trim="registerForm.username" placeholder="用户名"/>
              </el-form-item>
              <el-form-item class="register-form-main-input" prop="password">
                <el-input v-model.trim="registerForm.password" :type="passwordType" placeholder="密码"/>
                <span class="show-pwd" @click="showPwd()">
                  <i class="el-icon-view"></i>
                </span>
              </el-form-item>
              <el-form-item class="register-form-main-input" prop="confirmPassword">
                <el-input v-model.trim="registerForm.confirmPassword" :type="passwordType" placeholder="确认密码"/>
              </el-form-item>

              <div class="register-form-main-input">
                <el-button @click="handleRegister()" size="small" type="primary">注册</el-button>
              </div>
            </el-form>
          </div>

          <div class="register-form-footer">
            <i> 右转 ------------------------------------> </i>
            <router-link class="go-register" :to="{name:'loginLink'}">登录</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import RegisterApi from '@/api/register';
  import { ElForm } from 'element-ui/types/form';
  import ValidateUtil from '@/utils/validateUtil';

  @Component({
    components: {

    },
  })
  export default class Register extends Vue {

    public registerForm = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    private passwordType = 'password';

    // 显示密码
    private showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    }

    // 注册
    private handleRegister() {
      // 校验
      (this.$refs.registerForm as ElForm).validate((valid: boolean) => {
        if (valid) {
          console.log(1);
          RegisterApi.register(this.registerForm).then((response) => {
            // 跳转到登录页
            this.$router.push({name: 'loginLink'});
          });
        } else {
          return false;
        }
      });
    }


    // 校验用户名
    private validateUsername = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请填写用户名'));
      }
      callback();
    }

    // 校验密码
    private validatePwd = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请输入密码'));
      }
      if (!ValidateUtil.validatePassword(value)) {
        callback(new Error('密码不符规范'));
      }
      callback();
    }

    // 确认密码
    public validateConfirmPwd = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback(new Error('请输入密码'));
      }
      if (!ValidateUtil.validatePassword(value)) {
        callback(new Error('密码不符规范'));
      }
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不匹配'));
      }
      callback();
    }

    public registerRules = {
      username: [{required: true, trigger: 'blur', validator: this.validateUsername}],
      password: [{required: true, trigger: 'blur', validator: this.validatePwd}],
      confirmPassword: [{required: true, trigger: 'blur', validator: this.validateConfirmPwd}],
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

  .register-content {
    width: 100%;
    height: 100%;
  }

  .register-bg {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    min-width: 1200px;
    position: absolute;
    margin: 0 auto;
    background: url("http://ppikh5m4w.bkt.clouddn.com/login.jpg") no-repeat center center;
    background-size: cover;
    z-index: -1;
  }

  .register-content-main {
    height: 700px;
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .register-form {
    width: 400px;
    height: 460px;
    /*background-color: #FFFFFF;*/
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    position: absolute;
    left: 75%;
    margin-left: -200px;
    top: 25%;
  }

  .register-form-footer {
    width: 400px;
    height: 65px;
    line-height: 65px;
    position: absolute;
    bottom: 0;
    /*background-color: #f0f0f0;*/
  }

  .register-form-footer i {
    margin-left: 30px;
    color: #00FFFF;
  }

  .register-form-footer .go-register {
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

  .register-form-main {
    width: 100%;
    height: 395px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0 30px;
  }

  .register-form-main-head {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    padding-top: 40px;
  }

  .register-form-main-input {
    height: 48px;
    width: 100%;
    margin-top: 30px;
  }

  .register-form-main-input input {
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

  .register-form-main-input button {
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #0c81ce 0%, #81abe0 100%);
  }
</style>
