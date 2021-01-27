import request from '@/utils/request'

export function getMenuList(data) {
  return request({
    url: '/auth/getMenuList',
    method: 'post',
    data
  })
}

export function addMenu(data) {
  return request({
    url: '/auth/addMenu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/auth/updateMenu',
    method: 'post',
    data
  })
}

export function delMenu(data) {
  return request({
    url: '/auth/delMenu',
    method: 'post',
    data
  })
}
