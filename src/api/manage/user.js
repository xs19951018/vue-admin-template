import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/auth/getUserList',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/auth/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/auth/updateUser',
    method: 'post',
    data
  })
}

export function delUser(data) {
  return request({
    url: '/auth/delUser',
    method: 'post',
    data
  })
}

export function changeUserStatus(data) {
  return request({
    url: '/auth/changeUserStatus',
    method: 'post',
    data
  })
}