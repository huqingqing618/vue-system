import router from "./router"
import store from "./store"
// import { Message } from "element-ui"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from "@/utils/auth"
import getPageTitle from "@/utils/get-page-title"
const { whiteList } = require("@/settings.js")

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === "/login") {
      next("/")
    } else {
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const userInfo = store.getters.userInfo
      if (!userInfo.id) {
        const user = await store.dispatch("user/getInfo")
        // 获取异步路由
        const accessRoutes = await store.dispatch("permission/getAsyncRouter", user?.permissionCodes)
        console.log(accessRoutes)
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
        NProgress.done()
      } else {
        next()
      }
      //   // determine whether the user has obtained his permission roles through getInfo
      //   const hasRoles = store.getters.roles && store.getters.roles.length > 0
      //   if (hasRoles) {
      //     next()
      //   } else {
      //     try {
      //       // get user info
      //       // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      //       const { roles } = await store.dispatch("user/getInfo")

      //       // generate accessible routes map based on roles
      //       const accessRoutes = await store.dispatch("permission/generateRoutes", roles)

      //       // dynamically add accessible routes
      //       router.addRoutes(accessRoutes)

    //       // hack method to ensure that addRoutes is complete
    //       // set the replace: true, so the navigation will not leave a history record
    //       next({ ...to, replace: true })
    //     } catch (error) {
    //       // remove token and go to login page to re-login
    //       await store.dispatch("user/resetToken")
    //       Message.error(error || "Has Error")
    //       next(`/login?redirect=${to.path}`)
    //       NProgress.done()
    //     }
    //   }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
