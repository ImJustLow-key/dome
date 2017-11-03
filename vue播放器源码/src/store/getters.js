export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const listControl = state => state.listControl

export const currentIndex = state => state.currentIndex

export const showPlaylist = state => state.showPlaylist

export const currentSong = (state) => {
  if (state.listControl) {
    return state.sequenceList[state.currentIndex] || {}
  } else {
    return state.playlist[state.currentIndex] || {}
  }
}

export const disc = state => state.disc

export const rankList = state => state.rankList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
