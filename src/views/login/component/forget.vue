<template>
  <div class="login-con" @keydown.enter="submitForm('loginForm')">
    <div class="icon-login">
      <p>重置密码</p>
    </div>
    <div class="line-login" />
    <div class="form-con">
      <div class="form-top">
        <div :class="[clickSwitch ? 'check-blue' : '']" @click="switchRest">
          手机验证码重置
        </div>
        <div :class="[!clickSwitch ? 'check-blue' : '']" @click="switchRest">
          邮箱重置
        </div>
      </div>
      <el-form
        ref="loginForm"
        :model="form"
        status-icon
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
      >
        <template v-if="clickSwitch">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输入手机号码"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="code">
            <sendCode v-model="form.code" :phone="form.phone" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="至少6位密码，区分大小写"
              autocomplete="off"
            />
            <div class="tiop">
              长度6-20，必须包含大写字母、小写字母、数字和字符中的三种类型
            </div>
          </el-form-item>
          <el-form-item prop="surePass">
            <el-input
              v-model="form.surePass"
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="确认密码"
              autocomplete="off"
            />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="email">
            <el-input
              v-model="form.email"
              prefix-icon="el-icon-message"
              placeholder="请输入邮箱"
              autocomplete="off"
            />
          </el-form-item>
          <el-button
            plain
            style="width:100%"
            @click="sendEmail()"
          >发送链接至邮箱</el-button>
          <div class="email-tip">
            请检查您的电子邮件,然后单击确认
          </div>
        </template>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="bot-for">
        暂不修改,<span @click="backlogin">取消</span>
        <el-checkbox v-model="checked">已阅读并同意</el-checkbox>
        <span>《神*云平台服务协议》</span>
        <span>《隐私权政策》</span>
      </div>
    </div>
  </div>
</template>

<script>
import sendCode from '@/views/login/component/sendCode'
import { validatePass, validatePhone, validateEmail } from '@/utils/regExp'
import loginApi from '@/api/loginApi'

export default {
  components: { sendCode },
  data() {
    var validatePassSure = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (value === this.form.password) {
          callback()
        } else {
          callback(new Error('密码与第一次输入不一致'))
        }
      }
    }
    return {
      form: {
        phone: '',
        code: '',
        password: '',
        surePass: '',
        email: ''
      },
      clickSwitch: true,
      rules: {
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        surePass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassSure, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      key: 'tHisisakEY125689',
      checked: false
    }
  },
  created() {},
  methods: {
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          if (!this.checked) {
            this.$message.warning('请勾选已阅读协议')
            return
          }
          if (this.clickSwitch) {
            const data = {
              ...this.form,
              phone: this.$encryption(this.form.phone, this.key),
              password: this.$md5(this.form.password)
            }
            delete data.surePass
            console.log(data)
            this.$parent.componetName = 'login'
          } else {
          //
          }
        }
      })
    },
    sendEmail() {
      
    },
    switchRest() {
      this.clickSwitch = !this.clickSwitch
      if (this.clickSwitch) {
        this.$nextTick(() => {
          this.resetForm('loginForm')
        })
      } else {
        this.resetForm('loginForm')
      }
    },
    backlogin() {
      this.$parent.componetName = 'login'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  /deep/.el-button--primary {
    width: 100% !important;
  }
}
.email-tip {
  color: #c3c3c3;
  text-align: center;
  line-height: 100px;
}
.icon-login {
  text-align: center;
  font-size: 20px;
}
.login {
  position: absolute;
  .demo-ruleForm {
    width: 400px;
    margin: 0 auto;
  }
  .bot-for {
    font-size: 12px !important;
    color: #c3c3c3;
    span {
      color: #438df3;
      cursor: pointer;
    }
    a {
      color: #438df3;
      cursor: pointer;
    }
    span:nth-of-type(1) {
      margin-right: 10px;
    }
  }
  .forget-code {
    display: flex;
    align-items: center;
    .el-button {
      width: 120px !important;
      margin-left: 20px;
    }
  }
  .tiop {
    font-size: 13px !important;
    color: #c3c3c3;
  }
  .line-login {
    width: 100%;
    height: 2px;
    margin: 20px 0 15px 0;
    background-color: #438df3;
  }
  .form-top {
    width: 240px;
    display: flex;
    color: #c3c3c3;
    margin: 0 auto;
    div {
      text-align: center;
    }
  }
  .form-top div::after {
    content: '';
    display: block;
    width: 120px;
    height: 2px;
    margin-top: 6px;
    margin-bottom: 20px;
    background-color: #c3c3c3;
  }
  .check-blue {
    color: #438df3;
  }
  .check-blue::after {
    content: '';
    display: block;
    width: 120px;
    height: 2px;
    margin-top: 6px;
    margin-bottom: 20px;
    background-color: #438df3 !important;
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
