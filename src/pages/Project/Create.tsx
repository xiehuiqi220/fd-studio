import { getProjectById, updateProject } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'umi';

import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import Uploader from '../../components/Setting/Uploader';

const CreateProject: React.FC = (props) => {
  const params = useParams();
  const pid = params.id || '';
  const isEdit: boolean = !!pid; //是否编辑状态
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const dataDict = initialState?.dataDict;

  const fetchData = async () => {
    let res = await getProjectById(pid);
    if (!res?.data) {
      message.error('未找到项目数据，请稍后重试');
      return;
    }
    let data = res.data;
    data.logo = [
      {
        url: res.data.logo, //字符串url转filelist数组
      },
    ];
    data.type = data.type || '';
    const type = data.type.split(',');
    //分步骤遍历每一个子表单赋值，否则只有第一步骤表单有值
    form.setFieldsValue({
      ...data,
      type,
    });
  };

  const submitForm = async (allFormData: object) => {
    let res = await updateProject(allFormData);

    if (res.success) {
      message.success('提交成功');
      history.back();
    } else {
      message.error('保存失败：' + res.errorMsg || '未知错误');
    }
    console.log('保存结果', res, allFormData);
  };

  useEffect(() => {
    if (isEdit) {
      fetchData();
    }
  }, []);

  return (
    <PageContainer>
      <ProForm<{
        name: string;
      }>
        form={form}
        onFinish={async (values) => {
          await submitForm(values);
        }}
      >
        <ProCard
          title="基本信息"
          bordered
          headerBordered
          collapsible
          style={{
            marginBlockEnd: 16,
            minWidth: 800,
            maxWidth: '100%',
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
            name="title"
            label="项目名称"
            width="md"
            tooltip="可以是电影/电视剧/短视频/短剧/动画名称"
            placeholder="请输入项目名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="description"
            label="项目梗概"
            width="lg"
            placeholder="请输入项目梗概"
          />
        </ProCard>
        <ProCard
          title="高级设置"
          bordered
          headerBordered
          collapsible
          style={{
            marginBlockEnd: 16,
            minWidth: 800,
            maxWidth: '100%',
          }}
        >
          <Uploader name="logo" title="图片" max={1} />
          <ProFormText
            name="director"
            label="导演"
            width="md"
            placeholder="请输入导演名字"
            rules={[{ required: true }]}
          />
          <ProFormCheckbox.Group
            name="type"
            label="项目类型"
            width="lg"
            options={dataDict?.PROJECT_TYPES}
          />
          <ProFormRadio.Group
            name="status"
            label="状态"
            width="lg"
            options={dataDict?.PROJECT_STATUS}
          />
        </ProCard>
      </ProForm>
    </PageContainer>
  );
};

export default CreateProject;
