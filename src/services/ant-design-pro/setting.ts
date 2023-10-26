// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有分镜信息 GET /api/getSbShots */
export async function saveLocation(setting: API.Location) {
  return request<{ success: boolean, data: API.Location[]}>('/api/saveLocation', {
    method: 'POST',
    params: { setting },
  });
}

