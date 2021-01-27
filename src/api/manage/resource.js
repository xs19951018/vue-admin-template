import request from '@/utils/request'

export function getResourceList(data) {
  return request({
    url: '/auth/getResourceList',
    method: 'post',
    data
  })
}

export function addResource(data) {
  return request({
    url: '/auth/addResource',
    method: 'post',
    data
  })
}

export function updateResource(data) {
  return request({
    url: '/auth/updateResource',
    method: 'post',
    data
  })
}

export function delResource(data) {
  return request({
    url: '/auth/delResource',
    method: 'post',
    data
  })
}
