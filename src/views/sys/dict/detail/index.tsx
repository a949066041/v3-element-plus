import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import { IDictDetail } from '@/types/model/entity/sys'
import useTable from '@/hooks/useTable'

export default defineComponent({
  name: 'DictDetail',
  setup () {
    const { state } = useTable<IDictDetail>({ api: '/api/dictDetail' }, false)
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
