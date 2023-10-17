import { useModel } from '@umijs/max';
import { useParams } from 'umi';
import { Button,Card, Result, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { getAllLocations } from '@/services/ant-design-pro/concept';
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
  const { initialState } = useModel('@@initialState');
  const [locationList, setLocationList] = useState<API.Location[] | undefined>([]);

  const fetchLocations = async () => {
    let res = await getAllLocations(false);
    const data = res.data;
    setLocationList(data);
  }

  useEffect(() => {
    fetchLocations();
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
      {locationList?.map((item: API.ProjectItem,i) => {
        return <InfoCard
          key={i}
          logo={item.logo}
          title={item.title}
          desc={item.description}
        />
      })}
    </div>
  );
};

import {
  ProCard,
  PageContainer
} from '@ant-design/pro-components';
import { waitTime } from '@/Utils/time';

const LocList: React.FC = (props) => {
  useEffect(() => {
  }, []);

  return (
    <PageContainer>
      <CardList />
    </PageContainer>
  )
};

export default LocList;