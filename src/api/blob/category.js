import request from '@/utils/request'

export function getCategoryList(data) {
  return request({
    url: '/blob/getCategoryList',
    method: 'post',
    data
  })
}

export function getCategoryByUserId(data) {
  return request({
    url: '/blob/getCategoryByUserId',
    method: 'post',
    data
  })
}

export function addCategory(data) {
  return request({
    url: '/blob/addCategory',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/blob/updateCategory',
    method: 'post',
    data
  })
}

export function delCategory(data) {
  return request({
    url: '/blob/delCategory',
    method: 'post',
    data
  })
}
