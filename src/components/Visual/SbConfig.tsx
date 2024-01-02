import { getConfig, updateConfig } from '@/services/ant-design-pro/sb';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';

export type SbConfigProps = {
  pid: string | undefined;
  sbid: string | undefined;
  visible: boolean;
  onClose: (open: boolean) => void;
};

const SbConfig: React.FC<SbConfigProps> = (props) => {
  const [open, setOpen] = useState<boolean>(props.visible);
  const [form] = Form.useForm();
  const { pid, sbid, onClose } = props;
  const isEdit = !!sbid;

  const fetchConfig = async () => {
    const conf = await getConfig(sbid, false);
    if (!conf.data) {
      message.error('未获取到故事板信息');
      return;
    }
    form.setFieldsValue(conf.data);
  };

  useEffect(() => {
    if (props.sbid) {
      fetchConfig();
    }
  }, [props.sbid, props.visible]);

  useEffect(() => {
    setOpen(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (onClose) {
      onClose(open);
    }
  }, [open]);

  return (
    <ModalForm
      title="新建表单"
      form={form}
      open={open}
      onOpenChange={setOpen}
      onFinish={async (values) => {
        const res = await updateConfig(values);
        if (res.success && res.data) {
          message.success('提交成功');
          setOpen(false); //会关闭窗口
        } else {
          message.success('提交失败：' + res.errorMsg);
          return false; //不关闭窗口
        }
      }}
    >
      <ProFormText
        width="md"
        name="title"
        label="标题"
        required={true}
        rules={[{ required: true }]}
      />
      <ProFormTextArea width="md" name="description" label="描述" placeholder="请输入描述" />
      <ProFormText width="md" name="projectId" hidden={false} initialValue={pid} disabled={true} />
      <ProFormText width="md" name="id" hidden={false} initialValue={sbid} disabled={true} />
    </ModalForm>
  );
};

export default SbConfig;
