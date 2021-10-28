
import styles from '../styles/Home.module.scss'

import { Avatar, Statistic, Card, Row, Col, Button, Divider, List } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

export default function Home() {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <section className={styles.home}>
      <div className={styles.home__header}>
        <div className={styles.home__header_title}>
        <h1>Dashboard</h1>
        </div>
        <div className={styles.home__header_ctios}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
      </div>
      <div className={styles.home__statistic}>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Infected"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Healthy"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      </div>
      <div className="home__list_peoples">
        <Divider orientation="left">List of people</Divider>

        <Row>
          <Col span={24} offset={23}><Button type="primary" shape="circle" icon={<PlusOutlined />} /></Col>
        </Row>

        <Row>
          <Col span={24}>
          <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item 
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
                </List.Item>
              )}
            />,
          </Col>
        </Row>
      </div>
    </section>
  )
}
