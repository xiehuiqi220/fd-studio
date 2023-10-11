import { Request, Response } from 'express';
import Mock from 'mockjs';

const getAllProjects = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data|1-10': [{
        'id': '@guid',
        'title': '@title(1,10)',
        'logo': '@image(100x100)',
        'description': '@csentence(0,1000)'
    }]
}));
};

export default {
  'GET /api/getAllProjects': getAllProjects,
};
