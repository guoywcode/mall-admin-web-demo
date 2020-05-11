<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i> <span>筛选搜索</span>
        <el-button style="float:right" size="small" type="primary" @click="handleSearchList()">
          查询结果
        </el-button>
        <el-button style="float:right;margin-right:12px" size="small" @click="handleResetSearch()">
          重置
        </el-button>
      </div>
      <div >
        <el-form :inline="true" :model="productQuery" size="small" label-width="100px" class="form-screen" >
          <el-form-item label="商品名称">
            <el-input :model="productQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号">
            <el-input :model="productQuery.productSn" placeholder="商品货号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
           <el-select  v-model="productQuery.productCategoryId" placeholder="请选择分类">
             <el-option
               v-for="item in selectProductCategory"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select v-model="productQuery.brandId" placeholder="请选择品牌">
              <el-option
                v-for="item in selectBrand"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="productQuery.publishStatus">
              <el-option
                v-for="item in selectPublishStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态机">
            <el-select v-model="productQuery.verifyStatus">
              <el-option
                v-for="item in selectVerifyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div style="margin-top:20px">
      <el-button style="float:right;" size="small" @click="handleCreateProduct()">添加商品</el-button>
    </div>
    
    <div class="table-container">
      <el-table :data="productList">
        <el-table-column label="编号" width="80">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品图片"  width="100">
          <template slot-scope="scope">
            <el-image fit="fit" style="height: 80px" :src="scope.row.pic"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌：{{scope.row.brandName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.productSn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <p>上架：
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus">
              </el-switch>
            </p>
            <p>新品：
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus">
              </el-switch>
            </p>
            <p>推荐：
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus">
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="SKU库存">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="销量">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>
            <p>
              <el-button
                type="text"
                size="small"
                @click="handleShowVerifyDetail(scope.$index, scope.row)">
                审核结果
              </el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                @click="handleShowLog(scope.$index, scope.row)">日志
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>

<script>
  const defaultProductQuery = {
    keyword:null,
    pageNum:1,
    pageSize:5,
    publishStatus:null,
    verifyStatus:null,
    productSn:null,
    productCategoryId:null,
    brandId:null
  }
  
  export default {
    name:"ProductList",
    data(){
      return {
        productQuery:Object.assign({}, defaultProductQuery),
        selectProductCategory:[
          {
            name:'手机',
            id:1
          },
          {
            name:'服饰',
            id:2
          }
        ],
        selectBrand:[
          {
            id:1,
            name:'小米'
          },
          {
            id:2,
            name:'华为'
          }
        ],
        selectPublishStatus: [{
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
        selectVerifyStatus: [{
          value: 1,
          label: '审核通过'
        }, {
          value: 0,
          label: '未审核'
        }],
        productList:[
          {
            albumPics: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ab46a3cN616bdc41.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf5fN2522b9dc.jpg",
            brandId: 3,
            brandName: "华为",
            deleteStatus: 0,
            description: null,
            detailDesc: null,
            detailHtml: null,
            detailMobileHtml: null,
            detailTitle: "",
            feightTemplateId: 0,
            giftGrowth: 3788,
            giftPoint: 3788,
            id: 26,
            keywords: "",
            lowStock: 0,
            name: "华为 HUAWEI P20 ",
            newStatus: 1,
            note: "",
            originalPrice: 4288,
            pic: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg",
            previewStatus: 1,
            price: 3788,
            productAttributeCategoryId: 3,
            productCategoryId: 19,
            productCategoryName: "手机通讯",
            productSn: "6946605",
            promotionEndTime: null,
            promotionPerLimit: 0,
            promotionPrice: null,
            promotionStartTime: null,
            promotionType: 1,
            publishStatus: 1,
            recommandStatus: 1,
            sale: 0,
            serviceIds: "2,3,1",
            sort: 100,
            stock: 1000,
            subTitle: "AI智慧全面屏 6GB +64GB 亮黑色 全网通版 移动联通电信4G手机 双卡双待手机 双卡双待",
            unit: "件",
            usePointLimit: 0,
            verifyStatus: 0,
            weight: 0
          }
        ]
      }
      
    },
    filters:{
      verifyStatusFilter(value){
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods:{
      handleCreateProduct(){
        this.$message('创建商品。');
      },
      handlePublishStatusChange(index,row){
        this.$message('上架状态改变。');
      },
      handleNewStatusChange(index,row){
        this.$message('新品状态改变。');
      },
      handleRecommendStatusChange(index,row){
        this.$message('推荐商品状态')
      },
      handleShowSkuEditDialog(index,row){
        this.$message('更改sku')
      },
      handleShowVerifyDetail(index,row){
       this.$message('显示审核结果')
      },
      handleShowProduct(index,row){
        this.$message('查看商品')
      },
      handleUpdateProduct(index,row){
        this.$message('更新商品')
      },
      handleShowLog(index,row){
        this.$message('查看商品日志')
      },
      handleDelete(index,row){
        this.$message('删除商品')
      }
    }
  }
</script>

<style scoped>
  .form-screen{
    margin-top:15px;
  }
  .form-screen  >>> input {
      width: 203px;
    }
</style>
