import Vue from 'vue'
import { MessageBox, Alert, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Alert);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;