import request from '@/utils/request'

export function getCommentList(data) {
  return request({
    url: '/blob/getCommentList',
    method: 'post',
    data
  })
}

export function addComment(data) {
  return request({
    url: '/blob/addComment',
    method: 'post',
    data
  })
}

export function updateComment(data) {
  return request({
    url: '/blob/updateComment',
    method: 'post',
    data
  })
}

export function delComment(data) {
  return request({
    url: '/blob/delComment',
    method: 'post',
    data
  })
}
