<template>
  <div>
    <headTop></headTop>
    <card title="总访问量" content="2442"></card>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="6"
          ><div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ userCount }}</span> 新增用户
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ orderCount }}</span> 新增订单
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ adminCount }}</span>
            新增管理员
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ allUserCount }}</span>
            注册用户
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ allOrderCount }}</span> 订单
          </div></el-col
        >
        <el-col :span="6"
          ><div class="data_list">
            <span class="data_num">{{ allAdminCount }}</span> 管理员
          </div></el-col
        >
      </el-row>
    </section>
    <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>
  </div>
</template>

<script>
import card from "./components/card.vue";
import tendency from "./components/tendency.vue";
import dtime from "time-formater";
import {
  userCount,
  orderCount,
  adminDayCount,
  getUserCount,
  getOrderCount,
  adminCount,
} from "@/api/dasboard";
export default {
  components: {
    card,
    tendency,
  },
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[], [], []],
    };
  },
  mounted() {
    this.initData();
    // 今天的前七天的日期
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format(
        "YYYY-MM-DD"
      );
      this.sevenDay.push(date);
    }
    this.getSevenDate();
  },
  methods: {
    async initData() {
      const today = dtime().format("YYYY-MM-DD");
      Promise.all([
        userCount(today),
        orderCount(today),
        adminDayCount(today),
        getUserCount(),
        getOrderCount(),
        adminCount(),
      ])
        .then((res) => {
          this.userCount = res[0].count;
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count;
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取七天的数据
    async getSevenDate() {
      const apiArr = [[], [], []];
      this.sevenDay.forEach((item) => {
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      });
      // apiArr的数据格式不符合promise.all的数据格式，需要改变一下
      const PromiseAll = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
      Promise.all(PromiseAll)
        .then((res) => {
          //   七天的数据获取到后，修改数据格式
            const resArr = [[],[],[]]
            res.forEach((item,index) => {
                if(item.status == 1) {
                    resArr[Math.floor(index / 7)].push(item.count)
                }
            })
             this.sevenDate = resArr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
@import "~@/style/mixin";

.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>
