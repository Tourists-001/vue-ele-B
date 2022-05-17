<template>
  <div class="fillcontain">
    <headTop></headTop>
    <div class="table_container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column
          property="registe_time"
          label="注册日期"
          width="220"
        ></el-table-column>
        <el-table-column
          property="username"
          label="用户姓名"
          width="220"
        ></el-table-column>
        <el-table-column property="city" label="注册地址"> </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserCount } from "@/api/dasboard";
import { getUserList } from "@/api/dataList";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const countData = await getUserCount();
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          new Error("获取数据失败");
        }
        this.getUser();
      } catch (err) {
        console.log(err);
      }
    },
    async getUser() {
      const user = await getUserList({
        offset: this.offset,
        limit: this.limit,
      });
      console.log(user);
      this.tableData = [];
      user.forEach((item) => {
        const tableData = {};
        tableData.username = item.username;
        tableData.registe_time = item.registe_time;
        tableData.city = item.city;
        this.tableData.push(tableData);
      });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUser();
    },
  },
};
</script>

<style></style>
