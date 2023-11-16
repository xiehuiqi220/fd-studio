import {
  DrawerForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React from 'react';
import Uploader from '../../components/Setting/Uploader';

export type SettingFormProps = {
  id: string | undefined;
  title: string;
  getIdFn: (id: string) => Promise<object>;
  saveFn: (data: object) => object;
  children: React.JSX.Element;
  extraFields: object;
};

const SettingEditor: React.FC<SettingFormProps> = (props) => {
  const [form] = Form.useForm();
  const { id, getIdFn, saveFn } = props;
  const extraFields = props.extraFields || {};
  const isEdit: boolean = !!id; //是否编辑状态

  const fetchData = async () => {
    let res = await getIdFn(id);
    if (!res?.data) {
      message.error('未找到数据，请稍后重试');
      return;
    }
    let data = res.data;
    data.logo = [
      {
        url: res.data.logo, //字符串url转filelist数组
      },
    ];

    form.setFieldsValue(data);
  };

  const submitForm = async (allFormData: object) => {
    let res = await saveFn(allFormData);

    if (res.success) {
      message.success('提交成功');
      location.reload();
      return true; //会关闭表单
    } else {
      message.error('保存失败：' + res.errorMsg || '未知错误');
    }
    console.log('保存结果', res, allFormData);
  };

  const onOpenChange = async (visible: boolean) => {
    if (!visible) return false;
    if (isEdit) {
      await fetchData();
    }
  };

  return (
    <DrawerForm<API.Location>
      title={props.title}
      resize={{
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
        required={true}
        placeholder="请输入名称"
        rules={[{ required: true, message: '这是必填项' }]}
      />
      {'age' in extraFields && (
        <ProFormDigit min={1} width="sm" name="age" addonAfter="岁" label="年龄" />
      )}
      {'gender' in extraFields && (
        <ProFormRadio.Group
          width="sm"
          name="gender"
          label="性别"
          options={[
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
            {
              label: '其他',
              value: 'other',
            },
          ]}
        />
      )}
      {'personality' in extraFields && (
        <ProFormTextArea width="sm" name="personality" label="性格特点" />
      )}
      <ProFormText width="sm" name="snumber" label="编号" />
      <ProFormTextArea width="md" name="description" label="描述" placeholder="请输入描述" />
      <Uploader name="logo" title="主图" max={1} />
    </DrawerForm>
  );
};

export default SettingEditor;
