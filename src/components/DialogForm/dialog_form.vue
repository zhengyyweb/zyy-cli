<template>
  <el-dialog
    :width="widthD"
    :title="title"
    :visible.sync="innerVisible"
    append-to-body
    class="access-Dialog"
    @close="close"
  >
    <el-form
      ref="ruleForm"
      :model="model"
      :rules="rules"
      label-width="200px"
      class="demo-ruleForm"
    >
      <template v-for="(item, index) in itemList">
        <el-form-item
          :key="index"
          :label="item.label"
          :label-width="formLabelWidth"
          :prop="item.prop"
        >
          <el-input
            v-if="item.type === 'input'"
            v-model.trim="model[item.prop]"
            :disabled="item.disabled"
            autocomplete="off"
            :placeholder="item.placeholder"
          />
          <div
            v-if="item.type === 'input' && item.tips"
            class="input_tips_class"
          >
            <span>{{ item.tips }}</span>
          </div>
          <!-- 需要自定义表单项 需要传入slot项 以及slotname -->
          <slot v-if="item.type === 'slot'" :name="item.slot" :model="model" />

          <!-- 多选框组 -->
          <el-checkbox-group
            v-if="item.type === 'checkBox'"
            v-model="model[item.prop]"
          >
            <el-checkbox
              v-for="a in item.list"
              :key="a.name"
              :label="a.label"
              :name="a.name"
            />
          </el-checkbox-group>

          <!-- 单选框组 -->
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="model[item.prop]"
          >
            <el-radio v-for="a in item.list" :key="a.name" :label="a.label">{{ a.name }}</el-radio>
          </el-radio-group>

          <!-- 下拉框 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="model[item.prop]"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="a in item.list"
              :key="a.value"
              :label="a.label"
              :value="a.value"
            />
          </el-select>
          <!-- 文本域 -->
          <el-input
            v-if="item.type === 'textArea'"
            v-model="model[item.prop]"
            :disabled="item.disabled"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="item.placeholder"
            size="mini"
          />
        </el-form-item>
      </template>
    </el-form>
    <slot name="curstom" />
    <slot />
    <span slot="footer" class="dialog-footer">
      <el-button
        class="btn-b"
        type="primary"
        @click="submitForm('ruleForm', callback)"
      >{{ btnName }}</el-button>
      <slot name="btn" />
      <el-button
        class="btn-d"
        type="primary"
        @click="resetForm('ruleForm')"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * @param props 父组件需要传的参数
 * @param {String} title 弹出框标题
 * @param {Function} callback 保存并且校验通过的回调 ####
 * @param {Object} model 表单绑定的字段
 * @param {Object} rules 校验规则
 * @param {Array} itemList 表单项
 * @param {String} formLabelWidth label宽度-
 */
export default {
  components: {},
  props: {
    widthD: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: () => {}
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    formLabelWidth: {
      type: String,
      default: '120px'
    },
    btnName: {
      type: String,
      default: '保 存'
    },
    itemList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      innerVisible: false
    }
  },
  created() {
    console.log(this.model)
  },
  methods: {
    submitForm(formName, callback) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.innerVisible = false
      this.rest(formName)
    },
    rest(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    },
    close() {
      this.resetForm('ruleForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  width: 128px;
  height: 32px;
  padding: 0;
  border-radius: 14px !important;
}
.el-button--primary {
  border: 0px solid #333333 !important;
}
.input_tips_class {
  line-height: 17px;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #333333;
}
.dialog-footer {
  margin-top: 64px;
}
.access-Dialog {
  /deep/ .el-input__inner {
    border-radius: 4px !important;
  }
  /deep/ .el-dialog__body {
    padding-right: 78px;
  }
  /deep/ .el-form-item__label {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: right;
    color: #333333;
  }
}
</style>
