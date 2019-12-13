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
import * as constantAction from '../../constants/task'
import FormLinhVuc from '../List/FormLinhVuc'
import FormUser from '../List/FormUser'
import FormCongVan from '../List/FormCongVan'
import FormLoaiCongVan from '../List/FormLoaiCongVan'
import FormEditCongVan from '../List/FormEditCongVan'
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

  UNSAFE_componentWillMount() {
    document.title = 'DLU | Trang quản trị'
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
            'Sửa tài khoản: ' + selectedObj.username,
            constantAction.EDIT_NGUOIDUNG,
            selectedObj
          )
          break
        case constant.CONGVAN:
          this.showFormEditCongVan(
            'Sửa công văn: ' + selectedObj.soKyHieu,
            constantAction.EDIT_TASK,
            selectedObj
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
      displayFormEditCongVan: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  hideForm = (title, action = '', selectedObj = null) => {
    this.setState({
      displayForm: false,
      displayFormLinhVuc: false,
      displayFormNguoiDung: false,
      displayFormCongVan: false,
      displayFormEditCongVan: false
    })
  }
  showFormLinhVuc = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormLinhVuc: true,
      displayForm: false,
      displayFormNguoiDung: false,
      displayFormEditCongVan: false,
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
      displayFormEditCongVan: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  showFormEditCongVan = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormEditCongVan: true,
      displayFormNguoiDung: false,
      displayFormLinhVuc: false,
      displayForm: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }

  onSubmit = param => {
    switch (param.action) {
      case constantAction.EDIT_TASK:
        this.props.edit_cong_van({
          id: param.id,
          timDong: param.timDong,
          soKyHieu: param.soKyHieu,
          ngayBanHanh: param.ngayBanHanh,
          nguoiKy: param.nguoiKy,
          mucDo: param.mucDo,
          coQuanBanHanh: param.coQuanBanHanh,
          ngayCoHieuLuc: param.ngayCoHieuLuc,
          trichYeu: param.trichYeu,
          noiNhan: param.noiNhan,
          maLinhVuc: param.maLinhVuc,
          tapTin: param.tapTin,
          maLoai: param.maLoai,
          noiDung: param.noiDung
        })

        this.hideForm()
        break
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
          password: param.password,
          phanQuyen: param.phanQuyen,
          sdt: param.sdt,
          username: param.username,
          trangThai: param.trangThai
        })

        this.hideForm()
        break
      case constantAction.EDIT_NGUOIDUNG:
        this.props.edit_user({
          diaChi: param.diaChi,
          email: param.email,
          hoTen: param.hoTen,
          maTaiKhoan: param.maTaiKhoan,
          password: param.password,
          phanQuyen: param.phanQuyen,
          sdt: param.sdt,
          username: param.username,
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
      displayFormEditCongVan: false,
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
        sorter: (a, b) => a.soKyHieu.localeCompare(b.soKyHieu),
        sortDirections: ['descend', 'ascend'],
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
        sorter: (a, b) => a.trichYeu.localeCompare(b.soKyHieu),
        sortDirections: ['descend', 'ascend'],
        width: '45%',
        render: trichYeu => (
          <span title={trichYeu} titile={trichYeu}>
            {trichYeu.length > constant.MAX_LENGTH_LINE
              ? trichYeu.substring(0, 160).concat('...')
              : trichYeu}
          </span>
        )
      },
      // {
      //   title: 'Ngày ban hành',
      //   dataIndex: 'ngayBanHanh',
      //   key: 'ngayBanHanh',
      //   width: '6%'
      // },
      {
        title: 'Lĩnh vực',
        dataIndex: 'linhVuc',
        key: 'linhVuc',
        width: '10%',
        sorter: (a, b) => a.linhVuc.localeCompare(b.linhVuc),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Người ký',
        dataIndex: 'nguoiKy',
        key: 'nguoiKy',
        sorter: (a, b) => a.nguoiKy.localeCompare(b.nguoiKy),
        sortDirections: ['descend', 'ascend'],
        width: '8%'
      },
      // {
      //   title: 'Cơ quan ban hành',
      //   key: 'coQuanBanHanh',
      //   dataIndex: 'coQuanBanHanh',
      //   width: '6%'
      // },
      {
        title: 'Hành động',
        key: 'action1',
        width: '15%',
        render: congVan => (
          <span>
            <span
              className="Link"
              onClick={() =>
                this.onClicked('ADDNEW', constant.CONGVAN, congVan)
              }
            >
              Thêm
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
        width: '8%',
        sorter: (a, b) =>
          a.maLoai.toString().localeCompare(b.maLoai.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Tên loại',
        dataIndex: 'tenLoai',
        key: 'tenLoai',
        width: '38%',
        sorter: (a, b) =>
          a.tenLoai.toString().localeCompare(b.tenLoai.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Mô  tả',
        dataIndex: 'moTa',
        key: 'moTa',
        width: '40%',
        sorter: (a, b) => a.moTa.toString().localeCompare(b.moTa.toString()),
        sortDirections: ['descend', 'ascend']
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
              Thêm
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
        width: '10%',
        sorter: (a, b) =>
          a.maLinhVuc.toString().localeCompare(b.maLinhVuc.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Tên lĩnh vực',
        dataIndex: 'tenLinhVuc',
        key: 'tenLinhVuc',
        width: '40%',
        sorter: (a, b) =>
          a.tenLinhVuc.toString().localeCompare(b.tenLinhVuc.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Tên viết tắt',
        dataIndex: 'tenVietTat',
        key: 'tenVietTat',
        width: '35%',
        sorter: (a, b) => {
          a.tenVietTat = a.tenVietTat !== null ? a.tenVietTat : ' '
          b.tenVietTat = b.tenVietTat !== null ? b.tenVietTat : ' '
          a.tenVietTat.toString().localeCompare(b.tenVietTat.toString())
        },
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Hành động',
        key: 'action3',
        width: '15%',
        render: text => (
          <span>
            <span
              className="Link"
              onClick={() => this.onClicked('ADDNEW', constant.LINHVUC, text)}
            >
              Thêm
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
        dataIndex: 'username',
        key: 'username',
        width: '15%',
        sorter: (a, b) =>
          a.username.toString().localeCompare(b.username.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Tên người dùng',
        dataIndex: 'hoTen',
        key: 'hoTen',
        width: '15%',
        sorter: (a, b) => a.hoTen.toString().localeCompare(b.hoTen.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '35%',
        sorter: (a, b) => a.email.toString().localeCompare(b.email.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Quyền',
        dataIndex: 'phanQuyen',
        key: 'phanQuyen',
        width: '10%',
        sorter: (a, b) =>
          a.phanQuyen.toString().localeCompare(b.phanQuyen.toString()),
        sortDirections: ['descend', 'ascend']
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
        width: '10%',
        sorter: (a, b) =>
          a.trangThai.toString().localeCompare(b.trangThai.toString()),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Hành động',
        key: 'action4',
        width: '15%',
        render: text => (
          <span>
            <span
              className="Link"
              onClick={() => this.onClicked('ADDNEW', constant.NGUOIDUNG, text)}
            >
              Thêm
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
        <FormLoaiCongVan
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
          listLoaiCongVan={this.props.listLoaiCongVan}
          listLinhVuc={this.props.listLinhVuc}
        />
        <FormEditCongVan
          displayForm={this.state.displayFormEditCongVan}
          titleForm={this.state.titleForm}
          onSubmit={this.onSubmit}
          action={this.state.action}
          selectedObj={this.state.selectedObj}
          listLoaiCongVan={this.props.listLoaiCongVan}
          listLinhVuc={this.props.listLinhVuc}
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
                  tab={`Quản lý lĩnh vực (${listLinhVuc.length})`}
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
    edit_cong_van: congVan => {
      dispatch(action.editTask_Request(congVan))
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
