<template>
  <div>
    <myTable
      :page-obj="pageObj"
      :search-list="searchList"
      :async-table-list="asyncTableList"
      :table-header-list="tableHeaderList"
      @searchBtn="getTableList"
    />
  </div>
</template>

<script>
import { getSupplierExit } from "@/api/supplierQualification.js"
import { filterSearch } from "@/utils"
export default {
  data() {
    return {
      searchList: [
        {
          label: "供应商编码",
          value: "",
          props: "supplierCode"

        },
        {
          label: "供应商分类",
          value: "",
          props: "supplierType",
          type: "select",
          options: [{
            label: "全部", value: "" },
          { label: "生产", value: "0" },
          { label: "非生产", value: "1" }
          ]
        },
        {
          label: "供应商绩效等级",
          value: "",
          props: "supplierGrade"

        },
        {
          label: "审核状态",
          value: "",
          props: "status",
          type: "select",
          options: [
            { label: "未审核", value: "0" },
            { label: "审核通过", value: "1" },
            { label: "驳回", value: "2" }
          ]
        }
      ],
      tableHeaderList: [{
        label: "供应商编码",
        value: "supplierCode",
        isFilter: false
      },
      {
        label: "供应商名称",
        value: "supplierName",
        isFilter: false
      },
      {
        label: "供应商类型",
        value: "supplierType",
        isFilter: false
      },
      {
        label: "供应商状态",
        value: "supplierStatus",
        isFilter: false
      },
      {
        label: "供应商绩效等级",
        value: "supplierGrade",
        isFilter: false
      },
      {
        label: "退出原因描述",
        value: "signoutDesc",
        isFilter: false
      }, {
        label: "审核状态",
        value: "reviewerStatus",
        isFilter: false
      }],
      asyncTableList: [],
      pageObj: {
        page: 1,
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40]
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      const obj = filterSearch(this.searchList)
      console.log(obj)
      const { records, total } = await getSupplierExit({
        ...this.pageObj,
        ...obj
      })
      this.pageObj.total = total
      this.asyncTableList = records
    }
  }
}
</script>

<style>

</style>
