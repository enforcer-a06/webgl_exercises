import { Menu } from 'antd';

const Menus = ({ cb }) => {
  const items = [
    {
      label: '01',
      key: '01',
      children: [
        { label: '01.webgl基本使用', key: '01-01' },
        { label: '02.绘制一个点', key: '01-02' },
        { label: '03.webgl坐标系', key: '01-03' },
        { label: '04.使用attribute变量', key: '01-04' },
        { label: '05.鼠标控制绘制', key: '01-05' },
        { label: '06.使用uniform变量', key: '01-06' },
      ],
    },
    {
      label: '02',
      key: '02',
      children: [
        { label: '01.使用缓冲区', key: '02-01' },
        { label: '02.多缓冲区', key: '02-02' },
        { label: '03.单缓冲+数据偏移', key: '02-03' },
        { label: '04.多种图像绘制', key: '02-04' },
        { label: '05.图形平移', key: '02-05' },
        { label: '06.图形缩放', key: '02-06' },
        { label: '07.图形旋转', key: '02-07' },
      ],
    },
  ];
  const clickHandler = ({ key }) => {
    cb(key);
  };
  return <Menu defaultOpenKeys={['01']} theme="dark" mode="inline" items={items} onClick={clickHandler} />;
};

export { Menus };
