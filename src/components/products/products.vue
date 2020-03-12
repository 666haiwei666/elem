<template>
    <div class="goods">
         <div class="menu-wrapper">
         <ul >
           <li v-for="(item,index) in goods"
               class="menu-item"
               @click="ElementClick(index)"
               ref="good">
             <!--<span class="count" v-show="item.num&&item.num>0">{{ComputedNum(index).num}}</span>-->
             <span class="text">
                 <span v-show="item.type>0" class="icon" :class="classmap[item.type]"></span>{{item.name}}
             </span>
           </li>
         </ul>
       </div>
        <div class="foods-wrapper" >
         <ul   @touchstart ="TouchStart"
               @touchmove="TouchMove"
               @touchend="TouchEnd">
           <li v-for="item in goods" class="food-list" ref="food" >
              <h1 class="title">{{item.name}}</h1>
             <ul>
               <li v-for="food in item.foods" class="food-item"  >
                   <div class="icon">
                     <img :src="food.icon" alt="">
                   </div>

                   <div class="content" >
                      <div @click="Selected(food)">
                      <h2 class="name">{{food.name}}
                      </h2>
                      <p class="desc"></p>
                       <div class="extra">
                          <span class="count">月售{{food.sellCount}}份</span>
                          <span>好评率{{food.rating}}%</span>
                       </div>
                     <div class="price">
                       <span class="new">￥{{food.price}}</span>
                       <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                     </div>
                   </div>
                     <div class="numControl-wrapper">
                        <numControl :food="food"></numControl>
                     </div>
                   </div>
               </li>
             </ul>
           </li>
         </ul>
      </div>
      <div>
        <shoppingCar :select-foods="CircleSelectFood"
                     :minPrice="seller.minPrice"
                     :deliveryPrice="seller.deliveryPrice"></shoppingCar>
      </div>
      <FoodVue :Food="selectedFood" ref="Food"></FoodVue>
    </div>

</template>

<script>
  import BScroll from 'better-scroll'
  import shoppingCar from 'components/shoppingCar/shoppinfCar'
  import numControl from 'components/numControl/numControl'
  import FoodVue from 'components/food/food'
  import Vue from 'vue'
    export default {
        name: "products",
        props: {
          goods:{
            type: Array
          },
          seller: {
            type: Object
          }
        },
        data:function(){
          return {
            foodTopList: [],
            classmap: [],
            selectedFood:{},
            Foods:[]
          }
        },
        components:{
          shoppingCar:shoppingCar,
          numControl:numControl,
          FoodVue:FoodVue
       },
        methods:{
          Selected:function(food){
            this.selectedFood=food
           this.$refs.Food.show();
          },
          ElementClick:function (id) {
            this.Active(id)
            let element01=this.$refs.food[id];
            this.scrollRight.scrollToElement(element01)
          },
          Active:function(id){
            let element02=this.$refs.good[id]
            for(let i=0;i<this.$refs.good.length;i++)
            {
              this.$refs.good[i].className='menu-item'
            }
            element02.className=element02.className+' '+'clicked'
          },
          TouchStart: function () {
            this.foodTopList=[]
            this.touchStatus = true
            for( let i=0;i<this.$refs.food.length;i++)
            {
              this.foodTopList.push(this.$refs.food[i].offsetTop)
            }

          },
          TouchMove: function (e) {
            if(this.touchStatus) {
              let goodWidth=this.$refs.good[0].offsetHeight;
              this.scrollRight.on('scroll',(pos) => {
                this.scrollY = Math.abs(pos.y);
                for(let i=0;i<this.foodTopList.length;i++)
                {
                  if(this.scrollY>=this.foodTopList[i]&&this.scrollY<=this.foodTopList[i+1])
                  {
                    this.Active(i)
                  }
                }
                if(this.scrollY>this.foodTopList[this.foodTopList.length-1])
                {
                  this.Active(this.foodTopList.length-1)
                }
              })
            }
          },
          TouchEnd: function () {
            this.touchStatus = false
          },
          _initScroll:function () {
            if(!this.scrollRight)
            {
              this.scrollRight = new BScroll('.foods-wrapper',{
                click: true,
                taps:true,
                probeType:3
              })
            }else {
              this.scrollRight.refresh();
            }
            if(!this.scrollLeft)
            {
              this.scrollLeft=new BScroll('.menu-wrapper',{
                click: true,
                taps:true,
                probeType:3
              })
            }else{
              this.scrollLeft.refresh();
            }
          },
          // ComputedNum:function (index) {
          //   this.goods.forEach((good)=>{
          //     if(!good.num)
          //     {
          //       Vue.set(good,'num',0)
          //     }
          //   })
          //   let selectedFood=this.CircleSelectFood;
          //   let currentFood=this.goods[index].foods
          //   selectedFood.forEach((selectfood)=>{
          //     for(let i=0;i<currentFood.length;i++)
          //      {
          //        if(currentFood[i].name===selectfood.name)
          //        {
          //          this.goods[index].num= this.goods[index].num+1
          //          break
          //        }
          //      }
          //
          //   });
          //   return this.goods[index];
          // }
        },
        computed:{
        CircleSelectFood : function(){
           this.Foods=[];
          this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if(food.count)
              {
                this.Foods.push(food)
              }
            })
          });
          return this.Foods
        }
      } ,
        mounted:function () {
          this.$nextTick(()=>{
            this._initScroll();
          })
        },
    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/minin.styl"
.goods{
  display flex
  position absolute
  top:174px
  bottom:46px
  width 100%
  overflow hidden
  .menu-wrapper{
    //flex  0 0 80px
    width 80px
    background-color #f3f5f7
    .menu-item{
      //无论1行还两行三行，都可以做到垂直居中
      display table
      height 54px
      width 56px
      line-height 14px
      padding-left 12px
      position relative
      border-b-1px(rgba(7,17,27,0.1))
      &.clicked{
        background-color #ffffff
      }
      .count{
        position absolute
        top:0
        right 0
        display inline-block
        padding:2px
        width 12px
        height 12px
        border-radius 50%
        background-color #ff7416
        color #fff
        font-size 4px
        text-align center
        line-height 12px
      }
      icon {
          vertical-align top
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease{
            bg-img('decrease_3')
          }
          &.discount{
            bg-img('discount_3')
          }
          &.guarantee{
            bg-img('guarantee_3')
          }
          &.invoice{
            bg-img('invoice_3')
          }
          &.special{
            bg-img('special_3')
          }
       }
      .text{
        width 56px
        font-size 12px
        display table-cell
        vertical-align middle
      }
     }
   }
  .foods-wrapper{
    flex 1
    position relative
    left 0
    .title {
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    }
      .food-item{
        display flex
        margin 0 18px
        padding-top:18px
        border-b-1px(rgba(7,17,27,0.1))
        &.last-child{
          border-none()
          margin-bottom 0
        }
        .icon{
          margin-right 10px
        }
        .content{
          position relative
          flex 1
          .name{
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
            margin-bottom 13px
            nowwrap()
          }
          .desc ,.extra{
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
            margin-bottom 20px
          }
          .desc{
            margin-bottom 8px
          }
          .extra{
            line-height 10px
            .count{
              margin-right 10px
            }
          }

          .price{
            font-weight 700
            line-height 24px
            .new{
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            }
            .old{
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
            }
          }
          .numControl-wrapper{
            position absolute
            bottom 2px
            right 2px
            font-size 2px
          }
        }
      }
    }

}
</style>
