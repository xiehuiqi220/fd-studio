// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据id获取项目信息 GET /api/getAllProjects */
export async function getAllSb(pid: string | undefined) {
  return request<{ success: boolean; data: [API.Storyboard] }>('/gateway/storyboard/query', {
    method: 'GET',
    params: { pid },
  });
}

/** 根据id获取分镜基本信息 GET /api/getStoreboardSettings */
export async function getConfig(sid: string | undefined, needShots: boolean) {
  return request<{ success: boolean; data: API.Storyboard; errorMsg: string }>(
    '/gateway/storyboard/getById',
    {
      method: 'GET',
      params: { sid, needShots },
    },
  );
}

/** 更新分镜 GET /api/updateShot */
export async function updateConfig(sb: API.Storyboard) {
  return request<{ success: boolean; data: any; errorMsg: string }>('/gateway/storyboard/save', {
    method: 'POST',
    data: sb,
  });
}

/** 更新分镜 GET /api/updateShot */
export async function updateShot(shot: API.ShotType) {
  return request<{ success: boolean; data: any; errorMsg: string }>('/gateway/shot/save', {
    method: 'POST',
    data: shot,
  });
}

/** 更新分镜 GET /api/updateShot */
export async function removeShot(id: string) {
  return request<{ success: boolean; data: any; errorMsg: string }>('/gateway/shot/remove', {
    method: 'POST',
    data: { id },
  });
}

/** 更新分镜 GET /api/updateShot */
export async function createEmptyShot(shot: API.ShotType) {
  return request<{ success: boolean; data: any; errorMsg: string }>('/gateway/shot/createEmpty', {
    method: 'POST',
    data: shot,
  });
}
