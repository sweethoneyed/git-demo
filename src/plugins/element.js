import Vue from 'vue'
import {
  Button,
  Input,
  Card,
  Form,
  FormItem,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
