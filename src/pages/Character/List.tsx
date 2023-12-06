import {
  getAllCharacters,
  getCharacterById,
  saveCharacter,
} from '@/services/ant-design-pro/concept';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import Editor from '../../components/Setting/Editor';

const { Meta } = Card;

const CharacterEditor: React.FC<{
  id: string | undefined;
  children: React.JSX.Element;
}> = ({ id, children }) => {
  return (
    <Editor
      id={id}
      title="编辑角色"
      extraFields={{
        age: true,
        gender: true,
        personality: true,
      }}
      saveFn={saveCharacter}
      getIdFn={getCharacterById}
    >
      {children}
    </Editor>
  );
};
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
    <CharacterEditor id={id}>
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
    </CharacterEditor>
  );
};

const CardList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [characterList, setCharacterList] = useState<API.Character[] | undefined>([]);

  const fetchCharacters = async () => {
    let res = await getAllCharacters(initialState?.currentProjectId, false);
    const data = res.data;
    setCharacterList(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {characterList?.map((item: API.Character, i) => {
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

const CharacterList: React.FC = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer
      extra={[
        <CharacterEditor key={0} id="">
          <Button title="创建角色">创建角色</Button>
        </CharacterEditor>,
      ]}
    >
      <CardList />
    </PageContainer>
  );
};

export default CharacterList;
