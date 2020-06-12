// 引入mock 数据
import Mock from 'mockjs'
// 引入 json 数据
import data from './dbs/music.json'

Mock.mock('/music', { code: 0, data: data.music2 })
