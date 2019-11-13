import React, { Component } from 'react'
import { Card } from 'antd'
import { Table, Switch, Radio, Form } from 'antd'
import { connect } from 'react-redux'
import FormFind from './../FormFind'
import * as action from './../../actions/task'
import * as actionLoaiCongVan from './../../actions/loaicongvan'

const FormItem = Form.Item

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
    dataIndex: 'maLinhVuc',
    key: 'maLinhVuc',
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
    bordered: true,
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
  componentDidMount() {
    this.props.get_all_cong_van()
    this.props.get_all_loai_cong_van()
  }
  addKeyToList = listCV => {
    for (let index in listCV) {
      listCV[index]['key'] = listCV[index].id
      let date = new Date(listCV[index]['ngayBanHanh'])
      listCV[index]['ngayBanHanh'] = date.toLocaleDateString('vi-VN')
    }
    return listCV
  }
  render() {
    const { state } = this
    let listCV = this.addKeyToList(this.props.listCV)
    let { listLoaiCongVan } = this.props
    return (
      <div>
        <FormFind listLoaiCongVan={listLoaiCongVan} />
        <Card
          type="inner"
          title="Danh sách công văn"
          style={{ marginTop: '5px' }}
        >
          <Form layout="inline">
            <FormItem label="Bordered">
              <Switch
                checked={state.bordered}
                onChange={this.handleToggle('bordered')}
              />
            </FormItem>
            <FormItem label="Loading">
              <Switch
                checked={state.loading}
                onChange={this.handleToggle('loading')}
              />
            </FormItem>
            <FormItem label="Title">
              <Switch
                checked={!!state.title}
                onChange={this.handleTitleChange}
              />
            </FormItem>
            <FormItem label="Header">
              <Switch
                checked={!!state.showHeader}
                onChange={this.handleHeaderChange}
              />
            </FormItem>
            <FormItem label="Footer">
              <Switch
                checked={!!state.footer}
                onChange={this.handleFooterChange}
              />
            </FormItem>
            <FormItem label="Expandable">
              <Switch
                checked={state.expandedRowRender}
                onChange={this.handleExpandChange}
              />
            </FormItem>
            <FormItem label="Checkbox">
              <Switch
                checked={!!state.rowSelection}
                onChange={this.handleRowSelectionChange}
              />
            </FormItem>
            <FormItem label="Fixed Header">
              <Switch
                checked={!!state.scroll}
                onChange={this.handleScollChange}
              />
            </FormItem>
            <FormItem label="Has Data">
              <Switch
                checked={!!state.hasData}
                onChange={this.handleDataChange}
              />
            </FormItem>
            <FormItem label="Size">
              <Radio.Group
                size="default"
                value={state.size}
                onChange={this.handleSizeChange}
              >
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Pagination">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Form>
          <Table
            {...this.state}
            columns={columns}
            dataSource={state.hasData ? listCV : null}
          />
        </Card>
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
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listCV: state.task.listTask,
    listLoaiCongVan: state.loaiCongVan.byId
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCV)
