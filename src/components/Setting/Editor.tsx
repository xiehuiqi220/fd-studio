import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { saveLocation,getLocationById } from '@/services/ant-design-pro/concept';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState,useEffect } from 'react';
import Uploader from '../../components/Setting/Uploader';

export type SettingFormProps = {
  id: string;
  title: string;
  children: Element
};

const SettingEditor: React.FC<SettingFormProps> = (props) => {
  const [form] = Form.useForm<API.Location>();
  const id = props.id;
  const isEdit: boolean = !!id; //是否编辑状态

  const fetchData = async () => {
    let res = await getLocationById(id);
    if (!res?.data) {
      message.error("未找到数据，请稍后重试");
      return;
    }
    let data = res.data;
    data.logo = [{
      url: res.data.logo,//字符串url转filelist数组
    }];

    form.setFieldsValue(data);
  }

  const submitForm = async (allFormData: {}) => {
    let res = await saveLocation(allFormData);

    if (res.success) {
      message.success('提交成功');
      history.back();
    } else {
      message.error('保存失败：' + res.errorMsg || '未知错误');
    }
    console.log('保存结果', res, allFormData);
  };

  const onOpenChange = async (visible) => {
    if(!visible)return false;
    isEdit && fetchData();
  };

  return (
    <DrawerForm<API.Location>
      title={props.title}
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 300,
      }}
      form={form}
      trigger={props.children}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onOpenChange={onOpenChange}
      submitTimeout={10000}
      onFinish={submitForm}
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
        width="md"
        label="名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText width="sm" name="snumber" label="编号" />
      <ProFormTextArea
        width="md"
        name="description"
        label="描述"
        placeholder="请输入描述"
      />
      <Uploader name="logo" title='主图' max={1} />
    </DrawerForm>
  );
};

export default SettingEditor;
