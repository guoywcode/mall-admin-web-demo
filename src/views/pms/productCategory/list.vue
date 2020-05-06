<template>
  <div class="app-container">
    <div >
    <el-table
      :data="list"
      style="width:100%;margin-bottom:20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
      <el-table-column prop="productCount" label="商品数量"></el-table-column>
      <el-table-column prop="productUnit" label="数量单位"></el-table-column>
      <el-table-column prop="navStatus" label="导航栏"></el-table-column>
      <el-table-column prop="showStatus" label="是否显示"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column label="设置"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
  import { getList} from '@/api/productCategory'
  
  export default {
    name:"",
    data(){
      return {
        list:[],
        query:{
        
        },
        page:{
          pageNum: 1,
          pageSize: 5
        },
        total: null,
        listLoading:false
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        this.listLoading = true;
        getList().then(response =>{
          console.log(response)
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        })
      }
    }
  }
</script>

<style scoped>

</style>
