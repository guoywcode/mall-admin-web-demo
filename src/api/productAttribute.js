import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/productAttribute/list',
    method: 'get'
  })
}

export function getListByCategoryId(categoryId) {
  return request({
    url: 'api/productAttribute/list/' + categoryId,
    method: 'get'
  })
}
