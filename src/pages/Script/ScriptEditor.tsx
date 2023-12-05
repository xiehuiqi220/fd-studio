import { getScriptById, updateScript } from '@/services/ant-design-pro/script';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'umi';

import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

const ScriptEditor: React.FC = (props) => {
  const params = useParams();
  const pid = params.id;
  const isEdit: boolean = !!pid; //是否编辑状态
  const { initialState } = useModel('@@initialState');
  const initailSection = [{ id: '', location: 'xx家', content: '小蜜说：' }];

  const dataDict = initialState?.dataDict;
  const formRef = useRef<ProFormInstance>();

  const fetchData = async () => {
    let res = await getScriptById(pid);
    if (!res?.data) {
      message.error('未找到项目数据，请稍后重试');
      return;
    }
    let data = res.data;
    formRef?.current?.setFieldsValue(data);
  };

  const submitForm = async (allFormData: object) => {
    let res = await updateScript(allFormData);

    if (res.success) {
      message.success('提交成功');
      history.back();
    } else {
      message.error('保存失败：' + (res.errorMsg || '未知错误'));
    }
    console.log('保存结果', res, allFormData);
    return res;
  };

  useEffect(() => {
    if (isEdit) fetchData();
  }, []);

  return (
    <PageContainer
      tabList={[
        {
          tab: '编辑模式',
          key: 'edit',
        },
        {
          tab: '阅读模式',
          key: 'read',
        },
      ]}
    >
      <ProForm
        layout="horizontal"
        formRef={formRef}
        onFinish={async (values) => {
          await submitForm(values);
          return true;
        }}
      >
        <ProFormText
          name="id"
          label="ID"
          width="md"
          readonly={true}
          disabled={true}
          hidden={!isEdit}
        />
        <ProFormText
          name="projectId"
          label="projectId"
          width="md"
          readonly={true}
          disabled={true}
          hidden={true}
        />
        <ProFormText
          style={{ padding: 0 }}
          width="md"
          name="title"
          required={true}
          label="剧本名"
          rules={[{ required: true }]}
        />
        <ProFormTextArea style={{ padding: 0 }} width="md" name="description" label="简介" />
        <ProFormList
          name="scriptSections"
          label="段落"
          creatorButtonProps={{
            creatorButtonText: '添加场',
          }}
          min={1}
          copyIconProps={false}
          itemRender={({ listDom, action }, { index }) => (
            <ProCard
              bordered
              style={{ marginBlockEnd: 8 }}
              title={`场${index + 1}`}
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
          creatorRecord={{ name: '', items: [{ name: '' }] }}
          initialValue={initailSection}
        >
          <ProFormText
            name="id"
            label="ID"
            width="md"
            readonly={true}
            disabled={true}
            hidden={!isEdit}
          />
          <ProFormText
            name="scriptId"
            label="scriptId"
            width="md"
            readonly={true}
            disabled={true}
            hidden={!isEdit}
          />
          <ProFormText
            style={{ padding: 0 }}
            width="md"
            name="location"
            label="地点"
            required={true}
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            style={{ padding: 0 }}
            width="md"
            name="content"
            label="内容"
            required={true}
            rules={[{ required: true }]}
          />
        </ProFormList>
      </ProForm>
    </PageContainer>
  );
};

export default ScriptEditor;
