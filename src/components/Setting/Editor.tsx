import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { saveLocation } from '@/services/ant-design-pro/setting';

export type SettingFormProps = {
  title: string;
  children:Element
};

const SettingEditor: React.FC<SettingFormProps> = (props) => {
  const [form] = Form.useForm<{ name: string; company: string }>();

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
        <ProFormTextArea
          width="md"
          name="description"
          label="描述"
          placeholder="请输入描述"
        />
      <ProFormText width="sm" name="snumber" label="编号" />
    </DrawerForm>
  );
};

export default SettingEditor;
