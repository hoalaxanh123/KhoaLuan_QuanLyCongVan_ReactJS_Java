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
import FormAction from '../List/FormAction'
import * as constantAction from '../../constants/task'
import FormLinhVuc from '../List/FormLinhVuc'
import FormUser from '../List/FormUser'
import FormCongVan from '../List/FormCongVan'
class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPage: 2,
      displayForm: false,
      displayFormLinhVuc: false,
      displayFormNguoiDung: false,
      displayFormCongVan: false,
      titleForm: '',
      action: '',
      selectedObj: undefined
    }
  }

  componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
    this.props.get_all_cong_van()
    this.props.get_all_nguoiDung()
    if (!localStorage.getItem('selectedConfig')) {
      this.setSelectedPage(1)
    }
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
          this.showFormNguoiDung(
            'Sửa tài khoản: ' + selectedObj.tenTaiKhoan,
            constantAction.EDIT_NGUOIDUNG,
            selectedObj
          )
          break
        case constant.CONGVAN:
          Message(
            'Không thể sửa công văn !',
            'error',
            3000,
            'ERROR',
            'Sửa công văn'
          )
          break
        case constant.LOAICONGVAN:
          this.showForm(
            'Sửa loại công văn: ' + selectedObj.tenLoai,
            constantAction.EDIT_LOAICONGVAN,
            selectedObj
          )
          break
        case constant.LINHVUC:
          this.showFormLinhVuc(
            'Sửa lĩnh vực: ' + selectedObj.tenLinhVuc,
            constantAction.EDIT_LINHVUC,
            selectedObj
          )
          break
        default:
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
            break
        }
      }
    } else if (Action === 'ADDNEW') {
      switch (Type) {
        case constant.NGUOIDUNG:
          this.showFormNguoiDung(
            'Thêm mới tài khoản: ',
            constantAction.ADD_NGUOIDUNG
          )
          break
        case constant.CONGVAN:
          Message(
            "Vui lòng chọn 'Số hoá công văn' từ menu",
            'warning',
            3000,
            'CHÚ Ý',
            'Thêm công văn'
          )
          break
        case constant.LOAICONGVAN:
          this.showForm(
            'Thêm mới loại công văn',
            constantAction.ADD_LOAICONGVAN
          )
          break
        case constant.LINHVUC:
          this.showFormLinhVuc('Thêm mới lĩnh vực', constantAction.ADD_LINHVUC)
          break
        default:
          break
      }
    }
  }
  showForm = (title, action = '', selectedObj = null) => {
    this.setState({
      displayForm: true,
      displayFormLinhVuc: false,
      displayFormNguoiDung: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  hideForm = (title, action = '', selectedObj = null) => {
    this.setState({
      displayForm: false,
      displayFormLinhVuc: false,
      displayFormNguoiDung: false
    })
  }
  showFormLinhVuc = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormLinhVuc: true,
      displayForm: false,
      displayFormNguoiDung: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  showFormNguoiDung = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormNguoiDung: true,
      displayFormLinhVuc: false,
      displayForm: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }

  onSubmit = param => {
    switch (param.action) {
      case constantAction.ADD_LINHVUC:
        this.props.add_linh_vuc({
          maLinhVuc: -1,
          tenLinhVuc: param.tenLinhVuc,
          tenVietTat: param.tenVietTat
        })
        this.hideForm()
        break
      case constantAction.EDIT_LINHVUC:
        this.props.edit_linh_vuc({
          maLinhVuc: param.maLinhVuc,
          tenLinhVuc: param.tenLinhVuc,
          tenVietTat: param.tenVietTat
        })
        this.hideForm()
        break
      case constantAction.ADD_LOAICONGVAN:
        this.props.add_loai_cong_van({
          maLoai: -1,
          moTa: param.moTa,
          tenLoai: param.tenLoai
        })
        this.hideForm()
        break
      case constantAction.EDIT_LOAICONGVAN:
        this.props.edit_loai_cong_van({
          maLoai: param.maLoai,
          moTa: param.moTa,
          tenLoai: param.tenLoai
        })
        this.hideForm()
        break
      case constantAction.ADD_NGUOIDUNG:
        this.props.add_user({
          diaChi: param.diaChi,
          email: param.email,
          hoTen: param.hoTen,
          maTaiKhoan: -1,
          matKhau: param.matKhau,
          phanQuyen: param.phanQuyen,
          sdt: param.sdt,
          tenTaiKhoan: param.tenTaiKhoan,
          trangThai: param.trangThai
        })

        this.hideForm()
        break
      case constantAction.EDIT_NGUOIDUNG:
        console.log('param :', param)
        this.props.edit_user({
          diaChi: param.diaChi,
          email: param.email,
          hoTen: param.hoTen,
          maTaiKhoan: param.maTaiKhoan,
          matKhau: param.matKhau,
          phanQuyen: param.phanQuyen,
          sdt: param.sdt,
          tenTaiKhoan: param.tenTaiKhoan,
          trangThai: param.trangThai
        })
        this.hideForm()
        break

      default:
        break
    }
  }
  onClicked2 = congVan => {
    this.showFormCongvan('Thông tin công văn', '', congVan)
  }
  showFormCongvan = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormCongVan: true,
      displayFormNguoiDung: false,
      displayFormLinhVuc: false,
      displayForm: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  render() {
    const { TabPane } = Tabs
    let { listLoaiCongVan, listLinhVuc, listNguoiDung } = this.props
    let listCV = this.addKeyToList(this.props.listCV, listLinhVuc)

    const columnsCongvan = [
      {
        title: 'Số hiệu',
        key: 'soKyHieu',
        width: '8%',
        render: congVan => (
          <span
            className="Link"
            onClick={() => this.onClicked2(congVan)}
            title={`Xem chi tiết công văn ${congVan.soKyHieu}`}
          >
            {congVan.soKyHieu}
          </span>
        )
      },
      {
        title: 'Trích yếu',
        dataIndex: 'trichYeu',
        key: 'trichYeu',
        width: '50%',
        render: trichYeu => (
          <span title={trichYeu} titile={trichYeu}>
            {trichYeu.length > constant.MAX_LENGTH_LINE
              ? trichYeu.substring(0, 160).concat('...')
              : trichYeu}
          </span>
        )
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
        <FormAction
          displayForm={this.state.displayForm}
          titleForm={this.state.titleForm}
          onSubmit={this.onSubmit}
          action={this.state.action}
          selectedObj={this.state.selectedObj}
        />
        <FormLinhVuc
          displayForm={this.state.displayFormLinhVuc}
          titleForm={this.state.titleForm}
          onSubmit={this.onSubmit}
          action={this.state.action}
          selectedObj={this.state.selectedObj}
        />
        <FormUser
          displayForm={this.state.displayFormNguoiDung}
          titleForm={this.state.titleForm}
          onSubmit={this.onSubmit}
          action={this.state.action}
          selectedObj={this.state.selectedObj}
          listNguoiDung={listNguoiDung}
        />
        <FormCongVan
          displayForm={this.state.displayFormCongVan}
          titleForm={this.state.titleForm}
          selectedObj={this.state.selectedObj}
        />
        <Row>
          <Col span={24}>
            <StickyContainer>
              <Tabs
                defaultActiveKey={this.state.selectedPage}
                renderTabBar={renderTabBar}
                onTabClick={this.setSelectedPage}
              >
                <TabPane
                  tab={` Quản lý người dùng (${listNguoiDung.length})`}
                  key="1"
                >
                  <TableCommon
                    title="Danh sách người dùng"
                    data={listNguoiDung}
                    columns={columnsNguoiDung}
                    rowKey={'maTaiKhoan'}
                    showExpand={false}
                  />
                </TabPane>
                <TabPane tab={` Quản lý công văn (${listCV.length})`} key="2">
                  <TableCommon
                    title="Danh sách công văn"
                    data={listCV}
                    columns={columnsCongvan}
                    showExpand={false}
                  />
                </TabPane>
                <TabPane
                  tab={`Quản lý loại công văn (${listLoaiCongVan.length})`}
                  key="3"
                >
                  <TableCommon
                    title="Danh sách loại công văn"
                    data={listLoaiCongVan}
                    columns={columnsLoaiCongvan}
                    rowKey={'maLoai'}
                    showExpand={false}
                  />
                </TabPane>
                <TabPane
                  tab={`Quản lý lĩnh vực (${listLoaiCongVan.length})`}
                  key="4"
                >
                  <TableCommon
                    title="Danh sách lĩnh vực"
                    data={listLinhVuc}
                    columns={columnsLinhVuc}
                    rowKey={'maLinhVuc'}
                    showExpand={false}
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
    },
    add_loai_cong_van: loaiCongVan => {
      dispatch(actionLoaiCongVan.addTask_Request(loaiCongVan))
    },
    edit_loai_cong_van: loaiCongVan => {
      dispatch(actionLoaiCongVan.editTask_Request(loaiCongVan))
    },
    add_linh_vuc: linhVuc => {
      dispatch(actionLinhVuc.addTask_Request(linhVuc))
    },
    edit_linh_vuc: linhVuc => {
      dispatch(actionLinhVuc.editTask_Request(linhVuc))
    },
    add_user: nguoiDung => {
      dispatch(actionNguoiDung.addTask_Request(nguoiDung))
    },
    edit_user: nguoiDung => {
      dispatch(actionNguoiDung.editTask_Request(nguoiDung))
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
