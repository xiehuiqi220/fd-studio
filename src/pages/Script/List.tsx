import { PageContainer } from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect } from 'react';
import SList from '../../components/Project/ScriptList';

const ScriptList: React.FC = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const params = useParams();
  const pid = params.pid || '';
  if (!pid) {
    message.error('错误的参数');
    throw '错误的参数';
  }

  useEffect(() => {
    if (pid) {
      setInitialState({
        ...initialState,
        currentProjectId: pid, //设置当前默认工作区项目
      });
    }
  }, []);

  return (
    <PageContainer>
      <SList pid={pid} />
    </PageContainer>
  );
};

export default ScriptList;
