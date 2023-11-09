import { useModel, history, Link } from '@umijs/max';
import { Card, Image, Button, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAllProjects } from '@/services/ant-design-pro/api';
import { EditOutlined, PlusOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const CARD_WIDTH = 323;
const CARD_HEIGHT = '100%';
const CARD_COVER_HEIGHT = CARD_WIDTH;
const META_HEIGHT = 100;

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
}> = ({ id, title, description, logo }) => {
  const { initialState } = useModel('@@initialState');

  return (
    <Card
      hoverable
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      cover={<Image alt="example" fallback={initialState?.dataDict.FALLBACK_IMG} width={ CARD_WIDTH} height={ CARD_COVER_HEIGHT } src={logo} />}
      actions={[
        <Link to={'/admin/project/edit/' + id}><EditOutlined key="edit" /></Link>,
      ]}
    >
      <Meta style={{height:META_HEIGHT}} title={title} description={description} />
    </Card>
  );
};

const CardList: React.FC = () => {
  const { token } = theme.useToken();
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
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <Link to='/admin/project/create' style={{
          display: "block",
          width: "100%",
          height: "100%"
        }}><div style={{
          display: "flex",
          height: "400px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}><h1><PlusOutlined /></h1>
            <h1>Create Project</h1></div></Link>
      </Card>
      {projectList?.map((item: API.ProjectItem, i) => {
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

