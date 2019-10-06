import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getExcelentStory () {
  const url = 'http://121.41.32.159/tom/public/index.php/api/story/story_excellent'
  const data = Object.assign({}, commonParams, {
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
