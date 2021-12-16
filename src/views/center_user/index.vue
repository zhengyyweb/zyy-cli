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
            @click="inviteUser"
          >邀请人员</el-button>
        </div>
      </template>
      <template #table>
        <div style="height:100%">
          <div class="center-user-box">
            <div class="center-user-left">
              <div class="left-top">中心列表（12）</div>
              <div class="left-centent">
                <div
                  v-for="(item, index) in centerList"
                  :key="index"
                  class="left-item"
                >
                  <div class="left-item-top">
                    <p>{{ item.title }}</p>
                    <div>{{ item.status }}</div>
                  </div>
                  <div class="left-item-bot">
                    <p>{{ item.number }}</p>
                    <p>{{ item.people }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="center-user-right">
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
          </div>
        </div>
      </template>
    </HomeBuilder>
    <div class="addCenter">
      <el-button
        size="mini"
        plain
        style="border:1px solid #008DFF;color:#008DFF"
        @click="addCenter"
      >+ 新增中心</el-button>
    </div>

    <addDialog ref="addDialog" title="邀请人员" />
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
    <formBuilder
      ref="addCenter"
      title="新增中心"
      :model="addCenterModel"
      width-d="562px"
      :rules="rules"
      :form-label-width="formLabelWidth"
      :item-list="addCenterList"
      :callback="addCenterCallback"
    />
  </div>
</template>

<script>
import HomeBuilder from '@/components/HomeBuilder'
import tableComponent from '@/components/TableWrap/table'
import addDialog from '@/views/center_user/component/inviteDialog'
import formBuilder from '@/components/DialogForm/dialog_form.vue'
import { invite } from '@/views/center_user/component/form_data'
export default {
  name: 'TrialEdcWebUserHome',
  components: {
    HomeBuilder,
    tableComponent,
    addDialog,
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
      addCenterModel: { ...invite.addCenterModel },
      itemList: invite.itemList,
      addCenterList: invite.addCenterList,
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
        },
        {
          label: '用户名',
          prop: 'username',
          width: '120'
        },
        {
          label: '手机号',
          prop: 'phone',
          width: '132'
        },
        {
          label: '邮箱',
          prop: 'email',
          width: '203'
        },
        {
          label: '角色',
          prop: 'role',
          width: '158'
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
          prop: 'center',
          right: '20px',
          width: '160px',
          list: [],
          placeholder: '-所属中心-'
        },
        {
          type: 'select',
          label: '',
          prop: 'role',
          right: '20px',
          width: '160px',

          list: [],
          placeholder: '-角色-'
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
      ],
      typeList: [],
      options: [],
      centerList: ['一', '二', '三', '四', '五', '六', '七'].map((v) => {
        return {
          title: `神州${v}院`,
          status: '未激活',
          number: '中心编号：001',
          people: '计划人数：500'
        }
      })
    }
  },
  mounted() {},

  methods: {
    // 查询 获取列表数据
    querySearch(obj) {
      console.log('search', obj)
    },
    // 邀请人员
    inviteUser() {
      this.$refs.addDialog.innerVisible = true
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
    },
    // 新增中心
    addCenter() {
      this.addCenterModel = { ...invite.addCenterModel }
      this.$refs.addCenter.rest('ruleForm')
      this.$refs.addCenter.innerVisible = true
    },
    addCenterCallback() {
        const data = {
        ...this.addCenterModel
      }
      console.log(data)
      this.$refs.addCenter.innerVisible = false
    },
    getList() {},
    handleEdit() {},

    // 建库人员
    setBaseable() {
      this.$router.push({
        path: '/project_home/set_user'
      })
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
.addCenter {
  position: absolute;
  width: 312px;
  left: 22px;
  bottom: 20px;
  .el-button {
    width: 100%;
  }
}
.center-user-box {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left-centent {
    height: calc(100% - 52px);
    overflow: auto;
  }
  .center-user-left {
    width: 312px;
    height: 100%;
    border: 1px solid rgba(51, 51, 51, 0.1);
    margin-right: 13px;
    .left-top {
      width: 312px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      color: #3f5e88;
      background: rgba(51, 51, 51, 0.05);
    }
    .left-item {
      width: 100%;
      height: 104px;
      border-bottom: 1px solid rgba(51, 51, 51, 0.1);
      padding: 22px 17px;
      .left-item-top {
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        div {
          width: 96px;
          height: 33px;
          line-height: 33px;
          text-align: center;
          font-size: 14px;
          background: rgba(51, 51, 51, 0.05);
          color: #999999;
          border: 1px solid rgba(51, 51, 51, 0.05);
          border-radius: 4px;
        }
      }
      .left-item-bot {
        display: flex;
        color: #4e4e4e;
        align-items: center;
        font-size: 14px;
        justify-content: space-between;
      }
    }
  }
  .center-user-right {
    flex: 1;
    width: calc(100% - 330px);
    height: 100%;
  }
}
.addBtn {
  position: absolute;
  right: 50px;
}
</style>
