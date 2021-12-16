<template>
  <el-dialog
    width="900px"
    :title="title"
    :visible.sync="innerVisible"
    append-to-body
    @close="close"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="搜索添加" name="first" />
      <el-tab-pane label="邀请添加" name="second" />
    </el-tabs>
    <div v-if="activeName === 'first'" class="add-search">
      <div>已有账号的用户可以通过搜索添加</div>
      <div class="set-center-top">
        <el-input v-model="name" placeholder="输入用户名、姓名、手机号、邮箱" />
        <el-button
          style="margin-left: 8px"
          type="primary"
          class="btn-b"
        >查询</el-button>
      </div>
      <addUser :table-data="tableData" />
    </div>
    <div v-if="activeName === 'second'" class="add-search">
      <div class="t2">没有账号的用户可以通过邀请链接添加</div>
      <div class="set-center-top second-c">
        <el-input v-model="name" placeholder="邀请链接" />
        <el-button
          style="margin-left: 8px"
          type="primary"
          class="btn-b"
        >复制链接</el-button>
      </div>
      <div class="t3" style="font-size:12px;margin-bottom:32px;">通过微信或QQ把邀请链接发给邀请对象</div>
      <div class="invite t1">
        <div v-for="(item,index) in addList" :key="index" class="invite-item">
          <el-input v-model="item.name" placeholder="输入手机或者邮箱号" />
          <img :src="index > 0 ? require('@/assets/image/delete.png') : require('@/assets/image/add.png')" alt="" @click="addBtnClose(index)">
        </div>
        <el-button type="primary">发送邀请</el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn-b" type="primary" @click="submitForm()">确 认</el-button>
      <el-button type="primary btn-d" @click="resetForm()">取 消</el-button>
      <span v-if="activeName === 'first'" class="checkUser">本次已邀请2个人</span>
    </span>
  </el-dialog>
</template>

<script>
import addUser from '@/views/project/component/add_user'
export default {
  components: { addUser },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      addList: [
        {
          name: ''
        }
      ],
      activeName: 'first',
      innerVisible: false,
      tableData: [
          {
          username: '王小虎',
          phoneEYE: true,
          emailEYE: true,
          name: '王小虎',
          phone: '18503580374',
          email: '1164033143@qq.com'
        },
        {
          username: '王小虎',
          emailEYE: true,
          phoneEYE: true,
          name: '王小虎',
          phone: '18503580374',
          email: '1164033143@qq.com'
        },
        {
          username: '王小虎',
          emailEYE: true,
          phoneEYE: true,
          name: '王小虎',
          phone: '18503580374',
          email: '1164033143@qq.com'
        },
        {
          username: '王小虎',
          emailEYE: true,
          phoneEYE: true,
          name: '王小虎',
          phone: '18503580374',
          email: '1164033143@qq.com'
        }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.innerVisible = false
    },
    // 添加或者删除
    addBtnClose(idx) {
      if (idx === 0) {
        this.addList.push({
          name: ''
        })
        return
      }
      this.addList.splice(idx, 1)
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
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  width: 51px;
  height: 30px;
  padding: 0;
  border-radius: 14px !important;
}
.t1{
  margin-left: 220px;
}
.t2{
  margin-left: 260px;
}
.t3{
  margin-left: 270px;
}
.add-search {
  width: 100%;
  // text-align: center;
  font-size: 14px;
  div {
    color: #333333;
  }

  .set-center-top {
    display: flex;
    width: 60%;
    margin: auto;
    margin-bottom: 32px;
    margin-top: 8px;
  }
}
.second-c{
   margin-bottom: 8px !important;
}
.el-button--primary {
  border: 0px solid #333333 !important;
}
.el-dialog__footer{
  position: relative !important;
  .dialog-footer{
    display: inline-block;
    text-align: left;
    width: 232px;
  }

  .checkUser{
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
    color: #1696FF;
    font-size: 14px;
  }
}
.invite{
  width: 40%;
  text-align: center;
  .el-button--primary{
    width: 96px;
    height: 24px;
    background-color: white;
    color: #008dff;
    border: 1px solid #008dff !important;
    border-radius: 24px;
  }
  .invite-item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img{
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }
}
</style>
