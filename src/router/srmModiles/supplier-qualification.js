import Layout from "@/layout"
export default {
  path: "/supplier-qualification",
  name: "supplierQualification",
  component: Layout,
  alwaysShow: true,

  redirect: "/supplier-qualification/supplier-quit",
  meta: { title: "供应商资质管理", icon: "el-icon-s-custom", hasRoute: "sys:syssuppliermanage" },
  children: [
    {
      path: "supplier-quit",
      name: "SupplierQuit",
      meta: { title: "供应商退出", hasRoute: "sys:syssupplierout" },
      component: () => import("@/views/supplier-qualification/supplier-quit")
    }
  ]

}
