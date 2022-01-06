<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import SwitchRoles from "./components/SwitchRoles"

export default {
  name: "PagePermission",
  components: { SwitchRoles },
  data() {
    return {
      imageUrl: ""
    }
  },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: "/permission/index?" + +new Date() })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload(file) {
      console.log(file)
    }
  }
}
</script>
