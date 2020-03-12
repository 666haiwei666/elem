<template>
    <div class="ratingSelect">
       <div class="ratingType">
         <span class="block positive" :class="{active:selectType===2}" @click="select(2)">全部<span class="count">{{POSTITIVES+NEGATIVES}}</span></span>
         <span class="block positive" :class="{active:selectType===0}" @click="select(0)">{{desc.positive}}<span class="count">{{POSTITIVES}}</span></span>
         <span class="block negative" :class="{active:selectType===1}" @click="select(1)">{{desc.negative}}<span class="count">{{NEGATIVES}}</span></span>
       </div>
       <div class="switch">
         <span class="icon-check_circle" :class="{on:onlyContent===true}" @click="change_On"></span>
         <span class="text">只看有内容的评价</span>
       </div>
    </div>
</template>

<script>
  const POSTITIVE=0
  const NEGATIVE=1
  const ALL=2
    export default {
        name: "ratingSelect",
        props:{
          ratings: {
            type: Array,
            default:function () {
              return []
            }
          },
          selectType:{
              type:Number,
              default:ALL
          },
          onlyContent:{
               type:Boolean,
               default:false
            },
          desc:{
               type:Object,
               default:function () {
                 return {
                   all:'全部',
                   positive:'满意',
                   negative:'不满意'
                 }
               }
          }


     },
        data:function(){
          return {
          }
        },
        methods:{
          select:function (type) {
            //this.selectType=type
            console.log(type);
            this.$emit('typechange',type)
          },
          change_On:function () {
           // this.onlyContent=!this.onlyContent
            this.$emit('changeContent',!this.onlyContent)
          }
        },
        computed:{
            POSTITIVES:function() {
              return this.ratings.filter((rating)=>{
                return rating.rateType===POSTITIVE
              }).length
            },
           NEGATIVES:function () {
             return this.ratings.filter((rating)=>{
               return rating.rateType===NEGATIVE
             }).length
           }
          }

    }
</script>

<style lang="stylus" scoped>
  .ratingSelect {
    .ratingType {
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      .block {
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        font-size 12px
        color rgb(77, 85, 93)
        &.active {
          color: #fff
        }
      }
      .count {
        font-size 8px
        margin-left 2px
        line-height 16px
      }
      .positive {
        background rgba(0, 160, 220, 0.2)
        &.active {
          background rgb(0, 160, 220)
        }
      }
      .negative {
        background rgba(77, 85, 93, 0.2)
        &.active {
          background rgb(77, 85, 93)
        }
      }
    }

    .switch {
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27.0 .1)
      color rgb(147, 153, 159)
      font-size 0
      .icon-check_circle {
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
        &.on {
          color #00c850
        }
      }
        .text {
          display inline-block
          vertical-align top
          font-size 12px
        }


    }
  }


</style>
