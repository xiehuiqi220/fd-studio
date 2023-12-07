import { getAllLocations, getLocationById, saveLocation } from '@/services/ant-design-pro/concept';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import { Button, Card, message } from 'antd';
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
  pid: string;
  title: string | undefined;
  logo: string;
  desc: string | undefined;
}> = ({ id, pid, title, desc, logo }) => {
  return (
    <Editor pid={pid} id={id} title="编辑地点" saveFn={saveLocation} getIdFn={getLocationById}>
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
  const params = useParams();
  const pid = params.pid || '';
  if (!pid) {
    message.error('错误的参数');
    throw '错误的参数';
  }

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
            pid={item.projectId}
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
  const params = useParams();
  const pid = params.pid || '';
  if (!pid) {
    message.error('错误的参数');
    throw '错误的参数';
  }

  useEffect(() => {}, []);

  return (
    <PageContainer
      extra={[
        <Editor
          pid={pid}
          saveFn={saveLocation}
          extraFields={undefined}
          title="创建场景"
          key={0}
          id=""
        >
          <Button>创建场景</Button>
        </Editor>,
      ]}
    >
      <CardList />
    </PageContainer>
  );
};

export default LocList;
