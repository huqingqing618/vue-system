<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="$store.state.settings.menuBg"
        :text-color="settings.menuText"
        :unique-opened="false"
        :active-text-color="settings.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Logo from "./Logo"
import SidebarItem from "./SidebarItem"
// import variables from "@/styles/variables.scss"
const settings = require("@/settings.js")
const { menuBg } = settings
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      "permission_routes",
      "sidebar"
    ]),
    // ...mapState(["settings"]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // variables() {
    //   return variables
    // },
    settings: {
      get() {
        return settings
      },
      set(val) {
        console.log(val)
      }
    },
    menuBg() {
      return menuBg
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
