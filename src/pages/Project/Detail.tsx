import { getProjectById } from '@/services/ant-design-pro/api';
import { history, useModel } from '@umijs/max';
import { Button, Descriptions, Divider, Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import SList from '../../components/Project/ScriptList';
import SbList from '../../components/Project/StoryBoardList';

import { PageContainer } from '@ant-design/pro-components';

const ProjecDetail: React.FC = () => {
  const params = useParams();
  const pid = params.id || '';
  const [data, setData] = useState<API.ProjectItem>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  if (!pid) {
    message.error('错误的参数');
    throw '错误的参数';
  }

  const fetchData = async () => {
    let res = await getProjectById(pid);
    if (!res?.data) {
      message.error('未找到项目数据，请稍后重试');
      return;
    }
    let data = res.data;
    setData(data);
  };

  useEffect(() => {
    fetchData();
    if (pid) {
      setInitialState({
        ...initialState,
        currentProjectId: pid, //设置当前默认工作区项目
      });
    }
  }, []);

  return (
    <PageContainer title={data.title}>
      <Descriptions
        bordered
        title="基本信息"
        size={'default'}
        labelStyle={{ maxWidth: 250, minWidth: 150, width: 200 }}
        column={1}
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.push('../edit/' + pid);
            }}
          >
            Edit
          </Button>
        }
      >
        <Descriptions.Item label="项目名">{data.title}</Descriptions.Item>
        <Descriptions.Item label="图片">
          <Image src={data.logo} width={400} />
        </Descriptions.Item>
        <Descriptions.Item label="导演">{data.director}</Descriptions.Item>
        <Descriptions.Item label="类型">{data.type}</Descriptions.Item>
        <Descriptions.Item label="状态">{data.status}</Descriptions.Item>
        <Descriptions.Item label="介绍">{data.description}</Descriptions.Item>
        <Descriptions.Item label="创建人">{data.createdUserName}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{data.createdAt}</Descriptions.Item>
        <Descriptions.Item label="组织">{data.orgId}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <SList pid={pid} />
      <Divider />
      <SbList pid={pid} />
    </PageContainer>
  );
};

export default ProjecDetail;
