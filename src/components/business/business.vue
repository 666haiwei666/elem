<template>
    <div class="business" ref="businessWrapper">
        <div class="seller-content">
           <div class="overview">
              <h1 class="title">{{seller.name}}</h1>
              <div class="desc">
                 <star class="star" :size="36" :score="seller.score"></star>
                 <span class="text">({{seller.ratingCount}})</span>
                 <span class="text">月售{{seller.sellCount}}单</span>
              </div>
             <ul class="remark">
               <li class="block">
                 <h2>起送价</h2>
                 <div class="content">
                    <span class="stress">{{seller.minPrice}}<span class="unit">元</span></span>
                 </div>
               </li>
               <li class="block">
                 <h2>商家配送</h2>
                 <div class="content">
                   <span class="stress">{{seller.deliveryPrice}}<span class="unit">元</span></span>
                 </div>
               </li>
               <li class="block">
                 <h2>平均配送时间</h2>
                 <div class="content">
                   <span class="stress">{{seller.deliveryTime}}<span class="unit">分钟</span></span>
                 </div>
               </li>
             </ul>

           </div>
           <split></split>
           <div class="bulletin">
             <h1 class="title">公共与活动</h1>
             <div class="content-wrapper">
               <p class="content">{{seller.bulletin}}</p>
             </div>
           </div>
           <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classmap[index]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
           <split></split>
           <div class="screen-Wrapper">
                 <h1>商家实景</h1>
                 <div class="ulImg" ref="ulImgWrapper">
                   <div>
                     <div class="imgWrapper" v-for="(item) in seller.pics">
                       <img :src="item" alt="">
                     </div>
                   </div>
                 </div>

                 </div>
           <split></split>
           <div class="info">
             <h1 class="title">商家信息</h1>
             <ul>
               <li class="info-item" v-for="info in seller.infos">{{info}}</li>
             </ul>
           </div>
        </div>
    </div>
</template>

<script>
  import Star from 'components/star/star'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'
    export default {
        name: "preview",
        props:{
          seller:{
            type:Object
          }
        },
      components:{
        Star:Star,
        split:split
      },
      methods:{
         _initScroll:function(){
           this.scroll_1=new BScroll(this.$refs.businessWrapper,{
             click:true
           })
           this.scroll_2=new BScroll(this.$refs.ulImgWrapper,{
             startX: 0,
             click: true,
             scrollX: true,
             // 忽略竖直方向的滚动
             scrollY: false,
             eventPassthrough: "vertical"
           })
         },
      },
      created:function () {
          this.classmap=['decrease','discount','guarantee','invoice','special']
          this.$nextTick(()=>{
              this._initScroll();
          })
        }
    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/minin.styl";
.business{
  position absolute
  top:174px
  left 0
  right 0
  bottom 0
  overflow hidden
  .overview{
    padding 18px
    .title{
      margin-bottom 8px
      line-height 14px
      color rgb(7,17,27)
      font-size 14px
    }
    .desc {
      padding-bottom 18px
      line-height 18px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      font-size 0
      .star{
        display inline-block
        vertical-align top
        margin-right 8px
      }
      .text{
        vertical-align top
        line-height 14px
        color rgba(7,17,27,0.5)
        font-size 10px
        margin-right 8px
      }
    }
    .remark{
        display flex
        padding-top 18px
        .block{
          flex 1
          text-align center
          border-right  1px solid rgba(7,17,27,0.1)
          &:last-child{
            border none
          }
          h2{
            margin-bottom 10px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          }
          .content{
            line-height 24px
            font-size 10px
            color rgb(7,17,27)
            .stress{
              font-size 24px
            }
            .unit{
              font-size 10px
              color rgb(147,153,159)
            }
          }
        }
      }
    }
  .bulletin{
    padding  18px 18px 0 18px
    .title{
      margin-bottom 8px
      line-height 14px
      color rgb(7,17,27)
      font-size 14px
    }
    .content-wrapper{
      padding 0 12px 16px 12px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .content{
        line-height 24px
        font-size 12px
        color rgb(240,20,20)
      }
    }
  }
  .supports{
    .support-item{
      padding 16px 12px
      font-size 0
      .icon {
          vertical-align top
          display inline-block
          width 16px
          height 16px
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease{
            bg-img('decrease_4')
          }
          &.discount{
            bg-img('discount_4')
          }
          &.guarantee{
            bg-img('guarantee_4')
          }
          &.invoice{
            bg-img('invoice_4')
          }
          &.special{
            bg-img('special_4')
          }
        }
      .text{
        line-height 16px
        font-size 12px
        color rgb(7,17,27)
      }
      }
    }
  .screen-Wrapper{
    padding 18px
    h1{
      margin-bottom 8px
      line-height 14px
      color rgb(7,17,27)
      font-size 14px
    }
    .ulImg{
      width 100%
      overflow: hidden;
      div{
        width 130%
        .imgWrapper{
          width 100px
          height 100px
          display inline-block
          vertical-align top
          margin-right 8px
          img{
            width 100px
            height 100px
          }
        }
      }

    }

  }
  .info{
    padding 18px 18px 0 18px
    color rgb(7,17,27)
    .title{
      line-height 14px
      color rgb(7,17,27)
      font-size 14px
      padding-bottom 12px
      border-bottom 1px solid rgba(7,17,27,0.1)
    }
    .info-item{
      font-size 10px
      padding 16px 12px
      line-height 16px
      border-bottom 1px solid rgba(7,17,27,0.1)
      &:last-child{
        border-bottom none
      }
    }
  }
}
</style>
