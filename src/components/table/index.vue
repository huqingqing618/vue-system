<template>
  <div class="table">
    <el-row :gutter="10" class="my-form">
      <el-form label-width="120px">
        <el-col v-for="(v,i) in searchList" :key="i" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item :label="v.label">
            <el-input v-if="!v.type" v-model="v.value" />
            <el-select v-else-if="v.type==='select'" v-model="v.value" class="select">
              <el-option
                v-for="item in v.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="searchBtn">
        <el-button type="primary" round @click="$emit('searchBtn')">搜索</el-button>
        <el-button type="success" round @click="clearSearch">清空</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table v-loading.fullscreen.lock="loading" min-height="600" border :data="asyncTableList">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            fixed="left"
            width="50"
          />
          <el-table-column
            v-for="(v,i) in tableHeaderList"
            :key="i"
            :prop="v.value"
            :label="v.label"
            align="center"
            :formatter="v.filterFn"
          />
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
          >
            <template v-slot="{row}">
              <el-button v-for="(v,i) in operationList" :key="i" type="primary" size="small" round @click="`$emit('${v.emitName}',${row})`">{{ v.text }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col>
        <el-pagination
          class="pagination"
          :total="pageObj.total"
          :current-page="pageObj.page"
          :page-size="pageObj.pageSize"
          :page-sizes="pageObj.pageSizes"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      // required: true,
      default: () => [
        {
          label: "供应商",
          value: "supperCode"
        },
        {
          label: "订单号",
          value: "code"
        },
        {
          label: "姓名",
          value: "name"
        },
        {
          label: "年龄",
          value: "age"
        },
        {
          label: "地址",
          value: "adress"
        }
      ]
    },
    pageObj: {
      type: Object,
      default: () => {
        return {
          page: 1,
          total: 21,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40]
        }
      }
    },
    tableHeaderList: {
      type: Array,
      default: () => [
        {
          label: "供应商",
          value: "supperCode",
          isFilter: false
        },
        {
          label: "订单号",
          value: "code",
          isFilter: false
        },
        {
          label: "姓名",
          value: "name",
          isFilter: false
        },
        {
          label: "年龄",
          value: "age",
          isFilter: true,
          filterFn: ({ age }) => age
        },
        {
          label: "地址",
          value: "adress",
          isFilter: false
        }
      ]
    },
    asyncTableList: {
      type: Array,
      default: () => [{
        supperCode: "18890",
        code: "999",
        name: "hu",
        age: 21,
        adress: "河南省"
      }]
    },
    operationList: {
      type: Array,
      default: () => [{
        text: "编辑",
        emitName: "editBtn"
      }]
    }
  },
  data() {
    return {
      list: [],
      loading: true
    }
  },
  computed: {
    tableList() {
      return this.asyncTableList
    }
  },
  created() {
    const arr = new Array(10)
    arr.fill({ ...this.asyncTableList[0] })
    this.list = arr
    this.loading = false
  },
  methods: {
    clearSearch() {
      this.searchList.forEach(item => {
        item.value = ""
      })
    },

    handleSizeChange(val) {
      const pageObj = {
        ...pageObj,
        pageSize: val
      }
      this.$emit("pageChange", pageObj)
    },
    handleCurrentChange(val) {
      const pageObj = {
        ...pageObj,
        page: val
      }
      this.$emit("pageChange", pageObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
    margin: 10px;
    padding: 20px;
    min-height: calc(100vh - 120px);
    .my-form{
      margin-bottom: 10px;
      .select{
        width: 100%;
      }
    }
   .searchBtn{
      text-align: center;
    }
    .pagination{
      text-align: right;
      padding-top: 10px;
    }
}
@media screen and(max-width:1920px){
  .searchBtn{
    .el-button--medium.is-round{
      padding: 10px 20px;
    }
  }
}
@media screen and(max-width:1200px){

}
@media screen and(max-width:992px){
.searchBtn{
    .el-button--medium.is-round{
      padding: 8px 18px;
    }
  }
}

@media screen and(max-width:768px){
.searchBtn{
  margin-bottom: 10px;
    .el-button--medium.is-round{
      padding: 5px 15px;
      ::v-deep span{
        font-size: 12px;
      }
    }
  }
}

</style>

