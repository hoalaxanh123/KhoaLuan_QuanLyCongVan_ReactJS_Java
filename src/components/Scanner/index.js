import React, { Component } from 'react'
import * as constant from './../../constants/index'
import FormCreateCongVan from './form'
import { connect } from 'react-redux'
import { Card, Row, Col, Input, Form, Icon, Button, Upload, Modal } from 'antd'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'
import {
  congVanDaoTao,
  congVanDen,
  congVanDi,
  stopword
} from '../../constants/common'
const { TextArea } = Input

//1.5: Cắt chuỗi thành mảng bằng dấu cách
const arrCongvanDaoTao = congVanDaoTao.toLowerCase().split(' ')
const arrCongVanDen = congVanDen.toLowerCase().split(' ')
const arrCongVanDi = congVanDi.toLowerCase().split(' ')
const arrStopword = stopword.toLowerCase().split(' ')
const regexGetDate = /(\d{1,2}) tháng (\d{1,2}) năm (\d{4})/

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
class Scanner extends Component {
  state = {
    fileList: [],
    contentReading: '',
    loaiCV: 1,
    previewVisible: false,
    previewImage: '',
    trichDan: '',
    fileUploaded: [],
    ngayThangNam: null
  }
  phanLoai = inputFilter => {
    let result = 1

    let resultCongVanDen = inputFilter.filter(x => arrCongVanDen.includes(x))

    let resultCongVanDi = inputFilter.filter(x => arrCongVanDi.includes(x))
    result = resultCongVanDi.length > resultCongVanDen.length ? 2 : result

    let resultCongVanDaoTao = inputFilter.filter(x =>
      arrCongvanDaoTao.includes(x)
    )
    result = resultCongVanDaoTao.length > resultCongVanDi.length ? 3 : result
    return result
  }
  getDate = input => {
    let date = null

    var numberPattern = /\d+/g
    let result = input[0].toString().match(numberPattern)
    date = `${result[2]}-${result[1]}-${result[0]}`

    return date
  }
  reRestParent = () => {
    this.setState({
      fileList: [],
      contentReading: '',
      loaiCV: 1,
      previewVisible: false,
      previewImage: '',
      trichDan: '',
      fileUploaded: [],
      ngayThangNam: null
    })
  }
  handleChange = info => {
    let fileList = [...info.fileList]
    let content = ''
    let fileUploaded = []
    console.log('fileList :', fileList)
    fileList.forEach(file => {
      if (file.response) {
        // Component will show file.url as link
        try {
          content = content.trim() + '\n' + file.response.content.trim()
          fileUploaded.push(file.response.fileName.concat('.pdf'))
        } catch (error) {}
      }
    })
    let arrayInput = content
      .trim()
      .toLowerCase()
      .split(' ')
    let inputFilter = arrayInput.filter(x => arrStopword.indexOf(x) === -1)
    let trichDan = inputFilter.toString().replace(/,/g, ' ')
    let ngayThangNam = trichDan.match(regexGetDate)
    let date = null
    if (ngayThangNam && ngayThangNam.length > 0) {
      date = this.getDate(ngayThangNam)
    }
    this.setState({ trichDan, ngayThangNam: date })
    if (info.file.status === 'done') {
      let loaiCV = this.phanLoai(inputFilter)
      this.setState({ loaiCV })
    }
    this.setState({ fileList, contentReading: content, fileUploaded })
  }
  UNSAFE_componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
  }
  parentClick = task => {
    console.log('task :', JSON.stringify(task))
    this.props.add_task(task)
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    return (
      <Card
        type="inner"
        title="Số hoá công văn"
        className="Scanner_Card_Parent"
      >
        <Row>
          {/* Scanner */}
          <Col span={24}>
            <Card type="inner">
              <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <label className="danger">
                  Lưu ý: Để đạt hiệu quả nhất, môi lần chọn tối đa 5 hình.
                </label>
                <Form.Item label="Hình ảnh:">
                  <Upload
                    action={constant.API_URL_UPFILE}
                    multiple={true}
                    fileList={fileList}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    accept="image/*"
                    onChange={this.handleChange}
                  >
                    <Button block>
                      <Icon type="upload" /> Chọn hình ảnh để tiến hành xử lý
                    </Button>
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: '100%' }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Result */}
          <Col span={12}>
            <Card type="inner" style={{ marginTop: '5px', maxWidth: '99%' }}>
              <label>Kết quả:</label>
              <TextArea
                rows={36}
                value={this.state.contentReading.trim()}
                onChange={this.onChange}
                placeholder=""
              />
            </Card>
          </Col>

          {/* Form */}
          <Col span={12}>
            <FormCreateCongVan
              listLoaiCongVan={this.props.listLoaiCongVan}
              listLinhVuc={this.props.listLinhVuc}
              loaiCV={this.state.loaiCV}
              content={this.state.contentReading}
              onCreate={this.parentClick}
              trichDan={this.state.trichDan}
              fileUploaded={this.state.fileUploaded}
              date={this.state.ngayThangNam}
              noiDung={this.state.contentReading}
              reRestParent={this.reRestParent}
            />
          </Col>
        </Row>
      </Card>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_all_loai_cong_van: () => {
      dispatch(actionLoaiCongVan.fetchGetList())
    },
    get_all_linhvuc: () => {
      dispatch(actionLinhVuc.fetchGetList())
    },
    add_task: task => {
      dispatch(action.addTask_Request(task))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listLoaiCongVan: state.loaiCongVan.byId,
    listLinhVuc: state.linhVuc.byId
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner)
