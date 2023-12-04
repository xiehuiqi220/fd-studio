import { getProjectById } from '@/services/ant-design-pro/api';
import { getByProject } from '@/services/ant-design-pro/script';
import { history } from '@umijs/max';
import { Button, Descriptions, Divider, Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'umi';

import { PageContainer } from '@ant-design/pro-components';

const ProjectList: React.FC = (props) => {
  const params = useParams();
  const pid = params.id;
  const [data, setData] = useState<API.ProjectItem>({});
  const [scripts, setScripts] = useState<[API.Script]>();

  const fetchData = async () => {
    let res = await getProjectById(pid);
    if (!res?.data) {
      message.error('未找到项目数据，请稍后重试');
      return;
    }
    let data = res.data;
    setData(data);

    const scriptList = await getByProject(pid);
    setScripts(scriptList.data);
  };

  useEffect(() => {
    fetchData();
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
      <Descriptions
        bordered
        title="剧本"
        size={'default'}
        labelStyle={{ maxWidth: 250, minWidth: 150, width: 200 }}
        column={1}
      >
        {scripts?.map((s) => (
          <Descriptions.Item key={s.id} label="剧本名">
            <Link to={`/admin/script/editor/${s.id}`}>{s.title}</Link>
          </Descriptions.Item>
        ))}
      </Descriptions>
    </PageContainer>
  );
};

export default ProjectList;
