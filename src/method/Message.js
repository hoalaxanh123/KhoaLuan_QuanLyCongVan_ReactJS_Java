import Noty from 'noty'
import './../../node_modules/noty/lib/noty.css'
import './../../node_modules/noty/lib/noty.js'
import './../../node_modules/noty/lib/themes/relax.css' //ok

function Message(params, type, time = 1500) {
  if (type === 'error') time = 3000
  new Noty({
    text: params, //This string can contain HTML too. But be careful and don't pass user inputs to this parameter.
    type: type, //alert, success, error, warning, info
    timeout: time, //false, 1000, 3000, 3500, etc. Delay for closing event in milliseconds (ms). Set 'false' for sticky notifications
    theme: 'relax', //relax, mint, metroui - ClassName generator uses this value
    progressBar: true, //true, false - Displays a progress bar if timeout is not false.
    layout: 'topRight' //top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight - ClassName generator uses this value →
  }).show()
}

export default Message

//More info here: https://ned.im/noty/#/options
//This component made by 1510289
