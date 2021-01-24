import { defineComponent, ref } from 'vue'
import UserDepart from './Depart'
import SysUserTable from './Table'

export default defineComponent({
  name: 'SysUser',
  components: { UserDepart },
  setup () {
    const deptId = ref<number>(0)
    return () => {
      return (
        <el-row gutter={20}>
          <el-col span={4}>
            <user-depart onChangeDept={(val: number) => { deptId.value = val }} />
          </el-col>
          <el-col span={20}>
            <SysUserTable deptId={deptId.value} />
          </el-col>
        </el-row>
      )
    }
  }
})
