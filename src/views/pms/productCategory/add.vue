<template>
  <product-category-detail :is-edit="false"></product-category-detail>
</template>

<script>
  import ProductCategoryDetail from './components/categoryDetail'
  
  export default {
    name:"AddProductCategory",
    components:{ProductCategoryDetail}
  }
</script>

<style scoped>

</style>
