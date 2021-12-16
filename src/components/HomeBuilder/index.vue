<template>
  <div ref="main" class="temIndex">
    <div ref="search">
      <el-form ref="form" class="form-flex" :model="formSearch" :label-width="labelWidth">
        <template v-for="(col,index) in searchCondition">
          <el-form-item
            :key="index"
            :label="col.label"
            :style="{ 'margin-right': col.right || '0px' }"
          >
            <el-input
              v-if="col.type === 'input'"
              v-model="formSearch[col.prop]"
              :style="{ 'width': col.width || '200px' }"
              :placeholder="col.placeholder"
            />
            <el-select
              v-if="col.type === 'select'"
              v-model="formSearch[col.prop]"
              :style="{ 'width': col.width || '200px' }"
              placeholder="--请选择--"
            >
              <el-option
                v-for="a in col.list"
                :key="a.value"
                :label="a.label"
                :value="a.value"
              />
            </el-select>
            <el-date-picker
              v-if="col.type === 'datePicker'"
              v-model="formSearch[col.prop]"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="--开始日期--"
              end-placeholder="--结束日期--"
            />
          </el-form-item>
        </template>
        <el-button
          class="btn-b"
          type="primary"
          @click="querySearch"
        >查询</el-button>
        <slot name="addBtn" />
      </el-form>
    </div>
    <div ref="action" class="action-wrap" />
    <TableWrap>
      <slot name="table" />
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="formSearch.pageNum"
        :limit.sync="formSearch.pageSize"
        @pagination="getList"
      />
    </TableWrap>
  </div>
</template>

<script>
// 表格自适应计算
import TableWrap from '@/components/TableWrap'

// 分页组件
import Pagination from '@/components/pagination'

export default {
  name: 'TrialEdcWebUserHome',
  components: {
    Pagination,
    TableWrap
  },
  props: {
    searchCondition: {
      type: Array,
      default() {
        return []
      }
    },
    getTableData: {
      type: Function,
      default: () => {}
    },
    formSearch: {
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '0px'
    }
  },
  data() {
    return {
      total: 10
    }
  },
  mounted() {},

  methods: {
    querySearch() {
      this.$emit('querySearch', this.formSearch)
    },
    getList(v) {
      this.querySearch(v)
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
  flex-wrap: wrap;
  align-content: space-between;
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
