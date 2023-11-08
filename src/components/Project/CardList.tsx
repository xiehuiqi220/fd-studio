import { useModel,history, Link } from '@umijs/max';
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
  id: string;
  title: string;
  logo: string;
  description: string;
}> = ({id, title, description, logo }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <Card
      hoverable
      style={{ width: 323 }}
      cover={<img alt="example" src={logo} />}
      actions={[
        <SettingOutlined key="setting" />,
        <Link to={'/admin/project/edit/'+id}><EditOutlined key="edit" /></Link>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={title} description={description} />
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
    <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
      <Card
        hoverable
        style={{ width: 323 }}
      >
        <Link to='/admin/project/create' style={{
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
            <h1>Create Project</h1></div></Link>
      </Card>
      {projectList?.map((item: API.ProjectItem,i) => {
        return <InfoCard
          key={i}
          id={item.id}
          logo={item.logo}
          title={item.title}
          description={item.description}
        />
      })}
    </div>
  );
};

export default CardList;

