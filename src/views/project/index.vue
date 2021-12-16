<template>
  <div ref="main" class="temIndex">
    <div ref="search">
      <el-form
        ref="form"
        class="form-flex"
        :model="formSearch"
        label-width="80px"
      >
        <el-form-item label="创建时间:">
          <el-date-picker
            v-model="formSearch.DateCheck"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="--开始日期--"
            end-placeholder="--结束日期--"
          />
        </el-form-item>
        <el-form-item label="项目状态:">
          <el-select
            v-model="formSearch.operationType"
            placeholder="--请选择--"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button
          class="btn-b"
          type="primary"
          @click="querySearch"
        >查询</el-button>
        <el-button
          class="btn-b"
          type="primary"
          @click="addProject"
        >新建项目</el-button>
      </el-form>
    </div>
    <div ref="action" class="action-wrap" />
    <TableWrap>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        :show-header="false"
      >
        <el-table-column prop="a" label="a" min-width="300">
          <template slot-scope="scope">
            <div class="tab-one">
              <span
                :class="[
                  `btn-${
                    scope.row.a < 3 ? 'b' : scope.row.a === 4 ? 'g' : 'c'
                  }`,
                  'tab-status'
                ]"
              >{{ scope.row.a | filterA }}</span>
              <div>申办方：某某某假字科技发展有限公司</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="150" />
        <el-table-column prop="a" label="a" width="150">
          <template>
            <div class="flex-th">
              <p>EDC</p>
              <p>ePRO</p>
              <p>IWRS</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="450" fixed="right">
          <template slot-scope="scope">
            <div class="flex-btn">
              <p @click="setBaseable(scope.$index, scope.row)">建库人员</p>
              <p @click="setProject(scope.$index, scope.row)">项目设置</p>
              <p @click="handleEdit(scope.$index, scope.row)">eCRF设计</p>
              <p @click="handleEdit(scope.$index, scope.row)">发布管理</p>
              <p @click="handleEdit(scope.$index, scope.row)">测试环境</p>
              <p @click="editorProject(scope.$index, scope.row)">编辑</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="formSearch.pageNum"
        :limit.sync="formSearch.pageSize"
        @pagination="getList"
      />
    </TableWrap>
    <dialogForm
      ref="dialogForm"
      title="新建项目"
      :model="model"
      width-d="562px"
      :rules="rules"
      :form-label-width="formLabelWidth"
      :item-list="itemList"
      :callback="submitForm"
    />
  </div>
</template>

<script>
// 表格自适应计算
import TableWrap from '@/components/TableWrap'

// 分页组件
import Pagination from '@/components/pagination'

// 封装的弹出框表单一体组件 传入数据生成表单
import dialogForm from '@/components/DialogForm/dialog_form.vue'

import { addProject } from '@/views/project/component/form_data'

export default {
  name: 'TrialEdcWebUserHome',
  components: {
    Pagination,
    TableWrap,
    dialogForm
  },
  filters: {
    filterA(val) {
      const filterList = [
        '设计中',
        '测试中',
        '测试通过',
        '测试不通过',
        '已上线',
        '已锁库'
      ]
      return filterList[val]
    }
  },

  data() {
    var checkroleName = (rule, value, callback) => {
      if (value) {
        if (/^[0-9a-zA-Z\u4e00-\u9fa5]{1,10}$/.test(value)) {
          callback()
        } else {
          return callback(
            new Error('角色名称长度为1至10位的文字、字母和数字组合')
          )
        }
      } else {
        callback()
      }
    }
    return {
      tableData: [
        {
          a: 1,
          createDate: '2021-12-8',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          a: 2,
          createDate: '2021-12-8',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          a: 3,
          name: '王小虎',
          createDate: '2021-12-8',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          a: 3,
          name: '王小虎',
          createDate: '2021-12-8',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          a: 4,
          name: '王小虎',
          createDate: '2021-12-8',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      formSearch: {},
      total: 20,
      typeList: [],
      options: [],

      formLabelWidth: addProject.formLabelWidth,
      model: { ...addProject.model },
      itemList: addProject.itemList,
      rules: {
        projectID: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectNumber: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectSB: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectWT: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectFullName: [
          { required: true, message: '请输入项目ID', trigger: 'change' },
          { validator: checkroleName, trigger: 'change' }
        ],
        projectStart: [
          { required: true, message: '请输入项目ID', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {},

  methods: {
    querySearch() {},
    getList() {},
    handleEdit() {},

    // 建库人员
    setBaseable() {
      this.$router.push({
        path: '/project_home/set_user'
      })
    },
    // 新增项目
    addProject() {
      this.model = { ...addProject.model }
      this.$refs.dialogForm.rest('ruleForm')
      this.$refs.dialogForm.innerVisible = true
    },
    // 编辑项目
    editorProject() {
       this.model = {
        projectID: 'test',
        projectName: 'test',
        projectNumber: 'test',
        projectSB: 'test',
        projectWT: 'test',
        projectFullName: 'test',
        projectStart: ['EDC']
      }
      this.$refs.dialogForm.innerVisible = true
    },
    // 点击保存校验通过后执行的回调
    submitForm() {
      const data = {
        ...this.model
      }
      console.log(data)
      this.$message.success('新增成功')
      this.$refs.dialogForm.innerVisible = false
      this.$refs.dialogForm.resetForm('ruleForm')
    },
    // 跳转项目设置
    setProject() {
      this.$router.push({
        path: '/project_home/project_set'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.temIndex {
  padding: 24px;
}
.el-button--primary {
  width: 56px;
  padding: 0;
}
.flex-btn {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  p {
    color: #405f88;
    cursor: pointer;
  }
}
.flex-th {
  height: 139px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  p {
    color: #405f88;
    text-align: center;
  }
}
.form-flex {
  display: flex;
  align-items: center;
  .el-form-item {
    height: 38px;
    margin: 0;
    margin-right: 40px;
    label {
      line-height: 28px !important;
    }
    .el-input__inner {
      /deep/.el-range__icon {
        line-height: 22px !important;
      }
      /deep/.el-range-separator {
        line-height: 22px !important;
      }
    }
  }
}
.tab-one {
  .tab-status {
    width: auto;
    color: white;
    text-align: center;
    padding: 2px 10px;
  }
  div {
    margin-top: 16px;
    color: #405f88;
  }
}
</style>
