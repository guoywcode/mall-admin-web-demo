import request from '@/utils/request'

export function getList() {
  return request({
    url: 'api/oss/aliyun/policy',
    method: 'get'
  })
}
