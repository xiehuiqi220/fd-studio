import { PlusOutlined } from '@ant-design/icons';
import {
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

export type UploaderProps = {
  title: string;
  name:string;
  max:number;
};

const Uploader: React.FC<UploaderProps> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    if (file.status !== 'done') return;
    if (!file.response.success) {
      message.error("上传失败");
      return;
    };

    file.thumbUrl = file.response.data.url;
    file.url = file.response.data.url;
    console.log('upload image complete', file, newFileList);
    setFileList(newFileList);
  };

  return (
      <ProFormUploadDragger
        name={props.name}
        label={props.title}
        accept='.png,.jpg,.jpeg,.bmp,.webp,.gif'
        max={props.max}
        fileList={fileList}
        onChange={onChange}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          headers:{
            'x-csrf-token':'S52fBY93UPq2mTPSomctjSC6'
          },
          withCredentials:true,
          multiple:true
        }}
        action="http://127.0.0.1:7001/gateway/image/upload?source=antd"
      />
  );
};

export default Uploader;
