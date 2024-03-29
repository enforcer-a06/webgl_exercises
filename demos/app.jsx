import { useRef } from 'react';
import { Layout } from 'antd';
import { Menus } from './menu';

const { Sider, Content } = Layout;

const App = () => {
  const iframeRef = useRef();

  const jumpCB = key => {
    iframeRef.current.src = `/demos/${key}`;
  };
  return (
    <>
      <Layout style={{ height: '100%' }}>
        <Sider collapsible width={'220px'} style={{ height: '100%', overflow: 'auto' }}>
          <Menus cb={jumpCB} />
        </Sider>
        <Layout>
          <Content style={{ position: 'relative' }}>
            <iframe ref={iframeRef} src="" style={{ border: 0, position: 'absolute', width: '100%', height: '100%' }}></iframe>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
