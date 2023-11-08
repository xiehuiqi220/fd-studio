import { useModel } from '@umijs/max';
import { useParams } from 'umi';
import { Button, Result, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { getProjectById, updateProject } from '@/services/ant-design-pro/api';

import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  PageContainer
} from '@ant-design/pro-components';
import Uploader from '../../components/Setting/Uploader';

const CreateProject: React.FC = (props) => {
  const params = useParams();
  const pid = params.id;
  const isEdit: boolean = !!pid; //是否编辑状态
  const { initialState } = useModel('@@initialState');

  const dataDict = initialState?.dataDict;
  const formRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);

  const fetchData = async () => {
    let res = await getProjectById(pid);
    let data = res.data;
    data.logo = [{
      url:data.logo
    }];
    //分步骤遍历每一个子表单赋值，否则只有第一步骤表单有值
    formRef?.current?.forEach((formInstanceRef) => {
      formInstanceRef?.current?.setFieldsValue(data);
    });
  }

  const submitForm = async (allFormData:{}) => {
    let res = await updateProject(allFormData);

    if(res.success){
      message.success('提交成功');
      history.back();
    }else {
      message.error('保存失败：'+res.errorMsg || '未知错误');
    }
    console.log('保存结果', res, allFormData);
  };

  useEffect(() => {
    isEdit && fetchData();
  }, []);

  return (
    <PageContainer>
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          stepsProps={{
            direction: 'vertical',
          }}
          formMapRef={formRef}
          onFormFinish={() => {
          }}
          onFinish={async (values) => {
            await submitForm(values);
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
          <StepsForm.StepForm<{
            name: string;
          }>
            name="base"
            title="基本信息"
            stepProps={{
              description: '项目基本设置',
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
          </StepsForm.StepForm>
          <StepsForm.StepForm<{
            checkbox: string;
          }>
            name="extra"
            title="高级设置"
            stepProps={{
              description: '额外的信息',
            }}
          >
            <Uploader name="logo" title='图片' max={1} />
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
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  )
};

export default CreateProject;
