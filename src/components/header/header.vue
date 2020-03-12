<template>
    <div class="header">
       <div class="content-wrapper">
          <div class="avatar">
            <img :src="seller.avatar" alt="" width="64" height="64">
          </div>
         <div class="content">
           <div class="title">
             <span class="brand"></span>
             <span class="name">{{seller.name}}</span>
           </div>
           <div class="description">
             {{seller.description}}/{{seller.deliveryTime}}分钟送到
           </div>
           <!--vue-rescourse是异步传输，当seller传输过来是空对象，加上 v-if="seller.supports"防止报错-->
           <div class="support" v-if="seller.supports">
              <span class="icon" :class="classmap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
           </div>
         </div>
         <div class="support-count" v-if="seller.supports">
           <span class="count">{{seller.supports.length}}个</span>
           <span class="icon-keyboard_arrow_right" @click="detailShow()"></span>
         </div>
       </div>
       <div class="bulletin-wrapper">
         <span class="bulletin-title"></span>
         <span class="bulletin-text">{{seller.bulletin}}</span>
         <i class="icon-keyboard_arrow_right" @click="detailShow()"></i>
       </div>
       <div class="backgound">
        <img :src="seller.avatar" alt="" width="100%">
      </div>
       <transition name="fade">
              <div class="detail" v-show="detailshow">
          <!--//sticky footer 布局-->
           <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <div class="name">{{seller.name}}</div>
                <div class="star-wrapper">
                  <STAR :size="48" :score="seller.score"></STAR>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li class="support-item" v-for="(item,index) in seller.supports">
                     <span class="icon" :class="classmap[index]"></span>
                     <span class="text">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="bulletin">
                  <p class="content">{{seller.bulletin}}</p>
                </div>
              </div>
           </div>
           <div class="detail-close">
             <span class="icon-close" @click="hidden()"></span>
           </div>
         </div>
      </transition>
    </div>
</template>

<script>
  import STAR from 'components/star/star'
    export default {
        name: "header",
        props:{
          seller:{
            type:Object
          }
        },
       components:{
         STAR:STAR
       },
       data:function(){
          return{
            classmap:[],
            detailshow:false
          }
       },
      methods:{
        detailShow :function () {
          this.detailshow=true
        },
        hidden:function () {
          this.detailshow=false
        }
      },
      created:function () {
        this.classmap=['decrease','discount','guarantee','invoice','special']
      }

    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/minin.styl"
.header{
   position relative
   color #fff
   background-color:rgba(7,17,27,0.5)
   overflow hidden
  //消除空白间隙
   //font-size 0
   .content-wrapper
   {
     position relative
     padding 24px 12px 18px 24px
     .avatar{
       vertical-align top
       display inline-block
       img{
         border-radius 2px
       }
     }
     .content{
       display inline-block
       margin-left 16px
       font-size 14px
       .title{
         margin 2px 0 8px 0
         .brand{
           width 30px
           height 18px
           display inline-block
           vertical-align top
           bg-img('brand')
           background-size 30px 18px
           background-repeat no-repeat
         }
         .name{
           margin-left 6px
           font-size 16px
           line-height 18px
           font-weight bold
         }
       }
       .description{
         margin-bottom 10px
         line-height 12px
         font-size 12px
       }
       .support{
         .icon {
           vertical-align top
           display inline-block
           width 12px
           height 12px
           margin-right 4px
           background-size 12px 12px
           background-repeat no-repeat
           &.decrease{
             bg-img('decrease_2')
           }
           &.discount{
             bg-img('discount_2')
           }
           &.guarantee{
             bg-img('guarantee_2')
           }
           &.invoice{
             bg-img('invoice_2')
           }
           &.special{
             bg-img('special_2')
           }
         }
         .text{
           font-size 12px
         }
       }
     }
     .support-count{
       color #ffffff
       position absolute
       right 12px
       bottom 14px
       padding 0 8px
       height 24px
       line-height 24px
       border-radius 14px
       background rgba(0,0,0,0.2)
       text-align center
       .count{
         font-size 10px
         vertical-align top
       }
       .icon-keyboard_arrow_right{
         line-height 24px
         font-size 10px
         margin-left 2px
       }
     }
   }

  .bulletin-wrapper{
    background-color rgba(7,17,27,0.2)
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    //显示..效果
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    //font-size 0//会影响省略号的存在
    .bulletin-title{
      margin-top 7px
      vertical-align top
      display inline-block
      width:22px
      height 12px
      bg-img('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    }
    .bulletin-text{
      vertical-align top
      margin-left 4px
      font-size 10px
    }
    .icon-keyboard_arrow_right{
      position absolute
      font-size 10px
      right 12px
      top:8px
    }
  }

  .backgound{
    position absolute
    z-index -1
    top 0
    left 0
    width 100%
    height 100%
    filter:blur(10px)
  }
  .fade-enter,.fade-leave-to{
    opacity 0
    background rgba(7,17,27,0)
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .5s;
  }
  .detail{
    position fixed
    top:0
    left 0
    width 100%
    height 100%
    z-index 3
    overflow auto //自适应
    background rgba(7,17,27,0.8)
    .detail-wrapper{
       min-height 100%
       width 100%
       .detail-main{
         margin-top 64px
         padding-bottom 64px
         .name{
           line-height 16px
           text-align center
           font-size 16px
           font-weight 700
         }
         .star-wrapper{
           margin-top 18px
           padding 2px 0
           text-align center
         }
         .title{
           display flex
           width 80%
           margin 28px auto 24px auto
           .line{
             flex 1
             height 0
             padding-bottom 6px
             border-bottom 1px solid rgba(255,255,255,0.2)
           }
           .text{
             padding 0 12px
             font-weight 700
             font-size 14px
           }
         }
         .supports{
           width 80%
           margin 0 auto
           .support-item{
             padding 0 12px
             margin-bottom 12px
             font-size 14px
             //font-size 0
             &:last-child{
               margin-bottom 0
             }
             .icon{
               display inline-block
               vertical-align top
               width 16px
               height 16px
               margin-right 6px
               background-size 16px 16px
               background-repeat no-repeat
               &.decrease{
                   bg-img('decrease_1')
                 }
               &.discount{
                 bg-img('discount_1')
               }
               &.guarantee{
                 bg-img('guarantee_1')
               }
               &.invoice{
                 bg-img('invoice_1')
               }
               &.special{
                 bg-img('special_1')
               }
             }
           }
         }
         .bulletin{
           width 80%
           margin 0 auto
           .content{
             padding 0 12px
             line-height 24px
             font-size 12px

           }
         }
       }
    }
    .detail-close{
      position relative
      width 32px
      height 32px
      font-size 32px
      margin -64px auto 0 auto
      clear both
  }
  }

}
</style>
