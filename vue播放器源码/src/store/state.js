import {playMode} from '../common/js/config'

const state = {
  singer: {},
  playing: false,      // 播放控制
  fullScreen: false,
  listControl: false,    // 列表控制
  playlist: [],
  sequenceList: [],     // 点击歌曲的顺序列表
  mode: playMode.sequence,
  currentIndex: -1,
  rankList: {},          // 排行榜数据
  showPlaylist: false    // 显示播放列表
}

export default state
