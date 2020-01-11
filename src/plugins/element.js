import Vue from 'vue'
import {
  Button,
  Input,
  Card,
  Form,
  FormItem,
  Message,
  MessageBox,
  Header,
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Switch,
  Select,
  Option
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
