// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据id获取项目信息 GET /api/getAllProjects */
export async function getScriptById(sid: string | undefined) {
  return request<{ success: boolean; data: API.Script }>('/gateway/script/getById', {
    method: 'GET',
    params: { sid },
  });
}

/** 更新项目信息 GET /api/getAllProjects */
export async function updateScript(scriptData: API.Script) {
  return request<{ success: boolean; data: string; errorMsg: string }>('/gateway/script/save', {
    method: 'POST',
    data: scriptData,
  });
}
