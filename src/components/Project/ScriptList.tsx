import { getByProject } from '@/services/ant-design-pro/script';
import { formateTime } from '@/utils/time';
import { Link } from '@umijs/max';
import { Button, Descriptions, Divider, Empty, theme } from 'antd';
import React, { useEffect, useState } from 'react';

export type SListProps = {
  pid: string | undefined;
};

const SList: React.FC<SListProps> = (props) => {
  const { token } = theme.useToken();
  const [scripts, setScripts] = useState<API.Script[] | undefined>([]);

  const fetchProjects = async () => {
    const scriptList = await getByProject(props.pid);
    setScripts(scriptList.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Descriptions
        bordered
        title="剧本"
        size={'default'}
        labelStyle={{ maxWidth: 250, minWidth: 150, width: 200 }}
        column={1}
      >
        {scripts?.map((s) => (
          <Descriptions.Item key={s.id} label={s.title}>
            {s.description}
            <Link to={`/admin/script/editor/${s.id}/p-${props.pid}`}>查看详情</Link>
            <Divider type="vertical" />
            创建于{formateTime(s.createdAt)}
          </Descriptions.Item>
        ))}
      </Descriptions>
      {scripts?.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>还没有剧本，点下面的按钮去创建吧</span>}
        >
          <Button type="primary">
            <Link to={`/admin/script/create/p-${props.pid}`}>创建剧本</Link>
          </Button>
        </Empty>
      ) : (
        ''
      )}
    </div>
  );
};

export default SList;
