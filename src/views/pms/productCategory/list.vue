<template>
  <div class="app-container">
    <div>
      <el-table :data="list" style="width:100%;margin-bottom:20px" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="level" label="级别"></el-table-column>
        <el-table-column prop="productCount" label="商品数量"></el-table-column>
        <el-table-column prop="productUnit" label="数量单位"></el-table-column>
        <el-table-column label="导航栏">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.navStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleNavStatusChange(scope.$index, scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.showStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleShowStatusChange(scope.$index, scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="设置"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getList, updateNavStatus,updateShowStatus} from '@/api/productCategory'
  
  export default {
    name:"",
    data(){
      return {
        list:[],
        query:{},
        page:{
          pageNum:1,
          pageSize:5
        },
        total:null,
        listLoading:false
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        this.listLoading = true;
        getList().then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        })
      },
      handleNavStatusChange(index, row){
        let data = new URLSearchParams();
        let ids = [];
        ids.push(row.id);
        data.append("ids", ids);
        data.append("navStatus", row.navStatus)
        updateNavStatus(data).then(response => {
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          });
        })
      },
      handleShowStatusChange(index, row){
        let data = new URLSearchParams();
        let ids = [];
        ids.push(row.id);
        data.append("ids", ids);
        data.append("showStatus", row.showStatus)
        updateShowStatus(data).then(response => {
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          });
        })
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-table th > .cell{
    text-align:center;
  }
  
  /deep/ .el-table .cell{
    text-align:center;
  }
</style>
