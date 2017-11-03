<template>
  <div id="app" ref="app" @touchstart="onShortcutTouchStart" 
  @touchmove="onShortcutTouchMove">
      <!-- 头部 -->
    <div class="g-header">
      <h2 class="text">Gg-Music</h2>
    </router-link>
    </div>
    <!-- 导航栏-->
    <div class="tab">
  
      <router-link tag="div" class="tab-t" to="/rank"><span class="tab-t1">推荐</span></router-link>
      
      <router-link tag="div" class="tab-t" to="/singer"><span class="tab-t1">歌手</span></router-link>
      
      
      <router-link tag="div" class="tab-t" to="/search"><span class="tab-t1">搜素</span></router-link>    
  </div>
  <transition :name="transitionName">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </transition>
   <player></player>
  </div>
</template>

<script>
import Player from './components/player/player'

export default {
  date () {
    return {
      transitionName: ''
    }
  },
  created () {
    this.touch = {}
  },
  mounted () {
    this.slide = 0
  },
  methods: {
    getIndex (array, value) {
      let index = 0
      for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
          index = i
          return index
        }
      }
    },
    ps (e) {
      let list = ['rank', 'singer', 'search']
      let Depth = this.$route.path.split('/')[1]
      let i = this.getIndex(list, Depth)
      let firstTouch = e.touches[0]
      this.touch.x2 = firstTouch.pageX
      let delta = this.touch.x2 - this.touch.x1
      if (delta < 0) {
        let lu = ''
        if (i === list.length - 1) {
          lu = list[i]
        } else {
          lu = list[i + 1]
        }
        this.$router.push({
          path: `/${lu}`
        })
      } else {
        let lu = ''
        if (i === 0) {
          lu = list[i]
        } else {
          lu = list[i - 1]
        }
        this.$router.push({
          path: `/${lu}`
        })
      }
    },
    onShortcutTouchStart (e) {
      let firstTouch = e.touches[0]
      this.touch.x1 = firstTouch.pageX
      this.touch.y1 = firstTouch.pageY
    },
    onShortcutTouchMove (e) {
      // this.slide = true
      // console.log(this.slide)
      let firstTouch = e.touches[0]
      this.touch.x2 = firstTouch.pageX
      this.touch.y2 = firstTouch.pageY
      let deltay = Math.abs(this.touch.y2 - this.touch.y1)
      let deltax = Math.abs(this.touch.x2 - this.touch.x1)
      if (deltax > deltay && deltax > 5) {
        this.slide++
      }
      // console.log(deltax)
      if (this.slide > 4) {
        this.ps(e)
        this.slide = 0
      }
    }
  },
  watch: {
    '$route' (to, from) {
      const list = ['rank', 'singer', 'search']
      let toDepth = to.path.split('/')[1]
      let fromDepth = from.path.split('/')[1]
      let toIndex = this.getIndex(list, toDepth)
      let fromIndex = this.getIndex(list, fromDepth)
      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
    }
  },
  components: {
    Player
  }
}
</script>

<style>
      #app{
        width:100%;
        height:100%;
        overflow: hidden;
      }
      /* 头部 */
       .g-header{
          background: #d5f5f5;
       }
       
      .g-header .text{

         text-align: center;
         
      }
     /* 导航 */
      .tab{
        display: flex;
        height: 2em;
        background: #d5f5f5;
        
         align-items: center;
        justify-content: center;
      }
      .tab .tab-t{
         flex:1;
         text-align: center;
      }
      .tab .tab-t{
        color: #000; 
      }
     
     .router-link-active .tab-t1{
        
          font-size:20px;
          font-weight:bold;
     }
        
  .slide-left-enter-active{
    transition: all 0.3s;
  }
    

  .slide-left-enter{
    transform: translateX(100%);
  }   

  .slide-right-enter-active{
    transition: all 0.3s;
  }
    

  .slide-right-enter{
    transform: translateX(-100%);
  }   
</style>
