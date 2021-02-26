import request from '@/utils/request'

export function getResourcePage(data) {
  return request({
    url: '/auth/getResourcePage',
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

export function getRoleResourceList(data) {
  return request({
    url: '/auth/getRoleResourceList',
    method: 'post',
    data
  })
}

export function updateRoleResourceRelation(data) {
  return request({
    url: '/auth/updateRoleResourceRelation',
    method: 'post',
    data
  })
}
