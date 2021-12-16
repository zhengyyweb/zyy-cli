<template>
  <div class="login-con" @keydown.enter="submitForm('loginForm')">
    <div class="icon-login">
      <svg-icon icon-class="logo" />
      <p>神*云智能临床研究一体化平台</p>
    </div>
    <div class="line-login" />
    <div class="form-con">
      <div class="form-top">
        账号密码登录
      </div>
      <el-form
        ref="loginForm"
        :model="form"
        status-icon
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名/手机号/邮箱登录"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="isCode" prop="phone">
          <el-input
            v-model="form.phone"
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入手机号码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="isCode" prop="code">
          <sendCode v-model="form.code" :phone="form.phone" />
        </el-form-item>

        <div class="check-pass">
          <div @click="forgetPWD">忘记密码?</div>
          <div @click="register">新用户注册</div>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/cookie' // get token from cookie
import sendCode from '@/views/login/component/sendCode'
// import loginApi from '@/api/loginApi'
export default {
  components: { sendCode },
  data() {
    return {
      showLogo: true,
      isCollapse: true,
      checked: false,
      form: {
        code: '',
        username: '',
        password: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }

        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }

        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }

        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
      },
      isCode: false,
      key: 'tHisisakEY125689'
    }
  },
  created() {},
  methods: {
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          // $encryption
          const data = {
            ...this.form,
            username: this.$encryption(this.form.username, this.key),
            password: this.$md5(this.form.password)
          }
          console.log(data)
          setToken('123456')
          this.$router.push('/')
        }
      })
    },
    // 忘记密码
    forgetPWD() {
      this.$parent.componetName = 'forget'
    },
    // 注册
    register() {
      this.$parent.componetName = 'register'
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.sidebar-logo-container {
  background-color: white;
}
.icon-login {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  .svg-icon {
    height: 40px;
    width: 40px;
  }
  p {
    margin-bottom: 0px !important;
    font-size: 25px !important;
  }
}
.el-form-item {
  /deep/.el-button--primary {
    width: 100% !important;
  }
}

.check-pass {
  display: flex;
  justify-content: space-between;
  font-size: 14px !important;
  color: #438df3;
  margin-bottom: 15px;
}
.login {
  position: absolute;
  p {
    // line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
  }
  .demo-ruleForm {
    width: 400px;
    margin: 0 auto;
  }
  .line-login {
    width: 100%;
    height: 2px;
    margin: 20px 0 15px 0;
    background-color: #438df3;
  }
  .form-top {
    width: 100px;
    margin: 0 auto;
  }
  .form-top::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    margin-top: 6px;
    margin-bottom: 20px;
    background-color: #438df3;
  }
  &-con {
    width: 500px;
    padding: 30px 40px;
    background-color: #fff;
    position: absolute;
    border-radius: 6px;
    // left: 50%;
    // top: 50%;
    // transform: translateY(-50%) translateX(-50%);
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
