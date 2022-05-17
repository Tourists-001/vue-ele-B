<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col
        :span="4"
        style="min-height: 100%; background-color: #324057; text-color: 14px"
        text-color="#fff"
      >
        <el-menu
          :default-active="defaultActive"
          active-text-color="#20a0ff"
          text-color="#fff"
          background-color="#324057"
          router
        >
          <el-menu-item index="manage">
            <i class="el-icon-menu">首页</i>
          </el-menu-item>
          <el-submenu index="2" style="width: 100%">
            <template slot="title">
              <i class="el-icon-document">数据管理</i>
            </template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">单家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus">添加数据</i>
            </template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on">图表</i>
            </template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit">编辑</i>
            </template>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting">设置</i>
            </template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning">说明</i>
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style lang="less">
@import "@/style/mixin";
* {
  font-size: 14px !important;
}
.el-submenu__title i {
  color: #bfcbd9 !important;
  font-size: 14px !important;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
</style>
