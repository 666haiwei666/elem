<template>
  <div >
     <div class="tab border-1px">
       <router-link tag="div" class="tab-item" to="/products" :seller="seller">商品
       </router-link>
       <router-link tag="div" class="tab-item" to="/preview">评论
       </router-link>
       <router-link tag="div" class="tab-item" to="/business">商家
       </router-link>
     </div>
    <router-view :seller="seller" :goods="goods"></router-view>
  </div>

</template>

<script>
    export default {
        name: "tab",
        props:{
          seller:{
            type:Object
         },
          goods:{
            type:Array
          }
       },
    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/minin.styl"
  .tab{
    display flex
    width 100%
    height 40px
    line-height 40px
    border-b-1px(rgba(7,17,27,0.1))
    .tab-item{
          flex 1
          text-align center
          font-size 14px;
          color :rgb(77,85,93);
    }
    .router-link-active{
          color :rgb(240,20,20);
    }
  }

</style>
