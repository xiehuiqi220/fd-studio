import { getAllLocations, getLocationById, saveLocation } from '@/services/ant-design-pro/concept';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import Editor from '../../components/Setting/Editor';

const { Meta } = Card;

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  id: string;
  title: string | undefined;
  logo: string;
  desc: string | undefined;
}> = ({ id, title, desc, logo }) => {
  return (
    <Editor id={id} title="编辑地点" saveFn={saveLocation} getIdFn={getLocationById}>
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
        <Meta title={title} description={desc} />
      </Card>
    </Editor>
  );
};

const CardList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const pid = initialState?.currentProjectId;

  const [locationList, setLocationList] = useState<API.Location[] | undefined>([]);

  const fetchLocations = async () => {
    let res = await getAllLocations(pid, false);
    const data = res.data;
    setLocationList(data);
  };

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
      {locationList?.map((item: API.Location, i) => {
        return (
          <InfoCard
            key={i}
            id={item.id}
            logo={item.logo}
            title={item.title}
            desc={item.description}
          />
        );
      })}
    </div>
  );
};

import { PageContainer } from '@ant-design/pro-components';

const LocList: React.FC = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <CardList />
    </PageContainer>
  );
};

export default LocList;
