<template>
  <div style="position: relative;">
    <HomeBuilder
      style="height:100%"
      :search-condition="searchCondition"
      label-width="90px"
      :form-search="formSearch"
      @querySearch="querySearch"
    >
      <template #addBtn>
        <div class="addBtn">
          <el-button
            size="mini"
            plain
            style="border:1px solid #008DFF;color:#008DFF"
          >按钮</el-button>
        </div>
      </template>
      <template #table>
        <div style="height:100%">
          <tableComponent :table-data="tableData" :list="tableList" border>
            <template #btn>
              <el-table-column
                fixed="right"
                label="操作"
                min-width="200"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    plain
                    style="border:1px solid #FFA873;color:#FFA873"
                    @click="setRole(scope.row)"
                  >弹框</el-button>
                </template>
              </el-table-column>
            </template>
          </tableComponent>
        </div>
      </template>
    </HomeBuilder>
    <formBuilder
      ref="setRole"
      title="标题"
      :model="model"
      width-d="562px"
      :rules="rules"
      :form-label-width="formLabelWidth"
      :item-list="itemList"
      :callback="setRoleCallback"
    />
  </div>
</template>

<script>
import HomeBuilder from '@/components/HomeBuilder'
import tableComponent from '@/components/TableWrap/table'
import formBuilder from '@/components/DialogForm/dialog_form.vue'
import { invite } from '@/views/center_user/component/form_data'
export default {
  name: 'TrialEdcWebUserHome',
  components: {
    HomeBuilder,
    tableComponent,
    formBuilder
  },

  data() {
    return {
      tableData: [1, 2, 3, 4, 5].map((v) => {
        return {
          name: '王小虎'
        }
      }),
      formLabelWidth: invite.formLabelWidth,
      model: { ...invite.model },
      itemList: invite.itemList,
      rules: {
        index: [{ required: true, message: '请输入', trigger: 'change' }]
      },
      tableList: [
        {
          type: 'index'
        },
        {
          label: '人员姓名',
          prop: 'name',
          width: '100'
        }
      ],
      formSearch: {
        cetner: 1,
        pageNum: 1,
        pageSize: 10
      },
      total: 20,
      searchCondition: [
        {
          type: 'select',
          label: '研究中心',
          prop: 'cetner',
          width: '160px',
          right: '48px',
          list: [
            {
              label: '神州一院',
              value: 1
            }
          ],
          placeholder: '-研究中心-'
        },
        {
          type: 'input',
          label: '受试者编号',
          right: '48px',
          width: '160px',
          prop: 'number',
          placeholder: '请输入受试者编号'
        },
        {
          type: 'input',
          label: '姓名缩写',
          right: '48px',
          width: '160px',
          prop: 'name',
          placeholder: '请输入姓名缩写'
        },
        {
          type: 'select',
          label: '受试者状态',
          prop: 'status',
          width: '160px',
          right: '20px',
          list: [
            { label: '筛选', value: 0 },
            { label: '筛选失败', value: 1 },
            { label: '入组', value: 2 },
            { label: '完成', value: 3 },
            { label: '脱落', value: 4 }
          ],
          placeholder: '-受试者状态-'
        }
      ]
    }
  },
  mounted() {},

  methods: {
    // 查询 获取列表数据
    querySearch(obj) {
      console.log('search', obj)
    },
    setRole() {
      this.model = { ...invite.model }
      this.$refs.setRole.rest('ruleForm')
      this.$refs.setRole.innerVisible = true
    },
    setRoleCallback() {
      const data = {
        ...this.model
      }
      console.log(data)
      this.$refs.addCenter.innerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.addBtn {
  position: absolute;
  right: 50px;
}
</style>
