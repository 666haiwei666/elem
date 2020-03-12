<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <Tab :seller="seller" :goods="goods"></Tab>
  </div>
</template>

<script>
  import Header from 'components/header/header'
  import tab from 'components/tab/tab'
  import Bus from 'common/js/bus'
export default {
  name: 'App',
  data:function(){
      return {
        seller:{},
        goods:[]
      }
  },
  methods:{
    getData:function () {
      let url='/static/data.json'
      this.$http.get(url).then((response)=>{
        response=response.body
        const data=response.seller;
        this.seller=data
        this.goods=response.goods
        Bus.$emit('val', {deliveryPrice:this.seller.deliveryPrice,
                          minPrice: this.seller.minPrice,goods:this.goods});
      },(error)=>{

      })
    },

  },
  components:{
    Header:Header,
    Tab:tab,
  },
  created:function () {
    this.getData();

  }
}
</script>

<style>
#app {

}
</style>
