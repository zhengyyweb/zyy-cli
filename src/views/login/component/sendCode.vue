<template>
  <div class="forget-code">
    <el-input
      v-model="code"
      prefix-icon="el-icon-s-grid"
      placeholder="请输入验证码"
      minlength="4"
      maxlength="4"
      autocomplete="off"
      @input="$emit('input', code)"
    />
    <el-button :disabled="IsDisabled" plain @click="sendCode">{{
      tip
    }}</el-button>
  </div>
</template>

<script>
import loginApi from '@/api/loginApi'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: this.value,
      tip: '发送验证码',
      timer: null,
      IsDisabled: false,
      secord: 60
    }
  },
  created() {},
  methods: {
    sendCode() {
      if (this.timer) {
        return
      }
      console.log(this.phone)
      if (this.phone.length < 11) {
        this.$message.warning('请输入正确的手机号在发送验证码')
        return
      }
      const data = {
        phone: this.phone
      }
      loginApi.sendCodeResetApi(data).then((res) => {
        if (res.code !== 200) {
          this.$message.success(res.message)
          return
        }
        this.$message.success('验证码已发送')
        this.IsDisabled = true
        this.timer = setInterval(() => {
          this.tip = this.secord + 's后重新获取'
          this.secord -= 1
          if (this.secord < 0) {
            this.tip = '重新发送'
            this.IsDisabled = false
            this.reset()
          }
        }, 1000)
      })
    },
    // 重置
    reset() {
      this.secord = 60
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="scss" scoped>
.forget-code {
  display: flex;
  align-items: center;
  .el-button {
    width: 120px !important;
    margin-left: 20px;
  }
}
</style>
