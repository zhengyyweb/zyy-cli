<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    top="20vh"
    width="30%"
    center
    @close="handleCancel"
  >
    <el-form ref="formDataRef" :model="formData" :rules="formDataRules">
      <el-form-item label="表单名称: " :label-width="formLabelWidth" prop="name">
        <el-input v-model="formData.name" autocomplete="off" size="mini" />
      </el-form-item>
      <el-form-item label="可否重复: " :label-width="formLabelWidth">
        <el-radio v-model="formData.isRepeat" label="true" size="mini">是</el-radio>
        <el-radio v-model="formData.isRepeat" label="false" size="mini">否</el-radio>
      </el-form-item>
      <el-form-item label="表单说明: " :label-width="formLabelWidth">
        <el-input
          v-model="formData.explain"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          size="mini"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="handleConfirm"
      >保 存</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {

  },
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      type: String,
      default: '添加表单'
    }
  },
  data () {
    return {
      formLabelWidth: '100px',
      formData: {
        name: '',
        isRepeat: false,
        explain: ''
      },
      visible: false,
      formDataRules: {
        name: [
          { required: true, message: '请输入表单名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogVisible(newValue, oldValue) {
      this.visible = newValue
    }
  },
  created() {
    this.visible = this.dialogVisible
  },
  methods: {
    handleReset () {
      this.$refs['formDataRef'].resetFields()
    },
    handleConfirm () {
      this.$refs['formDataRef'].validate((valid) => {
        if (valid) {
          this.visible = false
          this.$emit('closeDialog', 'confirm')
          this.handleReset()
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.$emit('closeDialog')
      this.handleReset()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
