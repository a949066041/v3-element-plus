import { defineComponent, onMounted, reactive } from 'vue'
import MsTable from '@/components/Table'
import { get } from '@/api'

export default defineComponent({
  name: 'DictMain',
  setup () {
    const state = reactive({
      total: 0,
      dataSource: []
    })
    onMounted(() => {
      get('/api/dict').then((res) => {
        state.total = res.totalElements
        state.dataSource = res.content
      })
    })
    return () => {
      return (
        <MsTable
          total={state.total}
          dataSource={state.dataSource}
          columns={[
            { dataIndex: 'name', label: '名称' },
            { dataIndex: 'description', label: '描述' },
            { dataIndex: 'createTime', label: '创建时间', time: true }
          ]}
        />
      )
    }
  }
})
