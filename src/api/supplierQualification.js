import request from "@/utils/request"

export const getSupplierExit = (data) => {
  return request({
    url: "sysSupplierSignout/getPageList",
    method: "POST",
    data
  })
}
