<template>
  <div :id="edc" class="canvas" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'TrialEdcWebAdminEcharts',
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    edc: {
      type: String,
      default: 'edc'
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  created() {},
  mounted() {
    this.init()
  },

  methods: {
    resize() {
      this.myChart.resize()
    },
    init() {
      var chartDom = document.getElementById(this.edc)
      this.myChart = echarts.init(chartDom)
      this.option && this.myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
}
</style>
