<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i> <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          size="small"
          @click="handleResetSearch()"
          icon="el-icon-search">
          搜索
        </el-button>
        <el-button
          style="float:right;margin-right:2em"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name:"",
    data(){
      return{};
    },
    methods:{
      handleResetSearch(){
      
      }
    }
  }
</script>

<style scoped>

</style>
