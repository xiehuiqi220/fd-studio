import { useModel } from '@umijs/max';
import { Card, List, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAllProjects,removeRule } from '@/services/ant-design-pro/api';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string | undefined;
  index: number;
  logo: string;
  desc: string | undefined;
}> = ({ title, index, desc,logo }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <Card
    hoverable
    style={{ width: 323 }}
    cover={<img alt="example" src={logo} />}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  );
};

const CardList: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [projectList, setProjectList] = useState<API.ProjectItem[]>();

  const fetchMyAPI = async () => {
    let res = await getAllProjects();
    const data = res.data;
    setProjectList(data);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
      {projectList?.map((item:API.ProjectItem) => {
        return <InfoCard
          index={1}
          logo={item.logo}
          title={item.title}
          desc={item.description}
        />
      })}
    </>
  );
};

export default CardList;

