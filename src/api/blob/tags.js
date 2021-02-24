import request from '@/utils/request'

export function getTagsList(data) {
  return request({
    url: '/blob/getTagsList',
    method: 'post',
    data
  })
}

export function addTags(data) {
  return request({
    url: '/blob/addTags',
    method: 'post',
    data
  })
}

export function updateTags(data) {
  return request({
    url: '/blob/updateTags',
    method: 'post',
    data
  })
}

export function delTags(data) {
  return request({
    url: '/blob/delTags',
    method: 'post',
    data
  })
}
