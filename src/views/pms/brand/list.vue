<template>
  <div class="app-container">
    <el-card shadow="never" class="filter-container">
      <div>
        <i class="el-icon-search"></i> <span>筛选搜索</span>
        <el-button @click="searchBrandList()" type="primary" size="small" style="float:right">
          查询结果
        </el-button>
      </div>
      <div style="margin-top:20px">
        <el-form :inlist="true" :model="brandQuery" ref="brand">
          <el-form-item label="品牌" size="small" label-witch="100px">
            <el-input style="width: 203px" :model="brandQuery.name" placeholder="请输入品牌名"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <div class="table-container">
      <el-table
        :data="brandList"
        v-loading="listLoading"
      >
        <el-table-column label="编号">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="品牌名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="品牌首字母">
          <template slot-scope="scope">{{scope.row.firstLetter}}</template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="品牌制造商">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.factoryStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleFactoryStatus(scope.$index,scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.showStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleShowStatus(scope.$index,scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="相关">
          <template slot-scope="scope"><span>商品：</span>
            <el-button size="mini" type="text" @click="getProductList(scope.$index, scope.row)">100
            </el-button>
            <span>评价：</span>
            <el-button size="mini" type="text" @click="getProductCommentList(scope.$index, scope.row)">1000
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { branchList,updateShowStatus } from "@/api/brand";

  export default {
    name:"",
    data(){
      return {
        brandQuery:{},
        brandList:[],
        listLoading:false,
        page:{
          pageNum:1,
          pageSize:5
        },
        total:null
      }
    },
    created(){
      this.getBrandList();
    },
    methods:{
      getBrandList(){
        branchList().then(response => {
          this.brandList=response.data
          this.total=response.total
        })
      },
      searchBrandList(){
        this.$message('筛选结果')
      },
      handleFactoryStatus(index, row){
        console.log("handleFactoryStatus")
        updateShowStatus({'id':row.id}).then(response => {
         this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          });
        })
      },
      handleShowStatus(index, row){
        console.log("handleShowStatus")
        if(row.showStatus == 0){
          row.showStatus = 1;
        }else{
          row.showStatus = 0;
        }
      }
    }
  }
</script>

<style scoped>

</style>
