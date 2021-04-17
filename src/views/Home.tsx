import MsChart from '@/components/Chart'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    return () => {
      return (
        <>
          <el-row gutter={20}>
            <el-col span={12}>
              <el-card>
                <MsChart />
              </el-card>
            </el-col>
            <el-col span={12}>
              <el-card>
                <MsChart />
              </el-card>
            </el-col>
          </el-row>
        </>
      )
    }
  }
})
