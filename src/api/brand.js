import request from '@/utils/request'
import qs from 'qs'

export function branchList() {
  return request({
    url: '/api/brand/listAll'
  })
}

export function updateShowStatus(data) {
  return request({
    url: '/api/brand/updateShowStatus',
    method: 'post',
    data: qs.parse(data)
  })
}
