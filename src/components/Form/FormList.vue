<template>
  <div class="formlist_home_wrap">
    <!-- <el-scrollbar> -->
    <!-- :list="formList" -->
    <draggable
      v-model="formList"
      class=""
      @change="draggableLog(formList)"
    >
      <div
        v-for="(item, index) in formList"
        :key="index"
        class="formItemCommonClass"
      >
        <span
          style="cursor: pointer; display: inline-block;"
          @click="toFormEdit(item)"
        >{{ item.name }}</span>
        <Dropdown :form-item="item.name" @editForm="editForm" />
      </div>
    </draggable>
    <div class="formItemCommonClass addFormList" @click="addFormList">
      添加表单
    </div>
    <div class="systemForm">
      <div class="formItemCommonClass patientInfo">
        <span
          style="cursor: pointer; display: inline-block;"
          @click="toFormEdit('a')"
        >受试者信息</span>
        <Dropdown form-item="patientInfo" @editForm="editForm" />
      </div>
      <div class="formItemCommonClass visitInfo">
        <span
          style="cursor: pointer; display: inline-block;"
          @click="toFormEdit('b')"
        >访视信息</span>
        <Dropdown form-item="visitInfo" @editForm="editForm" />
      </div>
    </div>
    <!-- </el-scrollbar> -->
    <AddFormDialog :title="dialogTitle" :dialog-visible="formDialogVisible" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Dropdown from '@/components/Form/FormDropdown.vue'
import AddFormDialog from '@/components/Form/Dialog/AddFormDialog.vue'
import ecrfApi from '@/api/ecrfApi.js'
export default {
  components: {
    draggable,
    Dropdown,
    AddFormDialog
  },
  props: {
    formList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 表单编辑弹窗
      formDialogVisible: false,
      dialogTitle: '添加表单'
    }
  },
  methods: {
    // 拖拽函数
    draggableLog (listData) {
      const data = []
      listData.forEach((item, index) => {
        const obj = {}
        obj.registryEntityCode = item.registryEntityCode
        obj.code = item.code
        obj.displayOrder = index + 1
        data.push(obj)
      })
      ecrfApi.sortForm(data).then(res => {
        this.$message({
          type: 'success',
          showClose: true,
          message: '顺序更新成功',
          center: true
        })
      })
    },
    // 点击表单进入表单设计页面
    toFormEdit (item) {
      // this.$router.push({pth: '/form'})
      // localStorage.removeItem('fullPath')
      // this.$router.push({
      //   name: 'design',
      //   query: {
      //     sectionCode: item.code,
      //     registryEntityCode: this.$route.query.code,
      //     name: item.displayNameCn,
      //     selectionType: item.selectionType,
      //     parentCode: item.parentCode,
      //     patientId: item.patientId,
      //     repeatNum: item.repeatNum
      //   }
      // })
    },

    // 添加表单-弹窗
    addFormList () {
      this.dialogTitle = '添加表单'
      this.formDialogVisible = true
    },
    // 编辑表单-弹窗
    editForm (params) {
      console.warn('params: ', params)
      this.dialogTitle = '编辑表单'
      this.formDialogVisible = true
    },
    // 关闭新增、编辑表单弹窗
    closeDialog (flag) {
      this.formDialogVisible = false
      if (flag === 'confirm') {
        // 提交成功触发上级元素添加表单项
        this.$emit('addFormList')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.formlist_home_wrap {
  // height: 100%;
  /deep/ .el-scrollbar__wrap {
    margin-right: 0px !important;
    overflow: auto;
  }
  .addFormList {
    cursor: pointer;
    background: linear-gradient(270deg,#07c4ff, #0366fb);
    border-radius: 4px;
  }
  .formItemCommonClass {
    margin-bottom: 16px;
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 4px;
    text-align: center;
    .el-dropdown {
      height: 40px !important;
      transform: rotate(90deg);
    }
  }
}
</style>
