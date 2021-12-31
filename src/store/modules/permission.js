import { asyncRoutes, constantRoutes, srmRoutes } from "@/router"

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
const filterAsync = (permissionCodesList, srmRoutes) => {
  const arr = []
  permissionCodesList.forEach(permissionCodes => {
    srmRoutes.forEach(route => {
      if (route.meta && route.meta.hasRoute && route.meta.hasRoute === permissionCodes) {
        if (route.children) {
          route.children = filterAsync(permissionCodesList, route.children)
        }
        arr.push(route)
      }
    })
  })
  return arr
}
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // return new Promise(resolve => {
    //   let accessedRoutes
    //   if (roles.includes("admin")) {
    //     accessedRoutes = asyncRoutes || []
    //   } else {
    //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    //   }
    //   commit("SET_ROUTES", accessedRoutes)
    //   resolve(accessedRoutes)
    // })

  },
  getAsyncRouter({ commit }, permissionCodesList) {
    const accessedRoutes = filterAsync(permissionCodesList, srmRoutes)
    commit("SET_ROUTES", [accessedRoutes, ...asyncRoutes])
    return [...constantRoutes, ...asyncRoutes, ...accessedRoutes]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
