import React, { useEffect } from 'react';
import CardList from '../../components/Project/CardList';

import { PageContainer } from '@ant-design/pro-components';

const ProjectList: React.FC = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <CardList />
    </PageContainer>
  );
};

export default ProjectList;
