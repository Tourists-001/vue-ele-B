<template>
  <div>
    <section class="data_sections">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{title}}</span>
        </div>
        <div v-for="o in 1" :key="o" class="text item">
          {{content}}
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
    props:['title','content']
};
</script>

<style>
.data_sections {
    padding: 20px;  
    display: flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-right: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
