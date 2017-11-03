<template>
  <div class="music-list">
    <div class="back" @click="back">
      <span class="icon-back"><b><</b> </span>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs"  class="list" ref="list">
      <div class="song-list-wrapper">
          <!-- 歌曲列表 -->
             <div class="song-list">
                <ul>
                  <li  class="item" v-for="(song, index) in songs" @click="selectItem(song, index)">
        
                    <div class="content">
                       <h2 class="name">{{song.name}}</h2>
                        <p class="desc">{{getDesc(song)}}</p>
                    </div>
                  </li>
                </ul>
             </div>

      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>

  </div>  
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {mapActions} from 'vuex'

  const RESERVED_HEIGHT = 40
  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y
        // console.log(this.scrollY)
      },
      back () {
        this.$router.back()
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      getDesc (song) {
        return `${song.singer}·${song.album}`
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY (newVal) { // 1
        console.log(newVal)
        console.log(this.minTransalteY)
        let translateY = Math.max(this.minTransalteY, newVal)
        let zIndex = 0
        let scale = 1
        this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`
        const percent = Math.abs(newVal / this.imageHeight)
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
        }
        if (newVal < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style['transform'] = `scale(${scale})`
        this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped >

  .music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f6f6f6;
    }
    
    .back{
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
    }
       .icon-back{
        display: inline-block;
        padding: 5px;
        color: #fff;
        font-size: 30px;
       }
       
    .title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      text-align: center;
      line-height: 40px;
      font-size: 23px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
      
    .bg-image{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
    }
      
      
        
          .icon-play{
             display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
 
          }
           
          .text{
            display: inline-block;
            vertical-align: middle;
            color: red;
           font-size: 20px;
          }
            
      .filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
        
    .bg-layer{
     position: relative;
      height: 100%;
       background: #f5f5f5;
    }
      
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
    }
      
      .song-list-wrapper{
        padding: 20px 30px;
      }
      .loading-container{
       position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
      

    .song-list .item{
      display: flex;
      align-items: center;
      height: 55px;
    }
     
          
      .content{
        width: 100%;
      }
        
        .name{
          font-size: 15px;

          overflow: hidden;
          text-overflow: ellipsis;
           white-space: nowrap;
   
        }
         
        .desc{

          margin-top: 4px;
          font-size: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
           white-space: nowrap;
        }

</style>