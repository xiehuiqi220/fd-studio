// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有分镜信息 GET /api/getSbShots */
export async function getSbShots(sid: string | undefined) {
  return request<{ success: boolean, data: API.ShotType[]}>('/api/getSbShots', {
    method: 'GET',
    params: { sid },
  });
}

/** 根据id获取分镜基本信息 GET /api/getStoreboardSettings */
export async function getStoreboardSettings(sid: string | undefined) {
  return request<{ success: boolean, data: API.Storyboard }>('/api/getStoreboardSettings', {
    method: 'GET',
    params: { sid },
  });
}

/** 更新分镜 GET /api/updateShot */
export async function updateShot(shot:API.ShotType) {
  return request<{ success: boolean, data: string }>('/api/updateShot', {
    method: 'GET',
    params: { shot },
  });
}
