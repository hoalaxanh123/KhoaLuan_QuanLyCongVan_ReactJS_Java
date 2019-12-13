import { createMuiTheme } from '@material-ui/core/styles'

const themes = createMuiTheme({
  MAIN: {
    background: 'red',
    color: 'yellow'
  },
  shape: {
    color: 'white',
    display: 'block',
    padding: '20px',
    margin: '5px',
    borderRadius: '6px',
    background: 'red',
    border: '1px solid red',
    hover: { color: 'red', background: 'yellow' }
  }
})

export default themes
