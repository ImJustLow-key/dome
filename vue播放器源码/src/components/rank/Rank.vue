<template>
  <div class="rank" ref="rank">
   <scroll :data="rankList" class="rankscroll" ref="recommendscroll">
   <div>
  
     <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
         <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" @load="loadImage">
              </a>
            </div>
          </slider>
       </div>



    <ul>
        <h3>排行榜</h3>
        <li class="item" v-for="item in rankList" @click="selectItem(item)">
          <div class="icon">
            <img width="60" height="60" :src="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>

    </div>

    </scroll>
    <div v-show="!rankList.length" class="loading-container">
        <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTopList} from '../../api/rank'
  import Scroll from '../../base/scroll/scroll'
  import {mapMutations} from 'vuex'
  import Loading from '../../base/loading/loading'
  import {getRecommend} from '../../api/recommend'
  import Slider from '../../base/slider/slider'

  export default {
    created () {
      this._getRankList()
      this._getRecommend()
    },
    data () {
      return {
        recommends: [],
        rankList: []
      }
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === 0) {
            this.recommends = res.data.slider
          }
        })
      },
      loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.recommendscroll.refresh()
        }
      },
      _getRankList () {
        getTopList().then((res) => {
          if (res.code === 0) {
            this.rankList = res.data.topList
            // console.log(this.topList)
          }
        })
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setRankList(item)
      },
      ...mapMutations({
        setRankList: 'SET_RANK_LIST'
      })
    },
    components: {
      Scroll,
      Loading,
      Slider
    }
  }
</script>

<style scoped >
   .rank{
    position: absolute;
    top: 4em;
    bottom: 0;
    width: 100%;
   }
   .rankscroll{
     position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
   }
   .item{
    display: flex;
    margin: 0 20px;
    padding:5px 0 10px 0;
    height: 60px;
   }
   .songlist{
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 15px;
          height: 60px;
          font-size: 15px;
          width:70%;
   }     

   .song{
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
   .loading-container{
       position: absolute;
        width: 100%;
        top: 45%;
    }

    h3{
        text-align: center;
        margin:5px 0;
     }
</style>
