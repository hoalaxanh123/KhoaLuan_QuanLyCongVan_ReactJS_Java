import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Divider, Icon } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import './index.css'
import { connect } from 'react-redux'
import TableCommon from '../List/Table'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'

const columnsCongvan = [
  {
    title: 'Số hiệu',
    dataIndex: 'soKyHieu',
    key: 'soKyHieu',
    render: text => <span>{text}</span>,
    width: '8%'
  },
  {
    title: 'Trích yếu',
    dataIndex: 'trichYeu',
    key: 'trichYeu',
    width: '50%'
  },
  {
    title: 'Ngày ban hành',
    dataIndex: 'ngayBanHanh',
    key: 'ngayBanHanh',
    width: '6%'
  },
  {
    title: 'Lĩnh vực',
    dataIndex: 'linhVuc',
    key: 'linhVuc',
    width: '10%'
  },
  {
    title: 'Người ký',
    dataIndex: 'nguoiKy',
    key: 'nguoiKy',
    width: '8%'
  },
  {
    title: 'Cơ quan ban hành',
    key: 'coQuanBanHanh',
    dataIndex: 'coQuanBanHanh',
    width: '6%'
  },
  {
    title: 'Hành động',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <span className="Link">Edit</span>
        <Divider type="vertical" />
        <span className="Link">Delete</span>
      </span>
    )
  }
]
const columnsLoaiCongvan = [
  {
    title: 'Mã loại',
    dataIndex: 'maLoai',
    key: 'maLoai',
    render: text => <span>{text}</span>,
    width: '10%'
  },
  {
    title: 'Tên loại',
    dataIndex: 'tenLoai',
    key: 'tenLoai',
    width: '40%'
  },
  {
    title: 'Mô  tả',
    dataIndex: 'moTa',
    key: 'moTa',
    width: '40%'
  },
  {
    title: 'Hành động',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <span className="Link">Edit</span>
        <Divider type="vertical" />
        <span className="Link">Delete</span>
      </span>
    )
  }
]
const columnsLinhVuc = [
  {
    title: 'Mã lĩnh vực',
    dataIndex: 'maLinhVuc',
    key: 'maLinhVuc',
    render: text => <span>{text}</span>,
    width: '10%'
  },
  {
    title: 'Tên lĩnh vực',
    dataIndex: 'tenLinhVuc',
    key: 'tenLinhVuc',
    width: '40%'
  },
  {
    title: 'Tên viết tắt',
    dataIndex: 'tenVietTat',
    key: 'tenVietTat',
    width: '40%'
  },
  {
    title: 'Hành động',
    key: 'action',
    width: '10%',
    render: (text, record) => (
      <span>
        <span className="Link">Edit</span>
        <Divider type="vertical" />
        <span className="Link">Delete</span>
      </span>
    )
  }
]
class Admin extends Component {
  componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
    this.props.get_all_cong_van()
  }
  addKeyToList = (listCV, listLinhVuc) => {
    if (listLinhVuc.length !== 0) {
      listCV.map((linhvuc, index) => {
        listCV[index]['key'] = listCV[index].id
        let date = listCV[index]['ngayBanHanh'].substring(0, 10)
        listCV[index]['ngayBanHanh'] = date
        debugger
        listCV[index]['linhVuc'] = listLinhVuc.find(
          x => x.maLinhVuc === listCV[index].maLinhVuc
        ).tenLinhVuc
        listCV[index]['index'] = index
      })
    }
    return listCV
  }
  render() {
    const { TabPane } = Tabs
    const { state } = this
    let { listLoaiCongVan, listLinhVuc } = this.props
    let listCV = this.addKeyToList(this.props.listCV, listLinhVuc)

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
            <span>Edit</span>
            <Divider type="vertical" />
            <span>Delete</span>
            <Divider type="vertical" />
            <span className="ant-dropdown-link">
              More actions <Icon type="down" />
            </span>
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
                <TabPane tab="(1) Quản lý người dùng" key="1">
                  <TableCommon
                    title="Danh sách người dùng"
                    data={data}
                    columns={columns}
                  />
                </TabPane>
                <TabPane tab="(2) Quản lý công văn" key="2">
                  <TableCommon
                    title="Danh sách công văn"
                    data={listCV}
                    columns={columnsCongvan}
                  />
                </TabPane>
                <TabPane tab="(3) Quản lý loại công văn" key="3">
                  <TableCommon
                    title="Danh sách loại công văn"
                    data={listLoaiCongVan}
                    columns={columnsLoaiCongvan}
                  />
                </TabPane>
                <TabPane tab="(4) Quản lý lĩnh vực" key="4">
                  <TableCommon
                    title="Danh sách lĩnh vực"
                    data={listLinhVuc}
                    columns={columnsLinhVuc}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_all_cong_van: () => {
      dispatch(action.fetchGetList())
    },
    get_all_loai_cong_van: () => {
      dispatch(actionLoaiCongVan.fetchGetList())
    },
    get_all_linhvuc: () => {
      dispatch(actionLinhVuc.fetchGetList())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listCV: state.task.listTask,
    listLoaiCongVan: state.loaiCongVan.byId,
    listLinhVuc: state.linhVuc.byId
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
