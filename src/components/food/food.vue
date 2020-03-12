<template>
   <transition name="move">
        <div class="food" v-show="show_flag" ref="foodsWrapper">
          <div class="content">
            <div class="imgae-header">
              <img :src="Food.image" alt="">
              <span class="icon-arrow_lift" @click="hidden"></span>
            </div>
            <div class="contentFood">
              <h1 class="title">{{Food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{Food.sellCount}}份</span>
                <span class="rating">好评率{{Food.rating}}%</span>
              </div>
              <div class="price">
                <span class="new">￥{{Food.price}}起</span>
                <span class="old" v-show="Food.oldPrice">￥{{Food.oldPrice}}</span>
              </div>
              <div class="cart-wrapper">
                <ShoppingCar v-show="Food.count||Food.count>0" :food="Food"></ShoppingCar>
                <div class="buy" v-show="!Food.count||Food.count===0" @click="addFirst">加入购物车</div>
              </div>
            </div>
            <split v-show="Food.info"></split>
            <div class="info" v-show="Food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{Food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
              <h1 class="title">商品评价</h1>
              <ratingSelect :desc="desc" :selectType="selectType" :onlyContent="onlyContent"
                            :ratings="ratings"
                            @typechange="TypeChange" @changeContent="ChangeContent"></ratingSelect>
              <div class="rating-wrapper">
                <ul v-show="Food.ratings && Food.ratings.length">
                  <li  v-show="needshow(rating.rateType,rating.text)" v-for="rating in Food.ratings" class="item-rating">
                    <div class="user">
                      <span class="name">{{rating.username}}</span>
                      <span class="avatar">
                         <img :src="rating.avatar" width="12" height="12" alt="">
                       </span>
                      <div class="time">{{ ChangeTime(rating.rateTime)}}</div>
                      <p class="text">
                           <span :class="{'icon-thumb_down':rating.rateType===0,
 'icon-thumb_up':rating.rateType===1}"></span>{{rating.text}}
                      </p>
                    </div>
                  </li>
                </ul>
                <div class="no-rating" v-show="!Food.ratings || !Food.ratings.length">
                  暂无评价
                </div>
              </div>
            </div>
          </div>

        </div>


   </transition>

</template>

<script>
  import BScroll from 'better-scroll'
  import ShoppingCar from 'components/numControl/numControl'
  import split from 'components/split/split'
  import Vue from 'vue'
  import ratingSelect from 'components/ratingSelect/ratingSelect'
  import formatTime from 'common/js/formatTime'
  const POSTITIVE =0
  const NEGATIVE=1
  const ALL=2
    export default {
      name: "food",
      props: {
        Food: {
          type: Object
        }
      },
      components: {
        ShoppingCar: ShoppingCar,
        split: split,
        ratingSelect: ratingSelect
      },
      data: function () {
        return {
          show_flag: false,
          selectType: ALL,
          onlyContent: false,
          ratings: this.Food.ratings,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          },
        }
      },
      watch: {
        // 'Food'() {
        //   this._initScroll()
        // }
      },
      methods: {
        _initScroll() {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodsWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        },
        ChangeTime: function (time) {
          let Time = new Date(time)
          return formatTime.TimeChange(Time)
        },
        needshow: function (type, text) {
          if (this.onlyContent && !text) {
            return false
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type == this.selectType
          }
        },
        TypeChange: function (type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh()
          })

        },
        ChangeContent: function (value) {
          this.onlyContent = value
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        },
        show: function () {
          this.show_flag = true;
          this.ratings = this.Food.ratings
          this.selectType = ALL;
          this.onlyContent = true
          this.desc = {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        },
        hidden: function () {
          this.show_flag = false;
        },
        addFirst: function () {
          Vue.set(this.Food, 'count', 1)
          this.Food.count = 1
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
  .move-enter-active, .move-leave-active {
    transition: all .5s;
  }
  .move-enter, .move-leave-to {
    transform translate3d(0,100%,0)
  }
  .food{
  position fixed
  z-index 30
  left 0;
  top:0
  bottom 0
  right 0
  width 100%
  background-color #fff
  overflow hidden
  &.content{
    padding :0
    width 100%
  }
  .imgae-header{
    position relative
    width 100%
    height 0
    padding-top 100%
    img{
        position absolute
        top:0
        left:0
        width 100%
        height 100%
      }
    .icon-arrow_lift{
      position absolute
      z-index 10
      top: 10px
      left 0
      font-size 20px
      padding 13px
      color #fff
    }
  }
  .contentFood{
    padding 18px
    position relative
    .title{
      line-height 14px
      margin-bottom 8px
      font-size 14px
      font-weight 700
      color rgb(7,17,27)

    }
    .detail{
      margin-bottom 18px
      line-height 10px
      font-size 0
      .sell-count,.rating{
        font-size 10px
        color rgb(147,153,159)
      }
      .sell-count{
        margin-right 12px
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
    .cart-wrapper{
       position absolute
       right 12px
       top:60px
      .buy{
        line-height 24px
        padding 0 12px
        border-radius 12px
        font-size 10px
        color #fff
        background-color rgb(0,160,220)
      }
     }
  }

  .info{
    padding 18px
    .title{
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7,17,27)
    }
    .text{
      line-height 24px
      padding 0 8px
      font-size 12px
      color rgba(77,85,83,0.8)
    }
  }
  .rating{
    padding-top 18px
    padding-bottom 50px
    .title{
      line-height 14px
      margin-left 18px
      font-size 14px
      color rgb(7,17,27)
    }
    .rating-wrapper{
      padding 0 18px
      .item-rating{
        width 100%
        position relative
        padding 16px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        height 30px
        .user{
          width 100%
          position absolute
          line-height 12px
          font-size 0
          .name{
            left 0
            top:16px
            display inline-block
            margin-right 10px
            vertical-align top
            font-size 10px
            color rgb(147,153,159)
          }
          .avatar{
            left 20px
            top:16px
            border-radius 50%
          }
        }
        .time{
          position absolute
          right 0
          top:0
          margin-bottom 6px
          line-height 12px
          font-size 10px
          color rgb(147,153,159)
        }
        .text{
          line-height 16px
          font-size 12px
          color rgb(7,17,27)
          .icon-thumb_up,.icon-thumb_down{
            margin-right 4px
            line-height 24px
            font-size 12px
          }
          .icon-thumb_up{
            color rgb(0,160,220)
          }
          .icon-thumb_down{
            color rgb(147,153,159)
          }
        }
      }
      .no-rating{
        padding-top 10px
        font-size 14px
        color #7e8c8d
      }
    }
  }
}

</style>
