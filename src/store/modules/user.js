import { login, logout, getInfo } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
import router, { resetRouter } from "@/router"

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  userInfo: {},
  jurisdictionList: []// 权限路由
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  setUserInfo(state, obj) {
    state.userInfo = obj
  },
  setJurisdictionList(state, jurisdictionList) {
    state.jurisdictionList = jurisdictionList
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ username: username.trim(), password: password })
    commit("SET_TOKEN", res.token)
    setToken(res.token)
    // console.log(res)
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit("SET_TOKEN", data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  async getInfo({ commit, state }) {
    try {
      const res = await getInfo(state.token)
      if (res.id) {
        // const { nickname: name, permissionCodes: roles } = res
        // commit("SET_ROLES", res.permissionCodes)
        // commit("SET_AVATAR", res)
        commit("SET_NAME", res.nickname)
        commit("setJurisdictionList", res.permissionCodes)
        commit("setUserInfo", res)
      }
      return res
    } catch (err) {
      return err
    }
    // commit("SET_INTRODUCTION", introduction)
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       reject("Verification failed, please Login again.")
    //     }

    //     const { roles, name, avatar, introduction } = data

    //     // roles must be a non-empty array
    //     if (!roles || roles.length <= 0) {
    //       reject("getInfo: roles must be a non-null array!")
    //     }

    //     commit("SET_ROLES", roles)
    //     commit("SET_NAME", name)
    //     commit("SET_AVATAR", avatar)
    //     commit("SET_INTRODUCTION", introduction)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit("SET_TOKEN", "")
        commit("SET_ROLES", [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch("tagsView/delAllViews", null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "")
      commit("SET_ROLES", [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token"

    commit("SET_TOKEN", token)
    setToken(token)

    const { roles } = await dispatch("getInfo")

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
