<template>
  <div ref="previewWrapper">
    <div class="preview" >
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size=36  :score=seller.serviceScore></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品指数</span>
            <Star  :size=36  :score=seller.score></Star>
            <span class="score">{{seller.score}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"
                    @typechange="TypeChange" @changeContent="ChangeContent"></ratingSelect>
      <div class="rating-wrapper" ref="ratingWrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needshow(selectType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="rateTime">{{ChangeTime(rating.rateTime)}}</div>
              <div class="star-wrapper">
                <star  :size="24" :score="rating.score"></star>
                <span class="delivery"></span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span  class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import Star from 'components/star/star'
  import Split from 'components/split/split'
  import ratingSelect from 'components/ratingSelect/ratingSelect'
  import formatTime from 'common/js/formatTime'
  const POSTITIVE =1
  const NEGATIVE=0
  const ALL=2
    export default {
        name: "preview",
        components:{
          Star:Star,
          Split:Split,
          ratingSelect:ratingSelect
        },
        data:function () {
          return {
             seller:{},
             selectType:ALL,
             onlyContent:false,
             ratings:[],
             desc:{ all:'全部',
                 positive:'满意',
                 negative:'不满意'},
        }
      },
      methods:{
        ChangeTime:function(time){
          let Time=new Date(time)
          return formatTime.TimeChange(Time)
        },
        needshow:function(type,text){
          if(this.onlyContent&&!text)
          {
            return false
          }
          if(this.selectType===ALL)
          {
            return true;
          }else {
            return type==this.selectType
          }
        },
        TypeChange:function(type){
          this.selectType=type;
          console.log(type);
        },
        ChangeContent:function(value){
          console.log(value);
          this.onlyContent=value
        },
        show:function () {
          this.ratings=this.Food.ratings
          this.selectType=ALL;
          this.onlyContent=true
          this.desc={ all:'全部',
            positive:'推荐',
            negative:'吐槽'
          }

        },
        getInfo:function () {
          let url='/static/data.json'
          this.$http.get(url).then((response)=>{
            response=response.body
            this.seller=response.seller;
            this.ratings=response.ratings;
          },(error)=>{

          })
        },
      },
      created:function () {
          this.getInfo();
        },
    }
</script>

<style lang="stylus" scoped>
.preview{
    position absolute
    top:174px
    left 0
    right 0
    bottom 0
  .overview{
    display flex
    padding 18px 0
    .overview-left{
      flex 0 0 137px
      width 137px
      border-right 1px solid rgba(7,17,147,0.1)
      text-align center
      .score{
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255,153,0)
      }
      .title{
        line-height 10px
        font-size 10px
        color rgb(7,17,27)
        margin-bottom 8px
      }
      .rank{
        padding-bottom 6px
        line-height 10px
        font-size 10px
        color rgb(147,153,159)
      }
    }
    .overview-right{
      flex 1
      padding-left 24px
      .score-wrapper{
        margin-bottom 8px
        font-size 0
        .title{
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color:rgb(7,17,27)
        }
        .star{
          display inline-block
          vertical-align top
          line-height 18px
          margin 0 12px
        }
        .score{
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(255,153,0)
        }

      }
      .delivery-wrapper{
        font-size 0
        .title{
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color:rgb(7,17,27)
        }
        .time{
           margin-left 12px
           line-height 18px
           font-size 12px
           color:rgb(147,153,159)
        }
      }
    }
  }
  .rating-wrapper{
    padding  0 18px
    .rating-item{
      display flex
      padding  18px 0
      border-bottom 1px solid rgba(7,17,27,0.1)
      .avatar{
        flex 0 0 28px
        width 28px
        margin-right 12px
        img{
          width 28px
          height 28px
          border-radius 50%
        }

      }
      .content{
        position relative
        flex 1
        width 100%
        border-radius:1px
        .name{
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7,17,27)
        }
        .rateTime{
          display inline-block
          position absolute
          top:0
          right 0
          font-size 9px
          color rgba(7,17,27,0.3)
        }
        .star-wrapper{
          margin-bottom 6px
          font-size 0
          .star{
            display inline-block
            margin-right 6px
            vertical-align top
          }
          .delivery{
            display inline-block
            vertical-align top
          }
        }
        .text{
          margin-bottom 8px
          line-height 18px
          color rgb(7,17,27)
          font-size 12px
        }
        .recommend{
          line-height 16px
          .icon-thumb_up,.item{
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          }
          .icon-thumb_up{
            color rgb(0,160,220)
          }
          .item{
            padding 0 6px
            border-radius 1px
            color rgb(147,153,159)
            background #ebf5ff
          }
        }
        .time{
          display inline-block
          vertical-align top
          line-height 18px
          font-size 9px
          color #333
        }
      }
    }
  }
}
@media screen and (max-width: 320px) {
  .overview-left {
    width 100px
    flex 0 0 100px
  }
}
@media screen and (max-width: 320px) {
  .overview-right {
    padding-left 6px
  }
}

</style>
