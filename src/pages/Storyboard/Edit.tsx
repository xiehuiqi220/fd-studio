import SbConfig from '@/components/Visual/SbConfig';
import { createEmptyShot, getConfig, removeShot, updateShot } from '@/services/ant-design-pro/sb';
import { EditOutlined, EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  PageContainer,
  ProCard,
  ProColumns,
  ProProvider,
} from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useModel, useParams } from 'umi';

const { Meta } = Card;
const defaultData: API.ShotType[] = [];

const SBEditor: React.FC = () => {
  const params = useParams();
  const sid: string = params.id || '';
  const pid: string = params.pid || '';
  const isEdit: boolean = !!sid; //是否编辑状态
  const { initialState, setInitialState } = useModel('@@initialState');
  const [sbTitle, setSbTitle] = useState<string>('storyboard title');
  const actionRef = useRef<ActionType>();
  const [configVisible, setConfigVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly API.ShotType[] | undefined>(
    () => defaultData,
  );
  const isCreate = !isEdit;
  const values = useContext(ProProvider);

  const fetchShots = async () => {
    let res = await getConfig(sid, true);
    if (!res.data) {
      message.error('未找到故事板，请稍后重试');
      return;
    }
    const shots = res.data.shots;

    setSbTitle(res.data.title);
    setDataSource(shots);
    setEditableRowKeys(shots.map((item) => item.id));

    if (res.data.projectId) {
      setInitialState({
        ...initialState,
        currentProjectId: res.data.projectId, //设置当前默认工作区项目
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchShots();
    } else if (isCreate && pid) {
      setInitialState({
        ...initialState,
        currentProjectId: pid, //设置当前默认工作区项目
      });
    }
  }, []);

  useEffect(() => {}, []);

  if (isCreate && !pid) {
    message.error('错误的项目参数');
    return;
  }
  if (isEdit && !sid) {
    message.error('错误的故事板参数');
    return;
  }

  const CreateButton: React.FC = () => {
    return (
      <Button
        type="primary"
        onClick={async () => {
          let rec: API.ShotType = {
            id: '',
            shotNumber: 0,
            storyboardId: sid,
          };
          //从服务器请求id
          const res = await createEmptyShot(rec);
          if (!res.data || !res.data.ret) {
            message.error(res.errorMsg || '创建失败');
            return;
          }
          rec.id = res.data.ret.id;
          rec.shotNumber = res.data.ret.shotNumber;
          actionRef.current?.addEditRecord?.(rec, { newRecordType: 'dataSource' });
        }}
        icon={<PlusOutlined />}
      >
        新建一行
      </Button>
    );
  };

  const columns: ProColumns<API.ShotType>[] = [
    {
      title: '镜号',
      dataIndex: 'shotNumber',
      editable: false,
      width: 50,
      //valueType: 'indexBorder'
    },
    {
      title: '故事板ID',
      dataIndex: 'storyboardId',
      editable: false,
      hideInTable: true,
    },
    {
      title: '图片',
      dataIndex: 'picture',
      valueType: 'custom-picture',
      width: 300,
    },
    {
      title: '景别',
      dataIndex: 'scenery',
      valueType: 'select',
      valueEnum: {
        long: { text: '远景', status: 'long' },
      },
      width: 120,
    },
    {
      title: '时长',
      dataIndex: 'duration',
      valueType: 'second',
      width: 120,
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      width: 300,
    },
    {
      title: '声音',
      dataIndex: 'voice',
    },
    {
      title: '角度',
      dataIndex: 'angle',
      hideInTable: true,
    },
    {
      title: '运镜',
      dataIndex: 'move',
    },
    {
      title: '焦段',
      dataIndex: 'lens',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <ProProvider.Provider
          value={{
            ...values,
            valueTypeMap: {
              'custom-picture': {
                renderFormItem: (text, props) => (
                  <Card
                    cover={<img src={text} />}
                    bodyStyle={{ padding: 0 }}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  ></Card>
                ),
              },
            },
          }}
        >
          <SbConfig
            onClose={(v) => {
              setConfigVisible(v);
            }}
            sbid={sid}
            pid={pid}
            visible={configVisible}
          />
          <EditableProTable<API.ShotType>
            headerTitle={sbTitle}
            columns={columns}
            rowKey="id"
            options={{ density: false, fullScreen: true, reload: false, setting: false }}
            scroll={{
              x: 960,
            }}
            actionRef={actionRef}
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={false}
            footer={function () {
              return <CreateButton />;
            }}
            toolBarRender={() => {
              return [
                <CreateButton key="create" />,
                <Button
                  type="default"
                  key="config"
                  onClick={() => {
                    // dataSource 就是当前数据，可以调用 api 将其保存
                    setConfigVisible(true);
                    console.log(dataSource);
                  }}
                  icon={<SettingOutlined />}
                >
                  设置
                </Button>,
              ];
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              onValuesChange: async (record, recordList) => {
                //当单列的值修改时，每输入一个字符会触发一次
                //新增或删除时也会触发，record为undefined
                if (!record) {
                  return;
                }
                console.log('shot changed', record.id, record);
                const res = await updateShot(record);
                console.log('update shot success', record);
              },
              onChange: async (keys, rows) => {
                //当增加行或者删除行时
                setEditableRowKeys(keys);
              },
              onDelete: async (id) => {
                const res = await removeShot(id);
                console.log(res);
              },
            }}
          />
        </ProProvider.Provider>
      </ProCard>
    </PageContainer>
  );
};

export default SBEditor;
