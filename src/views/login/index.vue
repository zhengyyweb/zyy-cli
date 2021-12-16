<template>
  <div class="login" @keydown.enter="submitForm('loginForm')">
    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideInRight"
    >
      <component :is="componetName" class="animated" />
    </transition>
  </div>
</template>

<script>

import forget from '@/views/login/component/forget'
import login from '@/views/login/component/login'
import register from '@/views/login/component/register'
export default {
  components: { forget, login, register },
  data() {
    return {
      componetName: 'login'
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>

.login {
  width: 100%;
  height: 100%;
  background-color: #233554;
  background-image: url(../../assets/image/login_bg.png);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
