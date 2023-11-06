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
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  PageContainer
} from '@ant-design/pro-components';
import { waitTime } from '@/Utils/time';

const CreateProject: React.FC = (props) => {
  const params = useParams();
  const pid = params.id;
  const isEdit: boolean = !!pid; //是否编辑状态
  const { initialState } = useModel('@@initialState');

  const dataDict = initialState?.dataDict;
  const formRef = useRef<ProFormInstance>();
  let formData: API.ProjectItem = {};

  const fetchData = async () => {
    let res = await getProjectById(pid);
    const data = res.data;
    formData = { ...data };
    formRef.current?.setFieldsValue(formData);
  }

  const submitForm = async () => {
    let res = await updateProject(formData);

    //最终的提交
    await waitTime(1000);
    message.success('提交成功' + res.data);
    console.log('保存结果', res, formData);
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
          formRef={formRef}
          onFormFinish={() => {
            //单个步骤完成，合并数据
            const curData = formRef.current?.getFieldsValue();
            formData = {
              ...formData,
              ...curData
            };
            console.log('单个步骤完成', curData, formData);
          }}
          onFinish={async () => {
            await submitForm();
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
            <ProFormCheckbox.Group
              name="type"
              label="项目类型"
              width="lg"
              options={dataDict?.PROJECT_TYPES}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  )
};

export default CreateProject;
