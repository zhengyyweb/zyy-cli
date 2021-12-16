<template>
  <el-table
    ref="table"
    :border="isBorder"
    :data="tableData"
    :style="{'width':width}"
    height="100%"
    header-cell-class-name="header-1"
    @selection-change="change"
  >
    <template v-for="(item, index) in list">
      <!-- 如果有type属性 就是有多选框 或者index序号 -->
      <el-table-column
        v-if="item.type&&item.type=='selection'"
        :key="index"
        :type="item.type"
        width="55"
        align="center"
      />
      <el-table-column
        v-if="item.type&&item.type=='index'"
        :key="index"
        :type="item.type"
        width="55"
        align="center"
      >
        <template slot="header">
          <span>序号</span>
        </template>
      </el-table-column>
      <!-- 如果有custom属性 说明这列是要自定义的  使用插槽传入 -->
      <slot v-else-if="item.custom" :name="item.prop" />
      <!-- 普通情况 -->
      <el-table-column
        v-else
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        align="center"
      />
    </template>
    <slot name="custom" />
    <slot name="btn" />
  </el-table>
</template>

<script>
export default {
  name: 'ZyTable',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      isBorder: true

    }
  },
  async created() {
    this.isBorder =
      Object.keys(this.$attrs).findIndex((v) => v === 'border') >= 0
  },
  mounted() {},

  methods: {
    handleClick(row) {
      console.log(row)
    },
    change(a) {
      console.log(a)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .header-1{
  background-color: rgba(51, 51, 51,0.05) !important;
  color: #3F5E88 !important;
}
</style>
