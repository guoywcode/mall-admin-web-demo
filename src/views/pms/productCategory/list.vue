<template>
  <div class="app-container">
    <el-card
      class="operate-container" shadow="never">
      <el-button
        class="btn-add"
        @click="handleAddProductCategory()"
        >
        添加
      </el-button>
    </el-card>
    
    <div class="table-container">
      <el-table :data="list" style="width:100%;margin-bottom:20px" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column label="编号" width="80">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="分类名称" width="180">
          <template slot-scope="scope">{{scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="级别">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column  label="商品数量">
          <template slot-scope="scope">{{scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column  label="数量单位">
          <template slot-scope="scope">{{scope.row.productUnit }}</template>
        </el-table-column>
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
        <el-table-column label="排序">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置">
          <template slot-scope="scope">
           <el-button size="mini" plain @click="handleTransferProduct(scope.$index,scope.row)">转移商品</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"  @click="handleUpdate(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini"  type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        })
      },
      handleUpdate(index, row){
      
      },
      handleDelete(index,row){
      
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
      },
      handleTransferProduct(index,row){
        this.$message({
          message:'转移商品',
          type:'success',
          duration:500
        });
      },
      handleAddProductCategory(){
        this.$router.push({name:'AddProductCategory'});
      }
    },
    filters:{
      levelFilter(value){
        if(value === 0)
          return "一级";
        else
          return "二级";
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
