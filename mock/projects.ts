import { Request, Response } from 'express';
import Mock from 'mockjs';

const getAllProjects = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data|0-10': [{
      'id': '@guid',
      'title': '@title(1,10)',
      'logo': '@image(100x100)',
      'description': '@csentence(0,1000)'
    }]
  }));
};

const getProjectById = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data': {
      'id': '@guid',
      'title': '@title(1,10)',
      'logo': '@image(100x100)',
      'description': '@csentence(0,1000)'
    }
  }));
};

const updateProject = (req: Request, res: Response) => {
  res.json({
    success: true,
    'data': JSON.stringify(req.query)
  });
};

export default {
  'GET /api/getAllProjects': getAllProjects,
  'GET /api/getProjectById': getProjectById,
  'GET /api/updateProject': updateProject
};
