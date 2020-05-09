import request from '@/utils/request'

export function policy() {
  return request({
    url: 'api/oss/aliyun/policy',
    method: 'get'
  })
}
