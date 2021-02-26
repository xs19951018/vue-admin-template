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

export function getAllRoleList() {
  return request({
    url: '/auth/getAllRoleList',
    method: 'post'
  })
}

export function getRoleIdsByUser(data) {
  return request({
    url: '/auth/getRoleIdsByUser',
    method: 'post',
    data
  })
}

export function updateUserRoleRelation(data) {
  return request({
    url: '/auth/updateUserRoleRelation',
    method: 'post',
    data
  })
}
