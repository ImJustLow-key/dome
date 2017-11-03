<template>
  <div class="singer">
   <scroll :data="singers" class="listview" @scroll="scroll"
          :listen-scroll="listenScroll" :probe-type="probeType" ref="listview">
    <ul>
      <li v-for="group in singers" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectSinger(item)" v-for="item in group.items" class="list-group-item" >
            <img class="avatar" :src="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
     <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>

  </scroll>
   <div class="loading-container" v-show="!singers.length">
        <loading></loading>
      </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from '../../api/singer'
  import Singer from '../../common/js/singer'
  import Scroll from '../../base/scroll/scroll'
  import {mapMutations} from 'vuex'
  import Loading from '../../base/loading/loading'

  export default {
    data () {
      return {
        singers: [],
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created () {
      this._getSingerList()
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    computed: {
      shortcutList () {
        return this.singers.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    methods: {
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      onShortcutTouchStart (e) {
        let anchorIndex = e.target.getAttribute('data-index')
        // e.target获得目标
        // console.log(anchorIndex)
        let firstTouch = e.touches[0]  // 获得点击的第一个
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / 18 | 0 // 1
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      scroll (pos) {
        this.scrollY = pos.y
        // console.log(this.scrollY)
      },
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]  // 1
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 500)    // 滚到指定的元素
      },
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === 0) {
            this.singers = this._normalizeSinger(res.data.list)
            // console.log(res.data.list)
            // console.log(this._normalizeSinger(res.data.list))
          }
        })
      },
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: '热门',
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < 10) {   // 前十条加入热门
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
         // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === '热门') {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)  // 1
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      singers () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY (newY) {
        // console.log(newY)
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      }

    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped>
  .singer{
    position: absolute;
    top: 4em;
    bottom: 0;
    width: 100%;
  }


   .listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    }
  .list-group{
      padding-bottom: 1.5em;
      }
  .list-group-title{
        height: 2em;
        line-height: 2em;
        padding-left: 1em;
        font-size: 15px;
        }
  .list-group-item{
        display: flex;
        align-items: center;
        padding: 1em 0 0 2em;
        }

  .avatar  {
          width: 3.15em;
          height: 3.15em;
          border-radius: 50%;
          }
  .name{
          margin-left: 1em;
          }

   
   .list-shortcut{
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
    }

    .item{
        padding: 3px;
        line-height: 1;
        font-size: 15px;
    }
    li{
      list-style-type:none;
    }
    .current{
       background: #d1f1f1;
       color:#000;
    } 

    .loading-container{
       position: absolute;
        width: 100%;
        top: 45%;
    }
</style>
