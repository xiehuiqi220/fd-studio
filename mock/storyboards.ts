import { Request, Response } from 'express';
import Mock from 'mockjs';

const getSbShots = (req: Request, res: Response) => {
  res.json(
    Mock.mock({
      success: true,
      'data|0-10': [
        {
          id: '@guid',
          sbId: '@guid',
          'shotNum|+1': 1,
          picture: '@image(200x100)',
          content: '@csentence(0,100)',
          'duration|1-10': 1,
          move: 'pull',
          scenery: '远景',
          lens: 14,
        },
      ],
    }),
  );
};

const getStoryboardSettings = (req: Request, res: Response) => {
  res.json(
    Mock.mock({
      success: true,
      data: {
        id: '@guid',
        title: '@title(1,10)',
      },
    }),
  );
};

const updateSb = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: JSON.stringify(req.query),
  });
};

const updateShot = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: JSON.stringify(req.query),
  });
};

export default {
  'GET /api/getSbShots': getSbShots,
  'GET /api/getStoreboardSettings': getStoryboardSettings,
  'GET /api/updateSb': updateSb,
  'GET /api/updateShot': updateShot,
};
