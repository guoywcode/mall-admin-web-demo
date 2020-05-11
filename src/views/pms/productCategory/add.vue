<template>
  <div class="app-container">
    <product-category-detail :is-edit="false"></product-category-detail>
  </div>
</template>

<script>
  import ProductCategoryDetail from './components/categoryDetail'
  
  export default {
    name:"AddProductCategory",
    component:{ProductCategoryDetail}
  }
</script>

<style scoped>

</style>
