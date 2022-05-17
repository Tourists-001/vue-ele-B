<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb>
      <el-dropdown @command="handleCommand">
        <img :src="baseImgPath + adminInfo.avatar" class="avatar" />
        <el-dropdown-menu slot="dropdown" style="marginright: 20px">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-breadcrumb>
  </div>
</template>

<script>
import { baseImgPath } from "@/config/env";
import { mapActions, mapState } from "vuex";
import { signout } from "@/api/user";
export default {
  name: "headTop",
  data() {
    return {
      baseImgPath,
    };
  },
  created() {
    if (!this.adminInfo.id) {
      this.getAdminData();
    }
  },
  computed: {
    ...mapState(["adminInfo"]),
  },
  methods: {
    ...mapActions(["getAdminData"]),
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/manage");
      } else if (command == "signout") {
        const res = await signout();
        if (res.status === 1) {
          this.$message({
            type: "success",
            message: res.success,
          });
          this.$router.push("/");
        }
      } else {
        this.$message({
          type: "error",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style lang="less">
@import "@/style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avatar {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
