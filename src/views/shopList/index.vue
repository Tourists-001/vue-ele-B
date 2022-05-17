<template>
  <div class="fillcontain">
    <headTop></headTop>
    <div class="table_container">
      <el-table :data="tableData" i style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              style="marginleft: 50px"
              inline
              border
              show-header
              class="demo-table-expand"
            >
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="description"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="addFood(scope.$index, scope.row)"
              >添加食品</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="headCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
      <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="店铺名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" label-width="100px">
            <el-autocomplete
              v-model="address.address"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入地址"
              style="width: 100%"
              @select="addressSelect"
            >
            </el-autocomplete>
            <span>当前城市：{{ city.name }}</span>
          </el-form-item>
          <el-form-item label="店铺介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" label-width="100px">
            <el-input v-model="selectTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" label-width="100px">
            <el-cascader
              :options="categoryOptions"
              v-model="selectedCategory"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="图片" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="selectTable.image_path"
                :src="baseImgPath + selectTable.image_path"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateShop">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { baseUrl, baseImgPath } from "@/config/env";
import {
  cityGuess,
  getResturantsCount,
  getResturants,
  foodCategory,
  searchplace,
  updateResturant,
  deleteResturant,
} from "@/api/dataList";
export default {
  data() {
    return {
      baseImgPath,
      count: 0,
      tableData: [],
      currentPage: 1,
      limit: 20,
      offset: 0,
      dialogFormVisible: false,
      selectTable: [],
      categoryOptions: [],
      selectedCategory: [],
      address: {},
      city: {},
      baseUrl,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.city = await cityGuess();
        const res = await getResturantsCount();
        if (res.status === 1) {
          this.count = res.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getResturants();
      } catch (err) {
        console.log(err);
      }
    },
    async getResturants() {
      const { latitude, longitude } = this.city;
      const res = await getResturants({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit,
      });
      this.tableData = [];
      res.forEach((item) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.id = item.id;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.recent_order_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData);
      });
    },
    headCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getResturants();
    },
    async getCategory() {
      try {
        const res = await foodCategory();
        res.forEach((item) => {
          if (item.sub_categories.length) {
            const addNew = {
              value: item.name,
              label: item.name,
              children: [],
            };
            item.sub_categories.forEach((item, index) => {
              if (index == 0) {
                return;
              }
              addNew.children.push({
                value: item.val,
                label: item.name,
              });
            });
            this.categoryOptions.push(addNew);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async querySearchAsync(queryString, cb) {
        console.log(queryString,'dddddd');
      if (queryString) {
        try {
          const cityList = await searchplace(this.city.id, queryString);
          console.log(cityList);
          if (cityList instanceof Array) {
            cityList.map((item) => {
              item.value = item.address;
              return item;
            });
            cb(cityList);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    addressSelect(value) {
      const { address, latitude, longitude } = value;
      this.address = { address, latitude, longitude };
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.address.address = row.address;
      this.dialogFormVisible = true;
      this.selectedCategory = row.category.split("/");
      if (this.selectedCategory.length) {
        this.getCategory();
      }
    },
    addFood(index, row) {
      this.$router.push({
        path: "addGoods",
        query: { restaurant_id: row.id },
      });
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteResturant(row.id);
        if (res.status === 1) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateShop() {
      this.dialogFormVisible = false;
      try {
        Object.assign(this.selectTable, this.address);
        this.selectTable.category = this.selectedCategory.join("/");
        const res = await updateResturant(this.selectTable);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新商铺成功",
          });
          this.getResturants();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleServiceAvatarSuccess(res) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
