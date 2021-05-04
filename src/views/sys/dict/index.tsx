import { defineComponent, ref } from 'vue'
import DictMain from './main'
import DictDetail from './detail'
import { IDict } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'Dict',
  setup () {
    const dict = ref<object>({})

    return () => {
      return (
        <el-row gutter={20}>
          <el-col span={12}>
            <DictMain onChoose={ (val: IDict) => { dict.value = val } } />
          </el-col>
          <el-col span={12}>
            <DictDetail v-model={[dict.value, 'dict']} />
          </el-col>
        </el-row>
      )
    }
  }
})
