import { Request, Response } from 'express';
import Mock from 'mockjs';

const getLocations = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data|0-10': [{
      'id': '@guid',
      'title': '@title(1,10)',
      'logo': '@image(100x100)',
      'description': '@csentence(0,100)'
    }]
  }));
};

const getLocationById = (req: Request, res: Response) => {
  res.json(Mock.mock({
    success: true,
    'data': {
      'id': '@guid',
      'title': '@title(1,10)',
      'logo': '@image(100x100)',
      'description': '@csentence(0,100)'
    }
  }));
};

export default {
  'GET /api/getLocations': getLocations,
  'GET /api/getLocationById': getLocationById
};
