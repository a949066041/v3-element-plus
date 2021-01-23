import { defineComponent, onMounted, reactive } from 'vue'
import MsTable from '@/components/Table'
import { get } from '@/api'

export default defineComponent({
  name: 'DictDetail',
  setup () {
    const state = reactive({
      total: 0,
      dataSource: []
    })
    onMounted(() => {
      get('/api/dictDetail').then((res) => {
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
            { dataIndex: 'label', label: '字典标签', slots: true },
            { dataIndex: 'value', label: '字典值', config: { 'show-overflow-tooltip': true } },
            { dataIndex: 'dictSort', label: '排序', config: { 'show-overflow-tooltip': true } },
            { dataIndex: 'createTime', label: '创建时间', time: true }
          ]}
        >
          {{
            label: ({ row }: { row: any }) => (<div>{ row.value }</div>)
          }}
        </MsTable>
      )
    }
  }
})
