import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/productCategory/list/withChildren',
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: 'api/productCategory/' + id,
    method: 'get'
  })
}

export function updateNavStatus(data) {
  return request({
    url: 'api/productCategory/updateNavStatus',
    method: 'post',
    data: data
  })
}

export function updateShowStatus(data) {
  return request({
    url: 'api/productCategory/updateShowStatus',
    method: 'post',
    data: data
  })
}
