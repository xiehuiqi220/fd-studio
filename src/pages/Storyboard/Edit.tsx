import { useParams } from 'umi';
import {
  EditableProTable,
  ProCard,
  ProColumns,
  PageContainer,
  ProProvider,
} from '@ant-design/pro-components';
import { Button, Input, Card } from 'antd';
import React, { useState, useEffect, useContext } from 'react';
import { getStoreboardSettings, getSbShots, updateShot } from '@/services/ant-design-pro/sb';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const defaultData: API.ShotType[] = [];

const SBEditor: React.FC = (props) => {
  const params = useParams();
  const sid: string = params.id || '';
  const isEdit: boolean = !!sid; //是否编辑状态

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly API.ShotType[] | undefined>(
    () => defaultData,
  );

  const fetchShots = async () => {
    let res = await getSbShots(sid);
    const data = res.data;
    setDataSource(data);
    setEditableRowKeys(data.map((item) => item.id));
  }

  useEffect(() => {
    fetchShots();
  }, []);

  const columns: ProColumns<API.ShotType>[] = [
    {
      title: '镜号',
      dataIndex: 'shotNum',
      editable: false,
      width: 50,
      valueType: 'indexBorder'
    }, {
      title: '故事板ID',
      dataIndex: 'sbId',
      editable: false,
      hideInTable: true
    },
    {
      title: '图片',
      dataIndex: 'picture',
      valueType: 'custom-picture',
      width: 300
    },
    {
      title: '景别',
      dataIndex: 'scenery',
      valueType: 'select',
      valueEnum: {
        long: { text: '远景', status: 'long' }
      },
      width: 120
    }, {
      title: '时长',
      dataIndex: 'duration',
      valueType: 'second',
      width: 120
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      width: 300
    },
    {
      title: '声音',
      dataIndex: 'voice',
    },
    {
      title: '角度',
      dataIndex: 'angle',
      hideInTable: true
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

  useEffect(() => {
  }, []);
  const values = useContext(ProProvider);

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
                    cover={
                      <img
                        src={text}
                      />
                    }
                    bodyStyle={{padding:0}}
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                  </Card>
                ),
              }
            },
          }}
        >
          <EditableProTable<API.ShotType>
            headerTitle="可编辑表格"
            columns={columns}
            rowKey="id"
            scroll={{
              x: 960,
            }}
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now().toString(),
                sbId: sid
              }),
            }}
            toolBarRender={() => {
              return [
                <Button
                  type="primary"
                  key="save"
                  onClick={() => {
                    // dataSource 就是当前数据，可以调用 api 将其保存
                    console.log(dataSource);
                  }}
                >
                  保存数据
                </Button>,
              ];
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete, '插入'];
              },
              onValuesChange: async (record, recordList) => {//当单列的值修改时
                //新增时也会触发，record为undefined
                if (!record) {
                  return;
                }
                console.log("shot changed", record.id, record);
                const res = await updateShot(record);
                console.log('update shot', res);
              },
              onChange: (keys) => { //当增加行或者删除行时
                setEditableRowKeys(keys);
              },
            }}
          /></ProProvider.Provider>
      </ProCard>
    </PageContainer>
  )
};

export default SBEditor;
