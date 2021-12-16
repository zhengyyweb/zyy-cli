<template>
  <div class="projcet-home">
    <el-container>
      <el-main>
        <div class="main-box">
          <div class="main-box-item">
            <p>入组进度</p>
            <div style="height:calc(100% - 60px)">
              <echartComponent
                ref="echartComponentOne"
                :option="optionOne"
                edc="one"
              />
            </div>
          </div>
          <div class="main-box-item">
            <div class="item-top">
              <span>质疑统计</span>
              <el-select
                v-model="querySel"
                placeholder="请选择"
                style="width:200px"
              >
                <el-option
                  v-for="item in querylist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="height:calc(100% - 60px)">
              <echartComponent
                ref="echartComponentTwo"
                :option="optionTwo"
                edc="two"
              />
            </div>
          </div>
          <div class="main-box-item">
            <div class="item-top">
              <span>研究中心</span>
              <el-select
                v-model="querySel"
                placeholder="请选择"
                style="width:200px"
              >
                <el-option
                  v-for="item in querylist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="height:calc(100% - 70px)">
              <echartComponent
                ref="echartComponentThree"
                :option="optionThree"
                edc="three"
              />
            </div>
          </div>
          <div class="main-box-item">
            <div class="item-top">
              <span>研究中心</span>
              <el-select
                v-model="querySel"
                placeholder="请选择"
                style="width:200px"
              >
                <el-option
                  v-for="item in querylist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="height:calc(100% - 70px)">
              <echartComponent
                ref="echartComponentFour"
                :option="optionFour"
                edc="four"
              />
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="284px">
        <div class="aside-box">
          <div class="aside-box-top">
            <p>快捷设置</p>
            <svg-icon icon-class="set" />
          </div>
          <div class="aside-box-centent">
            <p v-for="(item, index) in list" :key="index" class="centent-item">
              <span>{{ item.name }}</span>
            </p>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import echartComponent from '@/components/echarts/index.vue'
import { optionData } from '@/views/project_home/options'
export default {
  name: 'TrialEdcWebAdminProjectHome',
  components: {
    echartComponent
  },
  data() {
    return {
      list: optionData.rightMenu,
      optionOne: {},
      optionTwo: {},
      optionThree: {},
      optionFour: {},
      querylist: [],
      querySel: ''
    }
  },
  created() {
    this.init()
  },
  mounted() {
    window.addEventListener('resize', () => {
      var arr = ['One', 'Two', 'Three', 'Four']
      arr.forEach((v) => {
        this.$refs[`echartComponent${v}`].resize()
      })
    })
  },
  methods: {
    init() {
      this.oneEcharts()
      this.twoEcharts()
      this.threeEcharts(
        optionData.study_center.shadow1,
        optionData.study_center.item1,
        '研究中心'
      )
      this.fourEcharts(
        optionData.study_center.shadow,
        optionData.study_center.item,
        '研究中心'
      )
    },
    oneEcharts() {
      this.optionOne = optionData.barEcharts(
        optionData.group.shadow,
        optionData.group.item,
        optionData.group.data
      )
    },
    twoEcharts() {
      this.optionTwo = optionData.barEcharts(
        optionData.query.shadow,
        optionData.query.item,
        optionData.query.data
      )
    },
    threeEcharts(legend, data) {
      this.optionThree = optionData.pieEcharts(legend, data, '研究中心')
    },
    fourEcharts(legend, data) {
      this.optionFour = optionData.pieEcharts(legend, data, '研究中心')
    }
  }
}
</script>

<style lang="scss" scoped>
.projcet-home {
  background: transparent !important;
  box-shadow: none !important;
  border: 0px !important;
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0 !important;
    padding-right: 30px !important;
    overflow: visible !important;
  }
  .el-aside {
    overflow: visible !important;
  }
  .main-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .main-box-item {
      height: 48.5%;
      background: #ffffff;
      border: 1px solid rgba(198, 207, 220, 0.3);
      border-radius: 16px;
      box-shadow: 0px 2px 8px 0px rgba(186, 186, 186, 0.5);
      .item-top {
        display: flex;
        line-height: 60px;
        align-items: center;
        justify-content: space-between;
        padding: 0 33px;
        span {
          width: 50%;
        }
      }
      p {
        width: 72px;
        height: 60px;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #42618a;
        line-height: 60px;
        margin-left: 33px;
      }
    }
    .main-box-item:nth-of-type(1) {
      width: 58%;
    }
    .main-box-item:nth-of-type(2) {
      width: 40%;
    }
    .main-box-item:nth-of-type(3) {
      width: 40%;
    }
    .main-box-item:nth-of-type(4) {
      width: 58%;
    }
  }
  .aside-box {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .aside-box-top {
    position: relative;
    width: 284px;
    height: 78px;
    line-height: 78px;
    text-align: center;
    background: #fafbff;
    border: 1px solid rgba(64, 95, 136, 0.15);
    border-radius: 16px;
    box-shadow: 0px 2px 16px 0px rgba(217, 219, 229, 0.5);
    margin-bottom: 20px;
    .svg-icon {
      position: absolute;
      right: 25px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: #405f88;
    }
  }
  .aside-box-centent {
    flex: 1;
    width: 284px;
    background: #ffffff;
    border: 1px solid rgba(198, 207, 220, 0.3);
    border-radius: 16px;
    box-shadow: 0px 2px 8px 0px rgba(186, 186, 186, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p {
      width: 236px;
      height: 78px;
      cursor: pointer;
      line-height: 78px;
      text-align: center;
      position: relative;
      background: #fafbff;
      border: 1px solid rgba(64, 95, 136, 0.15);
      border-radius: 8px;
      box-shadow: 0px 2px 16px 0px rgba(217, 219, 229, 0.5);
      overflow: hidden;
    }
    p::after{
       content: '';
      width: 80px;
      display: inline-block;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      left: 100%;
      top: 100%;
      transition: all 0.8s;
      background: rgba(0, 184, 216,.3);
      z-index: 1;
    }
    p:hover::after {
      content: '';
      width: 800px;
      height: 800px;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      left: -110%;
      top: -30%;
      transition: all 0.8s;
      background: rgba(0, 184, 216,.3);
      // animation: animat 2s 1;
      z-index: 1;
    }
    p:hover span {
      position: relative;
      z-index: 99;
    }
  }
}
@keyframes animat {
  0% {
    width: 80px;
    height: 80px;
    left: 100%;
  }
  50% {
    width: 800px;
    height: 800px;
    top: 0%;
    left: -100%;
  }
  100% {
    width: 800px;
    height: 800px;
    top: 20%;
    left: -0%;
  }
}
</style>
