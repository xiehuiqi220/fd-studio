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
import { saveLocation } from '@/services/ant-design-pro/setting';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

export type SettingFormProps = {
  title: string;
  children: Element
};

const SettingEditor: React.FC<SettingFormProps> = (props) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    if (file.status !== 'done') return;
    if (!file.response.success) {
      message.error("上传失败");
      return;
    };

    file.thumbUrl = file.response.data.url;
    console.log('upload image complete', file, newFileList);
    setFileList(newFileList);
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
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        let res = await saveLocation(values);
        const data = res.data;
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
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
      <ProFormUploadDragger
        name="upload"
        label="图片"
        accept='.png,.jpg,.jpeg,.bmp,.webp,.gif'
        max={4}
        fileList={fileList}
        onChange={onChange}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          headers:{
            'x-csrf-token':'vBAaS_MbxoSIhhtdZ1TvOGXx'
          },
          withCredentials:true,
          multiple:true
        }}
        action="http://localhost:7001/gateway/image/upload?source=antd"
      />
    </DrawerForm>
  );
};

export default SettingEditor;
