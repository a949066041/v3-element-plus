import { defineComponent } from 'vue'
import DictMain from './main'
import DictDetail from './detail'

export default defineComponent({
  name: 'Dict',
  setup () {
    return () => {
      return (
        <el-row gutter={20}>
          <el-col span={12}>
            <DictMain />
          </el-col>
          <el-col span={12}>
            <DictDetail />
          </el-col>
        </el-row>
      )
    }
  }
})