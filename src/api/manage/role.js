import request from '@/utils/request'

export function getRoleList(data) {
  return request({
    url: '/auth/getRoleList',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/auth/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/auth/updateRole',
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: '/auth/delRole',
    method: 'post',
    data
  })
}
