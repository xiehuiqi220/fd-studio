import { useModel } from '@umijs/max';
import { Card, List, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAllProjects,removeRule } from '@/services/ant-design-pro/api';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string | undefined;
  index: number;
  desc: string | undefined;
}> = ({ title, index, desc }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '360px',
        height:'240px',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={"#1"} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
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
          href="https://umijs.org/docs/introduce/introduce"
          title={item.title}
          desc={item.description}
        />
      })}
    </>
  );
};

export default CardList;

