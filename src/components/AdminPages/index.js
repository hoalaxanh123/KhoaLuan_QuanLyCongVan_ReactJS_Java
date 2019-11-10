import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Divider, Icon } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import './index.css'
import ListCV from '../List'
import TableCommon from '../List/Table'

class Admin extends Component {
  render() {
    const { TabPane } = Tabs

    const renderTabBar = (props, DefaultTabBar) => (
      <Sticky bottomOffset={80}>
        {({ style }) => (
          <DefaultTabBar
            {...props}
            style={{ ...style, zIndex: 1, background: '#fff' }}
          />
        )}
      </Sticky>
    )

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        render: text => <span>{text}</span>
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 70
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Action',
        key: 'action',
        width: 360,
        render: (text, record) => (
          <span>
            <a>Edit</a>
            <Divider type="vertical" />
            <a>Delete</a>
            <Divider type="vertical" />
            <a className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        )
      }
    ]

    const data = []
    for (let i = 1; i <= 100; i++) {
      data.push({
        key: i,
        name: 'John Brown ' + i,
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`
      })
    }
    return (
      <Card
        type="inner"
        title="Hệ thống quản trị"
        className="Scanner_Card_Parent"
      >
        <Row>
          <Col span={24}>
            <StickyContainer>
              <Tabs defaultActiveKey="2" renderTabBar={renderTabBar}>
                <TabPane
                  tab="(1) Quản lý người dùng"
                  key="1"
                  style={{ height: 200 }}
                >
                  <TableCommon
                    title="Danh sách người dùng"
                    data={data}
                    columns={columns}
                  />
                </TabPane>
                <TabPane tab="(2) Quản lý công văn" key="2">
                  <TableCommon
                    title="Danh sách công văn"
                    data={data}
                    columns={columns}
                  />
                </TabPane>
                <TabPane tab="(3) Quản lý loại công văn" key="3">
                  <TableCommon
                    title="Danh sách loại công văn"
                    data={data}
                    columns={columns}
                  />
                </TabPane>
                <TabPane tab="(4) Quản lý lĩnh vực" key="4">
                  <TableCommon
                    title="Danh sách lĩnh vực"
                    data={data}
                    columns={columns}
                  />
                </TabPane>
              </Tabs>
            </StickyContainer>
            ,
          </Col>
        </Row>
      </Card>
    )
  }
}
export default Admin
