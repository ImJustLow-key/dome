<template>
  <div class="search" ref="search">
      <div class="search-box">
         <input ref="query" v-model="query" class="box"/>
       </div>
      <scroll ref="suggest"
          class="suggest"
          :data="result" 
          :pullup='true'
          @scrollToEnd="searchMore" 
          
       >
       <ul class="suggest-list" ref="suggestlist">
      <li @click="selectItem(item, index)" class="suggest-item" v-for="(item, index) in result">
        <div class="name">
          <p class="text" v-html="getDisplayName (item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title="" class='loading'></loading>
    </ul>
    </scroll>


  </div>
</template>

<script type="text/ecmascript-6">
  import {search} from '../../api/search'
  import {createSong} from '../../common/js/song'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {mapActions, mapMutations, mapGetters} from 'vuex'
  
  export default {
    data () {
      return {
        result: [],
        query: '',
        hasMore: false,
        page: 1,
        A: ''
      }
    },
    mounted () {
    },
    computed: {
      ...mapGetters([
        'sequenceList'
      ])
    },
    created () {
    },
    methods: {
      search () {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, '', '20').then((res) => {
          if (res.code === 0) {
            this.result = this._genResult(res.data)
            // console.log(res.data)
            this._checkMore(res.data)
          }
        })
      },
      _genResult (data) {
        let ret = []
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      getDisplayName (item) {
        return `${item.name}-${item.singer}`
      },
      searchMore () {
        this.hasMore = true
        this.page++
        search(this.query, this.page, '', 20).then((res) => {
          if (res.code === 0) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _checkMore (data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * 20) > song.totalnum) {
          this.hasMore = false
        }
      },
      selectItem (item, index) {
        this.singlePlay({
          list: item,
          index: this.sequenceList.length
        })
        this.query = ''
        // console.log(this.sequenceList)
        // this.sa(item)
      },
      ...mapMutations({
        setListControl: 'SET_LIST_CONTROL',
        sa: 'SET_SEQUENCE_LIST'
      }),
      ...mapActions([
        'selectPlay',
        'singlePlay'
      ])
    },
    watch: {
      query () {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped>
   .search{
     position: fixed;
    top: 4em;
    left: 0;
    bottom: 0;
    right: 0;
   }
   .search-box{
     width: 80%;
     height: 40px;
     text-align:center;
     margin:15px auto;
     }
  .box{
      flex: 1;
      margin: 0 5px;
      background: #f6f6f6;
      font-size: 20px;
      border-radius: 10px;
  }
      


  .suggest{
    height: 100%;
    overflow: hidden;
  }
    .suggest-list{
      padding:30px;
      }


      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 30px;
        width: 30px;
      }
        
      
      .name{
        flex: 1;
        overflow: hidden;
      }
       
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
     }


     .loading{
       margin:-20px 0;
     }
</style>