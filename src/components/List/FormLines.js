import React, { Component } from 'react'
import { Modal, Form } from 'antd'
class FormLines extends Component {
  state = {
    visible: false,
    TitleForm: '',
    line: {},
    selectedObj: {},
    cacDongTimDuoc: []
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOkForm = e => {
    this.setState({
      visible: false
    })
  }

  handleCancelForm = e => {
    this.setState({
      line: [],
      visible: false
    })
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    if (this.props !== nextProp) {
      this.setState({
        lines: nextProp.lines,
        visible: nextProp.displayForm,
        selectedObj: nextProp.selectedObj,
        cacDongTimDuoc: nextProp.cacDongTimDuoc
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }
  resetForm = () => {
    this.setState({
      lines: []
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

  componentDidMount() {}
  getHighlightedText(text, higlight) {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'))
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === higlight.toLowerCase()
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            {part}
          </span>
        ))}{' '}
      </span>
    )
  }
  render() {
    let lines = {}
    let cacDongTimDuoc = this.state.cacDongTimDuoc
      ? this.state.cacDongTimDuoc
      : []
    let result = []
    try {
      lines = JSON.parse(this.props.lines)
      for (let key in lines) {
        result.push({ key: key, content: lines[key] })
      }
    } catch (error) {}
    let trs = result.map((element, index) => {
      if (cacDongTimDuoc.includes(parseInt(element.key))) {
        element.content = this.getHighlightedText(element.content, 'an')
        return (
          <tr key={index}>
            <td className="found" style={{ background: 'red' }}>
              {' '}
              {element.key}{' '}
            </td>
            <td className="found" style={{ background: 'red' }}>
              {' '}
              {element.content}{' '}
            </td>
          </tr>
        )
      }
      return (
        <tr key={index}>
          <td>{element.key}</td>
          <td>{element.content}</td>
        </tr>
      )
    })
    return (
      <div id="inputText">
        <Modal
          width={1200}
          title={this.state.TitleForm}
          visible={this.state.visible}
          onOk={this.handleOkForm}
          onCancel={this.handleCancelForm}
          footer={[]}
        >
          <table className="tableChiTietCongVan">
            <thead>
              <tr>
                <th>STT</th>
                <th>Nội dung</th>
              </tr>
            </thead>
            <tbody>{trs}</tbody>
          </table>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(FormLines)
