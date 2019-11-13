import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormFind from './../FormFind'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'
import TableCommon from './Table'

const columns = [
  {
    title: 'Số hiệu',
    dataIndex: 'soKyHieu',
    key: 'soKyHieu',
    render: text => <span>{text}</span>,
    width: '10%'
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
  }
]

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
    hasData: true
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
  addKeyToList = (listCV, listLinhVuc) => {
    if (listLinhVuc.length !== 0) {
      listCV.forEach((linhvuc, index) => {
        listCV[index]['key'] = listCV[index].id
        let date = listCV[index]['ngayBanHanh'].substring(0, 10)
        listCV[index]['ngayBanHanh'] = date
        listCV[index]['linhVuc'] = listLinhVuc.find(
          x => x.maLinhVuc === listCV[index].maLinhVuc
        ).tenLinhVuc
      })
    }
    return listCV
  }
  render() {
    let { listLoaiCongVan, listLinhVuc } = this.props
    let listCV = this.addKeyToList(this.props.listCV, listLinhVuc)

    return (
      <div>
        <FormFind listLoaiCongVan={listLoaiCongVan} />
        <TableCommon
          title="Danh sách công văn"
          columns={columns}
          data={listCV}
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
