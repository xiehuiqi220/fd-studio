import { useModel } from '@umijs/max';
import { Card, Empty, Button, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAllProjects } from '@/services/ant-design-pro/api';
import { EditOutlined, PlusOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string | undefined;
  logo: string;
  desc: string | undefined;
}> = ({ title, desc, logo }) => {
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
  const [projectList, setProjectList] = useState<API.ProjectItem[] | undefined>([]);

  const fetchProjects = async () => {
    let res = await getAllProjects();
    const data = res.data;
    setProjectList(data);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Card
        hoverable
        style={{ width: 323 }}
      >
        <a href='./admin/project/create' style={{
          display: "block",
          width: "100%",
          height: "100%"
        }}><div style={{
          display: "flex",
          height:"400px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}><h1><PlusOutlined /></h1>
            <h1>Create Project</h1></div></a>
      </Card>
      {projectList?.map((item: API.ProjectItem,i) => {
        return <InfoCard
          key={i}
          logo={item.logo}
          title={item.title}
          desc={item.description}
        />
      })}
    </>
  );
};

export default CardList;

