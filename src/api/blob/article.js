import request from '@/utils/request'

export function getArticleList(data) {
  return request({
    url: '/blob/getArticleList',
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

export function addArticle(data) {
  return request({
    url: '/blob/addArticle',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/blob/updateArticle',
    method: 'post',
    data
  })
}

export function delArticle(data) {
  return request({
    url: '/blob/delArticle',
    method: 'post',
    data
  })
}

export function changeCommentStatus(data) {
  return request({
    url: '/blob/changeCommentStatus',
    method: 'post',
    data
  })
}