import Vue from 'vue'
import Router from 'vue-router'
import Singer from '../components/singer/Singer'
import Rank from '../components/rank/Rank'
import Search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail'
import RankList from '../components/rank-list/rank-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/rank'
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
