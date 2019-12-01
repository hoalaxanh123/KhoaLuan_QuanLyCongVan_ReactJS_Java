import React, { Component } from 'react'
import { Card, Row, Col, List, Avatar } from 'antd'
import './index.css'

class MobileApp extends Component {
  render() {
    const data = [
      {
        title: 'Quét trực tiếp',
        description: 'Dùng điện thoại làm công cụ quét công văn đơn giản.'
      },
      {
        title: 'Giao diện thân thiện',
        description: 'Giao diện thiết kế đơn giản tối đa dễ sử dụng.'
      },
      {
        title: 'Các tính năng ít nhưng mạnh mẽ',
        description: 'Với những tính năng cơ bản nhưng đủ dùng cho cả hệ thống.'
      },
      {
        title: 'Khả dụng trên cả Android và IOS',
        description: 'Hỗ trợ cả 2 hệ điều hành thịnh hành nhất hiện tại.'
      }
    ]
    return (
      <Card
        type="inner"
        title="Ứng dụng mobile"
        className="Scanner_Card_Parent"
      >
        <Row>
          <Col span={10}>
            <img
              src={process.env.PUBLIC_URL + '/images/mobileapp.jpg'}
              className="MobileAppLogo"
              alt="DLU"
              style={{ maxWidth: '90%' }}
            />
          </Col>
          <Col span={14} style={{ background: 'white' }}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="large"
                        shape="circle"
                        style={{ background: 'red' }}
                      >
                        New !
                      </Avatar>
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            <a href="Android download link!!!">
              <img
                className="DownloadButtonAndroid"
                src={process.env.PUBLIC_URL + '/images/android.png'}
                alt="DLU"
              />
            </a>
            <a href="IOS download link!!!">
              <img
                className="DownloadButtonIOS"
                src={process.env.PUBLIC_URL + '/images/ios.png'}
                alt="DLU"
              />
            </a>
          </Col>
        </Row>
      </Card>
    )
  }
}
export default MobileApp
