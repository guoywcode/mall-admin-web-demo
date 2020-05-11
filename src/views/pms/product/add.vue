<template>
 <product-detail :is-edit="false"></product-detail>
</template>

<script>
  import ProductDetail from './components/productDetail'
  export default {
    name:"AddProduct",
    components:{ProductDetail}
  }
</script>

<style scoped>
</style>
