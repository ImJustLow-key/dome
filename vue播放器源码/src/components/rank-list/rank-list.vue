<template>
  <transition name="slide">
   <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from '../../api/rank'
  import {createSong} from '../../common/js/song'

  export default {
    created () {
      this._getMusicList()
    },
    computed: {
      title () {
        return this.rankList.topTitle
      },
      bgImage () {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'rankList'
      ])
    },
    data () {
      return {
        songs: []
      }
    },
    methods: {
      _getMusicList () {
        if (!this.rankList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.rankList.id).then((res) => {
          if (res.code === 0) {
            // console.log(res.songlist)
            this.songs = this._normalizeSongs(res.songlist)
            // console.log(this.songs)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped >
  
   /*donghua*/
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
    

  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>