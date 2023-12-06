import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React, { useEffect } from 'react';
import SList from '../../components/Project/ScriptList';

const ScriptList: React.FC = (props) => {
  const { initialState } = useModel('@@initialState');
  const pid = initialState?.currentProjectId;

  useEffect(() => {}, []);

  return (
    <PageContainer>
      <SList pid={pid} />
    </PageContainer>
  );
};

export default ScriptList;
