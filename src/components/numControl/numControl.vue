<template>
    <div class="numControl">
      <transition name="fade">
         <div class="decrease icon-remove_circle_outline" @click="decreaseNUM" v-show="food.count>0"></div>
      </transition>
      <transition name="fade">
         <div class="num" v-show="food.count>0">{{food.count}}</div>
      </transition>
       <div class="increase icon-add_circle" @click="addNUM"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "numControl",
        data:function(){
          return {
          }
        },
        props:{
          food:{
            type:Object,
          }
        },
      methods:{
        addNUM:function () {
          if(!this.food.count)
          {
            Vue.set(this.food,'count',1)
            this.food.count=1;
          }else{
            ++this.food.count
          }
        },
        decreaseNUM:function () {
           --this.food.count
          if( this.food.count<=0)
          {
           this.food.count=0
          }
        }
      },
    }
</script>

<style lang="stylus" scoped>
  .fade-enter-active {
    animation: bounce-in .5s;
  }
  .fade-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
}
.numControl{
  font-size 0
  .decrease,.increase{
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0,160,220)
  }
  .num{
    display inline-block
    vertical-align top
    text-align center
    width 12px
    padding-top 6px
    line-height 24px
    font-size 14px
    color #7e8c8d
  }
}
</style>
