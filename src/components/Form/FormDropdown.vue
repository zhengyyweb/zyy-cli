<template>
  <el-dropdown
    class="fr"
    style="height: 20px"
    trigger="click"
    :hide-on-click="false"
  >
    <span class="el-dropdown-link">
      <i class="el-icon-more" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-popconfirm
          style="width: unset"
          title="您确定要删除该表单吗？"
          @onConfirm="formDelete(item, formItem)"
        >
          <i
            slot="reference"
            class="iconfont icon-shanchu"
            title="删除"
            style="cursor: pointer"
          >
            <span
              style="
                margin-left: 5px;
                font-size: 14px;
                color: #606266;
                font-weight: 500;
              "
              >删除</span
            ></i
          >
        </el-popconfirm>
      </el-dropdown-item>
      <el-dropdown-item>
        <i
          class="iconfont icon-shezhi"
          title="编辑表单"
          style="cursor: pointer"
          @click="formEdit(formItem)"
        >
          <span
            style="
              margin-left: 5px;
              font-size: 14px;
              color: #606266;
              font-weight: 500;
            "
            >设置</span
          ></i
        >
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { deleteForm } from '@/api/ecrfApi.js'
export default {
  components: {

  },
  props: {
    formItem: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
        // 设置表单
    formEdit (item) {
      this.$emit('editForm', this.formItem)
    },
    // 删除表单
    formDelete (item, formItem) {
      const postData = {
        registryEntityCode: this.$route.query.code,
        sectionCode: formItem.code,
        versionCode: JSON.parse(localStorage.getItem('versionCode'))
      }
      deleteForm(postData).then(res => {
        this.$message.success('删除表单')
        // this.getVisitList()
        // this.$errInfo(res.data, 'success')
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
