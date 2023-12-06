// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有地点 GET /api/getAllLocations */
export async function getAllLocations(pid: string, needPicture: false) {
  return request<{ success: boolean; data: API.Location[] }>('/gateway/location/query', {
    method: 'GET',
    params: { pid: pid },
  });
}

/** 获取所有角色 GET /api/getAllCharacters */
export async function getAllCharacters(pid: string, needPicture: false) {
  return request<{ success: boolean; data: API.Location[] }>('/gateway/character/query', {
    method: 'GET',
    params: { pid },
  });
}

/** 根据id获取地点 GET /api/getLocationById */
export async function getLocationById(lid: string) {
  return request<{ success: boolean; data: API.Location; errorMsg: string }>(
    '/gateway/location/getById',
    {
      method: 'GET',
      params: { id: lid },
    },
  );
}

/** 更新地点 GET /api/updateShot */
export async function saveLocation(loc: API.Location) {
  return request<{ success: boolean; data: string; errorMsg: string }>('/gateway/location/save', {
    method: 'POST',
    data: loc,
  });
}
/** 根据id获取地点 GET /api/getLocationById */
export async function getCharacterById(lid: string) {
  return request<{ success: boolean; data: API.Location; errorMsg: string }>(
    '/gateway/character/getById',
    {
      method: 'GET',
      params: { id: lid },
    },
  );
}

/** 更新地点 GET /api/updateShot */
export async function saveCharacter(loc: API.Location) {
  return request<{ success: boolean; data: string; errorMsg: string }>('/gateway/character/save', {
    method: 'POST',
    data: loc,
  });
}

/** 上传图片 GET /api/addPicture */
export async function addPicture(pic: API.ConceptPicture) {
  return request<{ success: boolean; data: string }>('/api/addPicture', {
    method: 'GET',
    params: { pic },
  });
}
