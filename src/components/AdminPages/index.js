import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Divider } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import './index.css'
import { connect } from 'react-redux'
import TableCommon from '../List/Table'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'
import * as actionNguoiDung from './../../actions/nguoiDung'
import * as constant from './../../constants'
import Message from '../../method/Message'
class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPage: 2
    }
  }

  componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
    this.props.get_all_cong_van()
    this.props.get_all_nguoiDung()
    this.setState({
      selectedPage: localStorage.getItem('selectedConfig')
        ? localStorage.getItem('selectedConfig')
        : 1
    })
  }
  addKeyToList = (listCV, listLinhVuc) => {
    if (listLinhVuc.length !== 0) {
      listCV.forEach((linhvuc, index) => {
        listCV[index]['key'] = listCV[index].id
        try {
          let date = listCV[index]['ngayBanHanh'].toString().substring(0, 10)
          listCV[index]['ngayBanHanh'] = date
          listCV[index]['linhVuc'] = listLinhVuc.find(
            x => x.maLinhVuc === listCV[index].maLinhVuc
          ).tenLinhVuc
        } catch (error) {
          listCV[index]['ngayBanHanh'] = 'ERROR'
          listCV[index]['linhVuc'] = 'Không xác định'
        }

        listCV[index]['index'] = index
      })
    }
    return listCV
  }
  setSelectedPage = pageIndex => {
    localStorage.setItem('selectedConfig', pageIndex)
  }
  onClicked = (Action, Type, selectedObj) => {
    if (Action === 'EDIT') {
      switch (Type) {
        case constant.NGUOIDUNG:
          break
        case constant.CONGVAN:
          break
        case constant.LOAICONGVAN:
          break
        case constant.LINHVUC:
          break
        default:
          Message('ERROR', 'error')
          break
      }
    } else if (Action === 'DELETE') {
      let sure = window.confirm('Bạn có chắc muốn xoá không ?')
      if (sure === true) {
        switch (Type) {
          case constant.NGUOIDUNG:
            this.props.xoa_nguoi_dung(selectedObj.maTaiKhoan)
            break
          case constant.CONGVAN:
            this.props.xoa_cong_van(selectedObj.id)
            break
          case constant.LOAICONGVAN:
            this.props.xoa_loai_cong_van(selectedObj.maLoai)
            break
          case constant.LINHVUC:
            this.props.xoa_linh_vuc(selectedObj.maLinhVuc)
            break
          default:
            Message('ERROR: ' + Type, 'error')
            break
        }
      }
    }
  }
  render() {
    const { TabPane } = Tabs
    let { listLoaiCongVan, listLinhVuc, listNguoiDung } = this.props
    let listCV = this.addKeyToList(this.props.listCV, listLinhVuc)

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
        key: 'action1',
        width: '12%',
        render: congVan => (
          <span>
            <span
              className="Link"
              onClick={() =>
                this.onClicked('ADDNEW', constant.CONGVAN, congVan)
              }
            >
              Thêm mới
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('EDIT', constant.CONGVAN, congVan)}
            >
              Sửa
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() =>
                this.onClicked('DELETE', constant.CONGVAN, congVan)
              }
            >
              Xoá
            </span>
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
        width: '8%'
      },
      {
        title: 'Tên loại',
        dataIndex: 'tenLoai',
        key: 'tenLoai',
        width: '38%'
      },
      {
        title: 'Mô  tả',
        dataIndex: 'moTa',
        key: 'moTa',
        width: '40%'
      },
      {
        title: 'Hành động',
        key: 'action2',
        width: '15%',
        render: text => (
          <span>
            <span
              className="Link"
              onClick={() =>
                this.onClicked('ADDNEW', constant.LOAICONGVAN, text)
              }
            >
              Thêm mới
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('EDIT', constant.LOAICONGVAN, text)}
            >
              Sửa
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() =>
                this.onClicked('DELETE', constant.LOAICONGVAN, text)
              }
            >
              Xoá
            </span>
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
        width: '35%'
      },
      {
        title: 'Hành động',
        key: 'action3',
        width: '12%',
        render: text => (
          <span>
            <span
              className="Link"
              onClick={() => this.onClicked('ADDNEW', constant.LINHVUC, text)}
            >
              Thêm mới
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('EDIT', constant.LINHVUC, text)}
            >
              Sửa
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('DELETE', constant.LINHVUC, text)}
            >
              Xoá
            </span>
          </span>
        )
      }
    ]
    const columnsNguoiDung = [
      {
        title: 'Tên tài khoản',
        dataIndex: 'tenTaiKhoan',
        key: 'tenTaiKhoan',
        width: '15%'
      },
      {
        title: 'Tên người dùng',
        dataIndex: 'hoTen',
        key: 'hoTen',
        width: '15%'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '35%'
      },
      {
        title: 'Quyền',
        dataIndex: 'phanQuyen',
        key: 'phanQuyen',
        width: '10%'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'trangThai',
        key: 'trangThai',
        render: trangThai => (
          <span className={trangThai ? 'Active' : 'Deactive'}>
            {trangThai ? 'Đang hoạt động' : 'Ngừng kích hoạt'}
          </span>
        ),
        width: '10%'
      },
      {
        title: 'Hành động',
        key: 'action4',
        width: '12%',
        render: text => (
          <span>
            <span
              className="Link"
              onClick={() => this.onClicked('ADDNEW', constant.NGUOIDUNG, text)}
            >
              Thêm mới
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('EDIT', constant.NGUOIDUNG, text)}
            >
              Sửa
            </span>
            <Divider type="vertical" />
            <span
              className="Link"
              onClick={() => this.onClicked('DELETE', constant.NGUOIDUNG, text)}
            >
              Xoá
            </span>
          </span>
        )
      }
    ]
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
    return (
      <Card
        type="inner"
        title="Hệ thống quản trị"
        className="Scanner_Card_Parent"
      >
        <Row>
          <Col span={24}>
            <StickyContainer>
              <Tabs
                defaultActiveKey={this.state.selectedPage}
                renderTabBar={renderTabBar}
                onTabClick={this.setSelectedPage}
              >
                <TabPane tab="(1) Quản lý người dùng" key="1">
                  <TableCommon
                    title="Danh sách người dùng"
                    data={listNguoiDung}
                    columns={columnsNguoiDung}
                    rowKey={'maTaiKhoan'}
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
                    rowKey={'maLoai'}
                  />
                </TabPane>
                <TabPane tab="(4) Quản lý lĩnh vực" key="4">
                  <TableCommon
                    title="Danh sách lĩnh vực"
                    data={listLinhVuc}
                    columns={columnsLinhVuc}
                    rowKey={'maLinhVuc'}
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
    },
    get_all_nguoiDung: () => {
      dispatch(actionNguoiDung.fetchGetList())
    },
    xoa_cong_van: CongVanID => {
      dispatch(action.deleteTask_Request(CongVanID))
    },
    xoa_loai_cong_van: LoaiCongVanID => {
      dispatch(actionLoaiCongVan.deleteTask_Request(LoaiCongVanID))
    },
    xoa_linh_vuc: LinhVucID => {
      dispatch(actionLinhVuc.deleteTask_Request(LinhVucID))
    },
    xoa_nguoi_dung: NguoiDungID => {
      dispatch(actionNguoiDung.deleteTask_Request(NguoiDungID))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listCV: state.task.listTask,
    listLoaiCongVan: state.loaiCongVan.byId,
    listLinhVuc: state.linhVuc.byId,
    listNguoiDung: state.nguoiDung.byId
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)
