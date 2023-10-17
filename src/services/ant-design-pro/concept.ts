// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有地点 GET /api/getAllLocations */
export async function getAllLocations(needPicture:false) {
  return request<{ success: boolean, data: API.Location[]}>('/api/getLocations', {
    method: 'GET',
    params: { needPicture },
  });
}

/** 根据id获取地点 GET /api/getLocationById */
export async function getLocationById(lid:string) {
  return request<{ success: boolean, data: API.Location[]}>('/api/getLocationById', {
    method: 'GET',
    params: { lid },
  });
}

/** 更新地点 GET /api/updateShot */
export async function updateLocation(shot:API.ShotType) {
  return request<{ success: boolean, data: string }>('/api/updateLocation', {
    method: 'GET',
    params: { shot },
  });
}

/** 上传图片 GET /api/addPicture */
export async function addPicture(pic:API.ConceptPicture) {
  return request<{ success: boolean, data: string }>('/api/addPicture', {
    method: 'GET',
    params: { pic },
  });
}
