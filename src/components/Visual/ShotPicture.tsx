import Uploader from '@/components/Setting/Uploader';
import { UploadOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';

const Picture: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
}> = ({ value, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const TOOLBAR_WIDTH = 30;

  const onFileSuccess = (src: string) => {
    onChange?.(src);
  };

  return (
    <Flex>
      <div>
        <Image
          src={value}
          width={initialState?.dataDict.SB_IMAGE_WIDTH - TOOLBAR_WIDTH}
          height={200}
        />
      </div>
      <div
        style={{
          width: TOOLBAR_WIDTH,
        }}
      >
        <Uploader mode="simple" name="picture" onSuccess={onFileSuccess} title="" max={1}>
          <UploadOutlined />
        </Uploader>
      </div>
    </Flex>
  );
};

const PictureEditor = {
  renderFormItem: () => <Picture />,
};

export default PictureEditor;
