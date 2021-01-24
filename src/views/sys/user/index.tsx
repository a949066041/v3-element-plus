import { defineComponent } from 'vue'
import UserDepart from './Depart'
import SysUserTable from './Table'

export default defineComponent({
  name: 'SysUser',
  setup () {
    return () => {
      return (
        <el-row gutter={20}>
          <el-col span={4}>
            <UserDepart />
          </el-col>
          <el-col span={20}>
            <SysUserTable />
          </el-col>
        </el-row>
      )
    }
  }
})
