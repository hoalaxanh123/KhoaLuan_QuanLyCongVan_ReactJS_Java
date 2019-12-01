import React, { Component } from 'react'
import { Modal, Form } from 'antd'
import { API_URL_DOWNFILE } from '../../constants'
class FormCongVan extends Component {
  state = {
    visible: false,
    TitleForm: '',
    coQuanBanHanh: '',
    id: 0,
    maLinhVuc: '',
    maLoai: '',
    mucDo: 0,
    ngayBanHanh: '',
    ngayCoHieuLuc: '',
    nguoiKy: '',
    noiDung: '',
    noiNhan: '',
    soKyHieu: '',
    tapTin: [],
    timDong: ''
  }

  showModal = () => {
    this.setState({
      displayForm: true
    })
  }

  handleOkForm = e => {
    this.setState({
      displayForm: false
    })
  }

  handleCancelForm = e => {
    this.setState({
      coQuanBanHanh: '',
      id: 0,
      maLinhVuc: '',
      maLoai: '',
      mucDo: 0,
      ngayBanHanh: '',
      ngayCoHieuLuc: '',
      nguoiKy: '',
      noiDung: '',
      noiNhan: '',
      soKyHieu: '',
      tapTin: [],
      timDong: '',
      displayForm: false
    })
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      if (nextProp.selectedObj) {
        this.setState({
          displayForm: nextProp.displayForm,
          TitleForm: nextProp.titleForm,
          action: nextProp.action,
          coQuanBanHanh: nextProp.selectedObj.coQuanBanHanh,
          id: nextProp.selectedObj.id,
          maLinhVuc: nextProp.selectedObj.maLinhVuc,
          maLoai: nextProp.selectedObj.maLoai,
          mucDo: nextProp.selectedObj.mucDo,
          ngayBanHanh: nextProp.selectedObj.ngayBanHanh,
          ngayCoHieuLuc: nextProp.selectedObj.ngayCoHieuLuc,
          nguoiKy: nextProp.selectedObj.nguoiKy,
          noiDung: nextProp.selectedObj.noiDung,
          noiNhan: nextProp.selectedObj.noiNhan,
          soKyHieu: nextProp.selectedObj.soKyHieu,
          tapTin: nextProp.selectedObj.tapTin,
          timDong: nextProp.selectedObj.timDong,
          trichYeu: nextProp.selectedObj.trichYeu
        })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  resetForm = () => {
    this.setState({
      coQuanBanHanh: '',
      id: 0,
      maLinhVuc: '',
      maLoai: '',
      mucDo: 0,
      ngayBanHanh: '',
      ngayCoHieuLuc: '',
      nguoiKy: '',
      noiDung: '',
      noiNhan: '',
      soKyHieu: '',
      tapTin: '',
      timDong: '',
      trichYeu: ''
    })
  }
  onHandleChange = param => {
    var target = param.target
    var name = target.name
    var value
    value = target.value

    this.setState({
      [name]: value
    })
  }

  UNSAFE_componentWillMount() {
    this.resetForm()
  }
  render() {
    let tepTinState = this.state.tapTin
    let tepTin = tepTinState
    try {
      if (tepTinState.split(',').length >= 1) {
        tepTin = tepTinState.split(',').map((x, index) => {
          let link = `${API_URL_DOWNFILE}/${x.toString().trim()}`
          return (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tải xuống tập tin {index + 1} |
            </a>
          )
        })
      }
    } catch (error) {}

    if (!this.state.ngayBanHanh) {
      return <div></div>
    }
    return (
      <div>
        <Modal
          width={'65%'}
          title={this.state.TitleForm}
          visible={this.state.displayForm}
          onOk={this.handleOkForm}
          onCancel={this.handleCancelForm}
          footer={[]}
          centered={true}
        >
          <table className="tableChiTietCongVan">
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Tiêu đề</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Số ký hiệu:</td>
                <td>{this.state.soKyHieu}</td>
              </tr>
              <tr>
                <td>Lĩnh vực:</td>
                <td>{this.state.maLinhVuc}</td>
              </tr>
              <tr>
                <td>Loại công văn:</td>
                <td>{this.state.maLoai}</td>
              </tr>
              <tr>
                <td>Cơ quan ban hành:</td>
                <td>{this.state.coQuanBanHanh}</td>
              </tr>
              <tr>
                <td>Mức độ:</td>
                <td>{this.state.mucDo}</td>
              </tr>
              <tr>
                <td>Ngày ban hành:</td>
                <td>{this.state.ngayBanHanh.toString().substring(0, 10)}</td>
              </tr>
              <tr>
                <td>Ngày có hiệu lực:</td>
                <td>{this.state.ngayCoHieuLuc.toString().substring(0, 10)}</td>
              </tr>
              <tr>
                <td>Người ký:</td>
                <td>{this.state.nguoiKy}</td>
              </tr>
              <tr>
                <td>Nơi nhận:</td>
                <td>{this.state.noiNhan}</td>
              </tr>
              <tr>
                <td>Trích yếu:</td>
                <td>{this.state.trichYeu}</td>
              </tr>
              <tr>
                <td>Tập tin:</td>
                <td>{tepTin}</td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(FormCongVan)
