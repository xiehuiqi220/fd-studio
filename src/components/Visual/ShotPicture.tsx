import Uploader from '@/components/Setting/Uploader';
import { Image } from 'antd';
import React from 'react';

const Picture: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
}> = ({ value, onChange }) => {
  const onFileSuccess = (src: string) => {
    onChange?.(src);
  };
  return (
    <div>
      <Image width={200} src={value} />
      <Uploader name="picture" onSuccess={onFileSuccess} title="" max={1} />
    </div>
  );
};

const PictureEditor = {
  renderFormItem: () => <Picture />,
};

export default PictureEditor;
