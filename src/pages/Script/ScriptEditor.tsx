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
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

const ScriptEditor: React.FC = (props) => {
  const params = useParams();
  const sid = params.id;
  const pid = params.pid; //项目id
  const isEdit: boolean = !!sid; //是否编辑状态
  const isCreate = !isEdit;
  const { initialState, setInitialState } = useModel('@@initialState');

  const initailSection = [{ id: '', location: 'xx家', content: '小蜜说：' }];

  const dataDict = initialState?.dataDict;
  const formRef = useRef<ProFormInstance>();

  const fetchData = async () => {
    let res = await getScriptById(sid);
    if (!res?.data) {
      message.error('未找到剧本，请稍后重试');
      return;
    }
    let data = res.data;
    formRef?.current?.setFieldsValue(data);

    if (data.projectId) {
      setInitialState({
        ...initialState,
        currentProjectId: data.projectId, //设置当前默认工作区项目
      });
    }
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
    if (isEdit) {
      fetchData();
    } else if (isCreate && pid) {
      setInitialState({
        ...initialState,
        currentProjectId: pid, //设置当前默认工作区项目
      });
    }
  }, []);

  if (isCreate && !pid) {
    message.error('错误的项目参数');
    return;
  }

  return (
    <PageContainer
      tabList={[
        {
          tab: '编辑内容',
          key: 'edit',
        },
        {
          tab: '快速编辑',
          key: 'quick-edit',
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
          initialValue={pid}
          readonly={true}
          disabled={true}
          hidden={false}
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
          <ProFormSelect
            style={{ padding: 0 }}
            width="md"
            name="space"
            label="内外景"
            required={true}
            options={initialState?.dataDict.SCRIPT_SPACE}
            rules={[{ required: true }]}
          />
          <ProFormSelect
            style={{ padding: 0 }}
            width="md"
            name="period"
            label="时间"
            required={true}
            options={initialState?.dataDict.SCRIPT_PERIOD}
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
