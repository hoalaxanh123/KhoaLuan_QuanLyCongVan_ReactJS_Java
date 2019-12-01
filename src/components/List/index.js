import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormFind from './../FormFind'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'
import TableCommon from './Table'
import FormCongVan from './FormCongVan'
import FormLines from './FormLines'
import { MAX_LENGTH_LINE, MAX_LENGTH_SHORT_LINE } from '../../constants'

const expandedRowRender = record => <p>{record.description}</p>
const title = () => 'Here is title'
const showHeader = true
const footer = () => 'Here is footer'
const scroll = { y: 240 }
const pagination = { position: 'bottom' }

class ListCV extends Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'small',
    expandedRowRender: undefined,
    title: undefined,
    showHeader,
    footer: undefined,
    rowSelection: undefined,
    scroll: undefined,
    hasData: true,
    keyword: '',
    loaiCongVan: -1,
    linhVuc: -4,
    ngayBatDau: null,
    ngayKetThuc: null,
    nguoiKy: '',
    coQuanBanHanh: '',
    displayFormCongVan: false,
    displayFormLine: false,
    titleForm: '',
    lines: [],
    Finding: false,
    cacDongTinDuoc: []
  }

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable })
  }

  handleSizeChange = e => {
    this.setState({ size: e.target.value })
  }

  handleExpandChange = enable => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined })
  }

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined })
  }

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false })
  }

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined })
  }

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined })
  }

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined })
  }

  handleDataChange = hasData => {
    this.setState({ hasData })
  }

  handlePaginationChange = e => {
    const { value } = e.target
    this.setState({
      pagination: value === 'none' ? false : { position: value }
    })
  }
  componentDidMount() {}
  componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
    this.props.get_all_cong_van()
  }
  filterByState = listCV => {
    let result = []
    let state = this.state
    listCV.forEach(x => {
      let flag = true
      if (flag === true && state.keyword.length > 0) {
        x.noiDung
          .trim()
          .toLowerCase()
          .includes(state.keyword.trim().toLowerCase())
          ? (flag = true)
          : (flag = false)
      }
      if (flag === true && state.linhVuc > 0) {
        x.maLinhVuc === state.linhVuc ? (flag = true) : (flag = false)
      }
      if (flag === true && state.loaiCongVan > 0) {
        x.maLoai === state.loaiCongVan ? (flag = true) : (flag = false)
      }
      if (flag === true && state.nguoiKy.length > 0) {
        x.nguoiKy === state.nguoiKy ? (flag = true) : (flag = false)
      }
      if (flag === true && state.coQuanBanHanh.length > 0) {
        x.coQuanBanHanh === state.coQuanBanHanh ? (flag = true) : (flag = false)
      }
      if (flag === true && state.ngayBatDau && state.ngayKetThuc) {
        let dateCurrent = new Date(x.ngayBanHanh.toString().substring(0, 10))
        let dateStart = new Date(state.ngayBatDau)
        let dateEnd = new Date(state.ngayKetThuc)
        dateCurrent.setHours(0, 0, 0, 0)
        dateStart.setHours(0, 0, 0, 0)
        dateEnd.setHours(0, 0, 0, 0)
        if (dateCurrent >= dateStart && dateCurrent <= dateEnd) flag = true
        else flag = false
      }
      if (flag === true) {
        let temp = JSON.parse(x.timDong)
        let keys = Object.keys(temp)
        let lines = []
        if (state.keyword !== '') {
          for (let index = 1; index <= keys.length; index++) {
            if (
              temp[index]
                .trim()
                .toLowerCase()
                .includes(state.keyword.trim().toLowerCase())
            ) {
              lines.push(index)
            }
          }
        }
        if (lines.length > 0) {
          x['lines'] = lines
        }
        result.push(x)
      }
    })
    return result
  }
  addKeyToList = (listCV, listLinhVuc) => {
    if (listLinhVuc.length !== 0) {
      listCV.forEach((linhvuc, index) => {
        listCV[index]['key'] = listCV[index].id
        listCV[index]['description'] = listCV[index].trichYeu
        try {
          let date = listCV[index]['ngayBanHanh'].toString().substring(0, 10)
          listCV[index]['ngayBanHanh'] = date
          if (!isNaN(listCV[index].maLinhVuc)) {
            listCV[index]['linhVuc'] = listLinhVuc.find(
              x => x.maLinhVuc === listCV[index].maLinhVuc
            ).tenLinhVuc
          }
        } catch (error) {
          listCV[index]['ngayBanHanh'] = 'ERROR'
          listCV[index]['linhVuc'] = 'Unknown'
        }
      })
    }
    return listCV
  }
  showFormCongvan = (title, action = '', selectedObj = null) => {
    this.setState({
      displayFormCongVan: true,
      displayFormLine: false,
      titleForm: title,
      action: action,
      selectedObj: selectedObj
    })
  }
  showFormLine = (timDong = null, cacDongTimDuoc = []) => {
    this.setState({
      displayFormLine: true,
      displayFormCongVan: false,
      titleForm: '',
      lines: timDong,
      cacDongTimDuoc: cacDongTimDuoc
    })
  }
  process = listCV => {
    let arrayNguoiKy = []
    let arrayCoQuanBanHanh = []
    for (let congVan of listCV) {
      // eslint-disable-line
      if (arrayNguoiKy.indexOf(congVan.nguoiKy) === -1) {
        arrayNguoiKy.push(congVan.nguoiKy)
      }
      if (arrayCoQuanBanHanh.indexOf(congVan.coQuanBanHanh) === -1) {
        arrayCoQuanBanHanh.push(congVan.coQuanBanHanh)
      }
    }
    return {
      arrayNguoiKy: arrayNguoiKy,
      arrayCoQuanBanHanh: arrayCoQuanBanHanh
    }
  }
  handleSearch = state => {
    this.setState({
      keyword: state.keyword,
      loaiCongVan: state.loaiCongVan,
      linhVuc: state.linhVuc,
      ngayBatDau: state.ngayBatDau,
      ngayKetThuc: state.ngayKetThuc,
      nguoiKy: state.nguoiKy,
      coQuanBanHanh: state.coQuanBanHanh,
      displayFormCongVan: false,
      displayFormLine: false
    })
  }
  onClicked2 = congVan => {
    this.showFormCongvan('Thông tin công văn', '', congVan)
  }
  render() {
    let { listLoaiCongVan, listLinhVuc } = this.props
    let listCV = this.props.listCV
    let result = this.process(listCV)
    let arrayNguoiKy = result.arrayNguoiKy
    let arrayCoQuanBanHanh = result.arrayCoQuanBanHanh
    let listCVFilter = this.filterByState(listCV)
    listCV = this.addKeyToList(listCVFilter, listLinhVuc)
    let columns = [
      {
        title: 'Số hiệu',
        key: 'action1',
        width: '10%',
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
            {trichYeu.length > MAX_LENGTH_LINE
              ? trichYeu.substring(0, 160).concat('...')
              : trichYeu}
          </span>
        )
      },
      {
        title: 'Ngày ban hành',
        dataIndex: 'ngayBanHanh',
        key: 'ngayBanHanh',
        width: '10%'
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
        width: '10%'
      },
      {
        title: 'Cơ quan ban hành',
        key: 'coQuanBanHanh',
        dataIndex: 'coQuanBanHanh',
        width: '10%'
      },
      {
        title: '',
        key: 'lines',
        width: '10%',
        render: obj => (
          <span
            className="Link"
            title="Xem chi tiết"
            onClick={() => this.showFormLine(obj.timDong, obj.lines)}
          >
            {obj.lines
              ? obj.lines.toString().length > MAX_LENGTH_SHORT_LINE
                ? obj.lines
                    .toString()
                    .substring(0, MAX_LENGTH_SHORT_LINE)
                    .concat('...')
                : obj.lines.toString()
              : ''}
          </span>
        )
      }
    ]
    let selectedObj = this.state.selectedObj
    if (listLinhVuc.length > 0 && selectedObj) {
      let obj = listLinhVuc.find(x => x.maLinhVuc === selectedObj.maLinhVuc)
      if (obj) {
        selectedObj.maLinhVuc = obj.tenLinhVuc
      }
    }
    if (listLoaiCongVan.length > 0 && selectedObj) {
      let obj = listLoaiCongVan.find(x => x.maLoai === selectedObj.maLoai)
      if (obj) {
        selectedObj.maLoai = obj.tenLoai
      }
    }
    return (
      <div>
        <FormCongVan
          displayForm={this.state.displayFormCongVan}
          titleForm={this.state.titleForm}
          selectedObj={this.state.selectedObj}
        />
        <FormFind
          listLoaiCongVan={listLoaiCongVan}
          listCV={listCV}
          handleSearch={this.handleSearch}
          listLinhVuc={listLinhVuc}
          arrayNguoiKy={arrayNguoiKy}
          arrayCoQuanBanHanh={arrayCoQuanBanHanh}
        />
        <FormLines
          displayForm={this.state.displayFormLine}
          titleForm={this.state.titleForm}
          lines={this.state.lines}
          cacDongTimDuoc={this.state.cacDongTimDuoc}
        />
        <TableCommon
          title="Danh sách công văn"
          columns={columns}
          data={listCV}
          showExpand={true}
        />
      </div>
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
)(ListCV)