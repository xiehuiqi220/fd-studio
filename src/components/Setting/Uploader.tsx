import { ProFormUploadDragger } from '@ant-design/pro-components';
import { message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

export type UploadMode = 'simple' | '';

export type UploaderProps = {
  title: string;
  name: string;
  max: number;
  mode: UploadMode;
  onSuccess: (src: string) => void;
  children?: React.JSX.Element;
};

const Uploader: React.FC<UploaderProps> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    if (file.status !== 'done') return;
    if (!file.response.success) {
      message.error('上传失败');
      return;
    }

    file.thumbUrl = file.response.data.url;
    file.url = file.response.data.url;
    console.log('upload image complete', file, newFileList);
    setFileList(newFileList);
    if (props.onSuccess) {
      props.onSuccess(file.url);
    }
  };

  const isSimple = props.mode === 'simple';

  const attr = {
    name: props.name,
    label: props.title,
    max: props.max,
    fileList: fileList,
    fieldProps: {
      name: 'file',
      accept: '.png,.jpg,.jpeg,.bmp,.webp,.gif',
      listType: isSimple ? '' : 'picture-card',
      headers: {
        'x-csrf-token': 'S52fBY93UPq2mTPSomctjSC6',
      },
      withCredentials: true,
      multiple: props.max > 1,
      action: 'http://127.0.0.1:7001/gateway/image/upload?source=antd',
    },
  };

  return isSimple ? (
    <Upload maxCount={props.max} {...attr.fieldProps} onChange={onChange}>
      {props.children}
    </Upload>
  ) : (
    <ProFormUploadDragger {...attr} onChange={onChange}>
      {props.children}
    </ProFormUploadDragger>
  );
};

export default Uploader;
