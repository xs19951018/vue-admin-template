import request from '@/utils/request'

export function getResourceCategoryList(data) {
  return request({
    url: '/auth/getResourceCategoryList',
    method: 'post',
    data
  })
}

export function addResourceCategory(data) {
  return request({
    url: '/auth/addResourceCategory',
    method: 'post',
    data
  })
}

export function updateResourceCategory(data) {
  return request({
    url: '/auth/updateResourceCategory',
    method: 'post',
    data
  })
}

export function delResourceCategory(data) {
  return request({
    url: '/auth/delResourceCategory',
    method: 'post',
    data
  })
}

export function getResourceTree() {
  return request({
    url: '/auth/getResourceTree',
    method: 'post'
  })
}