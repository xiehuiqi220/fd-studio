import { useModel } from '@umijs/max';
import { useParams } from 'umi';
import { Button, Result, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { getProjectById, updateProject } from '@/services/ant-design-pro/api';
import CardList from '../../components/Project/CardList'

import {
  ProCard,
  PageContainer
} from '@ant-design/pro-components';
import { waitTime } from '@/Utils/time';

const ProjectList: React.FC = (props) => {
  useEffect(() => {
  }, []);

  return (
    <PageContainer>
      <CardList />
    </PageContainer>
  )
};

export default ProjectList;
