import { Menu } from 'antd';

const Menus = ({ cb }) => {
  const items = [
    {
      label: '01',
      key: '01',
      children: [
        { label: '01.webgl基本使用', key: '01-01' },
        { label: '02.绘制一个点', key: '01-02' },
      ],
    },
  ];
  const clickHandler = ({ key }) => {
    cb(key);
  };
  return <Menu defaultOpenKeys={['01']} theme="dark" mode="inline" items={items} onClick={clickHandler} />;
};

export { Menus };
