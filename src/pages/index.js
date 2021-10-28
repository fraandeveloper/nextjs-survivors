
import { useState, useEffect } from 'react';

import { Avatar, Statistic, Card, Row, Col, Button, Divider, List, Form, Input } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, MinusOutlined, AlertOutlined } from '@ant-design/icons';

import styles from '../styles/Home.module.scss'
import 'antd/dist/antd.css';

import api from '../services/api';

export default function Home() {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [peoples, setPeoples] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleSubmitPeople = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log('===')

      const { data: { data }} = await api.post('/peoples', { name, skills })
      setPeoples(peoples.concat(data));
  
      setId(null);
      setName('');
      setSkills('');
      setIsOpenForm(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  
  const handleDeletePeople = async (peopleId) => {
    try {
      setIsLoading(true);

      await api.delete(`/peoples/${peopleId}`)

      setPeoples(peoples.filter(people => people._id != peopleId));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleUpdatePeople = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const name = name || form.getFieldValue('name')
      const skills = skills || form.getFieldValue('skills')
      

      await api.put(`/peoples/${id}`, { name, skills });
      setPeoples(peoples.map(people => people._id === id ? {_id: id, name, skills} : people));
      
      setId(null)
      setName('');
      setSkills('');
      setIsLoading(false);
      handleToggleForm();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleSetUpdatePeople = (people) => {
    const { _id, name, skills } = people || {};
    setId(_id);
    setIsOpenForm(true);

    form.setFieldsValue({
      name: name,
      skills: skills,
    });
  }


  const handleChangeName = ({target: { value }}) => {
    setName(value);
  }
  
  const handleChangeSkills = ({target: { value }}) => {
    setSkills(value);
  }

  const handleToggleForm = () => {
    setIsOpenForm(!isOpenForm);
  }

  const fetchPeoples = async () => {
    try {
      setIsLoading(true);

      const {data: { data }} = await api.get('/peoples');

      setPeoples(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPeoples();
  }, [])

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
      <Divider orientation="left"><AlertOutlined /> Register Survivors</Divider>
        <Row>
          <Col span={24} offset={23}>
            <Button onClick={handleToggleForm} type="primary" shape="circle" icon={isOpenForm ? <MinusOutlined /> : <PlusOutlined />} />
          </Col>
        </Row>

        {
          isOpenForm && (
          <Row justify="flex-start" align="top">
            <Col span={24}>
            <Form
                form={form}
                layout="vertical"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 9 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                  onChange={(e) => handleChangeName(e)}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Skills"
                  name="skills"
                  rules={[{ required: true, message: 'Please input your skills!' }]}
                  onChange={(e) => handleChangeSkills(e)}>
                  <Input.TextArea />
                </Form.Item>
  
                <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
                  <Button onClick={id ? handleUpdatePeople : handleSubmitPeople } type="primary" htmlType="submit">
                   {id ? 'Update' : 'Register' } 
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          )
        }

        <Divider></Divider>

        <Row>
          <Col span={24}>
          <List
          itemLayout="horizontal"
          dataSource={peoples}
          loading={isLoading}
          renderItem={item => (
            <List.Item 
            actions={[<a onClick={() => handleSetUpdatePeople(item)} key="list-loadmore-edit">Edit</a>, <a onClick={() => handleDeletePeople(item._id)} key="list-loadmore-more">Delete</a>]}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item?.skills}
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
