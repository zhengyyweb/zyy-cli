<template>
  <div class="template" style="height:100%">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'TrialEdcWebUserTemplate',

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.template>div{
  height: 100%;
}
</style>