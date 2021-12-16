<template>
  <div style="position: relative;">
    <HomeBuilder
      style="height:100%"
      :search-condition="searchCondition"
      :form-search="formSearch"
      @querySearch="querySearch"
    >
      <template #addBtn>
        <div class="addBtn">
          <el-button
            size="mini"
            plain
            style="border:1px solid #008DFF;color:#008DFF"
          >新增受试者</el-button>
        </div>
      </template>
      <template #table>
        <div style="height:100%">
          <tableComponent :table-data="tableData" :list="tableList" border>
            <template #custom>
              <el-table-column label="账号状态" align="center" width="94">
                <template slot-scope="scope">
                  {{ scope.row.status||'' }}
                </template>
              </el-table-column>
              <el-table-column
                label="邀请状态"
                prop="stateY"
                align="center"
                width="94"
              >
                <template slot-scope="scope">
                  {{ scope.row.stateY }}
                </template>
              </el-table-column>
            </template>
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
                    style="border:1px solid #008DFF;color:#008DFF"
                  >查看</el-button>
                  <el-button
                    size="mini"
                    plain
                    style="border:1px solid #FFA873;color:#FFA873"
                    @click="setRole(scope.row)"
                  >设置角色</el-button>
                </template>
              </el-table-column>
            </template>
          </tableComponent>
        </div>
      </template>
    </HomeBuilder>
    <formBuilder
      ref="setRole"
      title="设置角色"
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
          username: 1,
          createDate: '2021-12-8',
          name: '王小虎',
          phone: '18503580374',
          email: '1164033143@qq.com',
          role: 'PI   CRC   DM',
          stateY: '待确认'
        }
      }),
      formLabelWidth: invite.formLabelWidth,
      model: { ...invite.model },
      itemList: invite.itemList,
      rules: {
        projectID: [
          { required: true, message: '请输入项目ID', trigger: 'change' }
        ]
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
        pageNum: 1,
        pageSize: 10
      },
      total: 20,
      searchCondition: [
        {
          type: 'input',
          label: '',
          right: '100px',
          width: '311px',
          prop: 'text',
          placeholder: '请输入中心名称/中心编号进行搜索'
        },
        {
          type: 'select',
          label: '',
          prop: 'status',
          width: '160px',

          right: '20px',
          list: [],
          placeholder: '-账号状态-'
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
