<template>
  <div class="shopping-Wrapper">
    <div class="shopcart" @click="showControl()">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight:totalNum>0 }">
              <span class="icon-shopping_cart" :class="{ highlight:totalNum>0 }"></span>
            </div>
            <div class="num" v-show="totalNum>0">{{Computed_num}}</div>
          </div>
          <div class="price" :class="{ highlight:totalPrice>0 }">{{Computed_Price}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{ highlight:this.totalPrice>=minPrice }">
            {{PayDes}}
          </div>
        </div>
      </div>
    </div>
    <transition name="slide">
    <div class="FoodTable" v-show="show_Flag">
        <div class="content">
          <div class="line">
            <span class="selected">已选商品</span>
            <span class="Clear" @click="DeleteFood()">
            <span class="iconfont icon-delete"></span>清空
          </span>
          </div>
          <div class="wrapper" ref="wrapper">
            <ul>
              <li class="item" v-for="item in selectFoods">
                <div class="name"> {{item.name}}</div>
                <div class="price">￥{{item.count*item.price}}</div>
                <numControl class="num" :food="item"></numControl>
              </li>
            </ul>
          </div>

        </div>
    </div>
  </transition>
  </div>

</template>

<script>
   import numControl from 'components/numControl/numControl'
   import BScroll from 'better-scroll'
    export default {
      name: "shoppinfCar",
      props:{
        selectFoods:{
          type:Array,
          default:function () {
            return []
          }
        },
        minPrice:{
          type: Number
        },
        deliveryPrice:{
          type:Number
        }
      },
      components:{
        numControl:numControl
      },
      data:function(){
        return {
          obj:{},
          totalNum:0,
          totalPrice:0,
          show_Flag:false
        }
      },
      methods:{
        _initScroll:function(){
          this.scroll=new BScroll(this.$refs.wrapper,{
            click:true
          })
        },
        DeleteFood:function(){
          this.selectFoods.forEach((food)=>{
            food.count=0
          })
        },
        showControl:function () {
          console.log(this.selectFoods);
          if(!this.selectFoods.length)
          {
            this.show_Flag=false;
          }else{
            this.show_Flag=!this.show_Flag
          }

        }
      },
      computed: {
        Computed_num: function () {
          this.totalNum=0;
          this.selectFoods.forEach((food) => {
            this.totalNum = this.totalNum + food.count
          })
          return this.totalNum
        },
        Computed_Price: function () {
          this.totalPrice=0
          this.selectFoods.forEach((food) => {
            this.totalPrice = this.totalPrice + food.count * food.price
          })
          return this.totalPrice
        },
        PayDes: function () {
          if (this.totalPrice === 0){
            return `￥${this.minPrice}元起送`
           } else if(this.totalPrice>0 && this.totalPrice<this.minPrice)
          {
            return `还差￥${this.minPrice-this.totalPrice}元起送`
          }else if(this.totalPrice>=this.minPrice )
          {
            return `去结算`
          }
        }

        },
      created:function () {
        this.$nextTick(()=>{
          this._initScroll()
        })
      }
    }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active {
    transition:all 0.2s;
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform translate3d(0,100%,0)
  }
.shopping-Wrapper{
  .shopcart {
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    background-color black
    .content {
      display flex
      background-color #141d27
      font-size 0
      .content-left {
        flex 1
        .logo-wrapper {
          display inline-block
          position relative
          top: -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background-color #141d27
          text-align center
          .logo{
            display inline-block
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            &.highlight{
              background-color rgb(0,160,220)
            }
            .icon-shopping_cart{
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight{
                color #fff
              }
            }
          }
          .num{
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background-color rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
          }
        }
        .price {
          display inline-block
          vertical-align top;
          line-height 24px
          font-size 16px
          font-weight 700
          color rgba(255,255,255,0.4)
          margin-top 12px
          padding-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
          &.highlight{
            color #fff
          }
        }
        .desc {
          display inline-block
          color rgba(255,255,255,0.4)
          line-height 48px
          font-size 10px
        }
      }
      .content-right {
        flex 0 0 105px
        width 105px
        .pay{
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          color rgba(255,255,255,0.4)
          font-weight 700
          background #2b333b
          &.highlight{
            background-color #00b43c
            color #fff
          }
        }
      }
    }
  }
  .FoodTable{
    width 100%
    height 100%
    position fixed
    left 0
    right 0
    bottom 0
    top:0
    z-index 49
    background rgba(7,17,27.0.2)
    .content{
      position fixed
      left 0
      right 0
      bottom 50px
      .line{
        background-color #eceff1
        height 40px
        padding 0 18px
        line-height 40px
        display flex
        span {
          display inline-block
        }
        .selected{
            font-size 16px
            color #7e8c8d
            flex 0 0  280px
          }
        .Clear{
            vertical-align top
            font-size 12px
            text-align right
            flex 1
          .icon-delete{
            margin-right 4px
          }
        }
      }
      .wrapper{
        max-height 300px
        overflow hidden
        background-color #fff
        ul{
          .item{
            padding 0 12px
            display flex
            height  40px
            background-color #ffffff
            border-bottom 1px solid rgba(7,17,27,0.1)
            .name{
              display inline-block
              font-size 14px
              line-height 40px
              color rgb(7,17,27)
              flex 1
            }
            .price{
              line-height 40px
              color #ff5339
              flex 0 0 50px
            }
            .num{
              line-height 40px
              flex 0 0 100px
            }
          }
        }
      }

    }
  }
}
</style>
