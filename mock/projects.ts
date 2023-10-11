import { Request, Response } from 'express';
import Mock from 'mockjs';

const getAllProjects = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data|1-10': [{
        'id': '@color',
        'title': '@csentence(1,20)',
        'description': '@csentence(0,1000)'
    }]
}));
};

export default {
  'GET /api/getAllProjects': getAllProjects,
};
