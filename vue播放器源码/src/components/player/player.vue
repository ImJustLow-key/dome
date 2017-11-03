<template>
  <div class="player" v-show="playlist.length>0 || sequenceList.length>0">
    <transition name="normal"
    >
      <div class="normal-player" v-show="fullScreen">
         <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <span class="icon-back"><b><</b></span>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" >
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>

       <div class="bottom">
          <div class="progress-wrapper">
            <div class="icon i-left" :class="disableCls">
              <span @click="prev" class="icon-prev"></span>
            </div>
            <div class="icon i-center" :class="disableCls">
              <span @click="togglePlaying" :class="playIcon"></span>
            </div>
            <div class="icon i-right" :class="disableCls">
              <span @click="next" class="icon-next"></span>
            </div>
          </div>
        </div>


      </div>    

     </transition>
     <transition name="slide">
      <div class="showPlaylist" v-show="showPlaylist" ref="showPlaylist">
       <h3 class="bfqd">播放清单</h3> 
       <scroll :data="showlists"  class="showPlaylistscroll" ref="list">
           <ul> 
             <li v-for='(item, index) in showlists' @click="PlayIndex(index)">
              <span v-html="getDisplayName (item)"></span>
             </li>
           </ul>
        </scroll>
      </div>
     </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
           <span @click.stop="togglePlaying" :class="miniIcon"></span>
        </div>
        <div class="control" >
          <span class="icon-playlist" @click.stop="showPlaylists"></span>
        </div>

      </div>  
       </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" loop></audio>
  </div>       
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import Scroll from '../../base/scroll/scroll'

  export default {
    data () {
      return {
        songReady: false,
        showlists: []
      }
    },
    computed: {
      disableCls () {
        return this.songReady ? '' : 'disable'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'sequenceList',
        'showPlaylist',
        'listControl'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      togglePlaying () {
        this.setPlayingState(!this.playing)
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      prev () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      ready () {
        this.songReady = true
        // this.savePlayHistory(this.currentSong)
      },
      showPlaylists () {
        if (this.listControl) {
          this.showlists = this.sequenceList
        } else {
          this.showlists = this.playlist
        }
        this.showPlaylist ? this.setShowPlaylist(false) : this.setShowPlaylist(true)
      },
      error () {
        this.songReady = true
      },
      PlayIndex (index) {
        this.setCurrentIndex(index)
      },
      getDisplayName (item) {
        return `${item.name}-${item.singer}`
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setShowPlaylist: 'SET_SHOWPLAY_LIST'
      })
    },
    watch: {
      currentSong () {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
  

 .player .normal-player {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 150;
      background: #fff;
      }
      
      .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
      }
        
      .top{
        position: relative;
      }
        
        .back{
          position:absolute;
          top: 0px;
          left: 10px;
          z-index: 50;
        }
          
          .icon-back{
            display: block;
            padding: 5px;
            color: #000;
            transform: rotate(-90deg);
            font-size: 30px;
          }
            
        .title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          color: #000;
          font-size: 23px;
        }
          
        .subtitle{
          line-height: 20px;
          text-align: center;
          color: #000;
          font-size: 15px;
        }
          
      .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
      }
        
        .middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
        }
          
          .cd-wrapper{
             position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
          }
           
            .cd{
             width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
            }
              
              .image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
                

          
           
           
             
       
         
         
      .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
      }
        
       
          
          
            
        
              
        .progress-wrapper{
           display: flex;
          align-items: center;
          width: 65%;
          margin: 0px auto;
          padding: 10px 0;
        }
         
         
            
         
       
          
            
          
          
           .icon-pause {
             display:inline-block;
             width:2em;
             height:2em;
             background-image: url(./1.png);
             background-size: 100% ;
           }
          
          
           .icon-play{
             display:inline-block;
             width:2em;
             height:2em;
             background-image: url(./2.png);
             background-size: 100% ;
           }
        
          .icon-next{
             display:inline-block;
             width:2em;
             height:2em;
             background-image: url(./3.png);
             background-size: 100% ;
          }
       .icon-prev{
         display:inline-block;
             width:2em;
             height:2em;
             background-image: url(./4.png);
             background-size: 100% ;
       }

     .icon-playlist{
       display:inline-block;
             width:2em;
             height:2em;
             background-image: url(./5.png);
             background-size: 100% ;
     }


    .mini-player{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;
      background: #d1f1f1;
      box-sizing: border-box;
      border-top:1px solid #f6f6f6;
    }
     
      
      .icon{
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
      }
        
        img{
        border-radius: 50%;
        }
          
        
      .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
        
        .name{
          margin-bottom: 2px;
          font-size: 15px;
        }
          
        .desc{
          font-size: 14px;
        }
          
      .control{
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
      }
        
        
         
       
      .disable{
          background: red;
      }


    .showPlaylist{
      position: fixed;
      left: 0;
      bottom: 60px;
      width: 100%;
      height: 51%;
      background: #d1f1f1;
      overflow: hidden;
      z-index:100;

        padding-bottom: 50px;
      }
      .showPlaylist ul{
        width: 95%;
        margin:5px auto;
      }
      .showPlaylist ul li{
        padding:5px 5px;
      }
      .span{
       float:right;
      }
      .showPlaylistscroll{
        width:100%;
        height:100%;
      }
      .bfqd{
        position:relative;
        height:40px;
        box-sizing: border-box;
        border-bottom:1px solid #f6f6f6;
        line-height: 40px;
        width:95%;
        margin:0 auto;
        padding:0 5px;
        z-index:200;
        background: #d1f1f1;
      }
      .span1{
        font-size: 15px;
      }




  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
    

  .slide-enter, .slide-leave-to{
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }


    &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)

          
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
      


     .mini-enter-active, .mini-leave-active{
        transition: all 0.4s;
     }
      .mini-enter, .mini-leave-to{
        opacity: 0;
      }


</style>