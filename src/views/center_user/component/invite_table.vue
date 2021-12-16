<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    max-height="350px"
  >
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="name" label="姓名" width="150" />
    <el-table-column prop="phone" label="手机号" min-width="180">
      <template slot-scope="scope">
        <div class="set-center-phone">
          <span>{{ scope.row.phone | phoneFilterW(scope.row.phoneEYE) }}</span>
          <svg-icon
            :icon-class="scope.row.phoneEYE ? 'closeEye' : 'openEye'"
            @click="switchSVG(scope.row,'phone')"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="email" label="邮箱" min-width="200">
      <template slot-scope="scope">
        <div class="set-center-phone">
          <span>{{ scope.row.email | emailFilterW(scope.row.emailEYE) }}</span>
          <svg-icon
            :icon-class="scope.row.emailEYE ? 'closeEye' : 'openEye'"
            @click="switchSVG(scope.row,'email')"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="100" fixed="right">
      <template slot-scope="scope">
        <div class="flex-btn">
          <p @click="setBaseable(scope.$index, scope.row)">移除</p>
          <!-- <p @click="setBaseable(scope.$index, scope.row)">待确认</p> -->
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TrialEdcWebUserAddUser',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  mounted() {},

  methods: {
    setBaseable() {},
    switchSVG(obj, type) {
     type === 'phone' ? obj.phoneEYE = !obj.phoneEYE : obj.emailEYE = !obj.emailEYE
    }
  }
}
</script>

<style lang="scss" scoped>
.set-center-phone {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-btn {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  p {
    color: #008DFF;
    cursor: pointer;
  }
}
</style>
