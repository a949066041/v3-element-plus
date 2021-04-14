import { IItemConfig } from '@/types/components'
import { computed, defineComponent, PropType } from 'vue'
import ItemCell from './ItemCell'
const TABLE_ALIGN = ['left', 'center', 'right']

export default defineComponent({
  name: 'MsTable',
  props: {
    pagination: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    columns: {
      type: Array as PropType<Array<IItemConfig>>,
      default: () => []
    },
    dataSource: {
      type: Array as PropType<Array<any>>,
      default: () => []
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    align: {
      type: Number as PropType<number>,
      default: 0
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    total: {
      type: Number as PropType<number>,
      default: 0
    },
    checkbox: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    checkboxDisabledFn: {
      type: Function as PropType<Function>,
      default: () => true
    },
    size: {
      type: Number as PropType<number>,
      default: 15
    },
    page: {
      type: Number as PropType<number>,
      default: 0
    },
    checkboxConf: {
      type: Object as PropType<object>,
      default: () => ({})
    },
    onRowClick: {
      type: Function as PropType<Function>,
      default: () => ({})
    }
  },
  emits: ['update:size', 'update:page', 'row-click'],
  setup (props, { slots, attrs, emit }) {
    const tableAlign = computed(() => TABLE_ALIGN[props.align])
    return () => {
      // 搜索区域
      const searchRender = () => (
        slots.search && (
          <div class="search">
            { slots.search() }
          </div>
        )
      )
      const renderTable = () => {
        // 表格显示区域
        const columnsRender = () => props.columns.map((item: any) => (
          <ItemCell
            key={item.dataIndex}
            context={item}
            slots={slots[item.dataIndex as string]}
            align={tableAlign.value}
          />
        ))

        // 分页区域
        const paginationRender = () => (
          props.pagination && (<el-pagination
            page-sizes={[10, 15, 30, 50, 100]}
            layout="total, prev, pager, next, sizes"
            total={props.total}
            page-size={props.size}
            onSizeChange={(val: number) => emit('update:size', val)}
            onCurrentChange={(val: number) => emit('update:page', val)}
          />)
        )

        return (
          <>
            <el-table
              v-loading={props.loading}
              { ...attrs }
              onRowClick={(e: any) => emit('row-click', e)}
              ref="wxTable"
              data={props.dataSource}
              highlight-current-row
              small
              style="width: 100%"
              header-row-style={{ height: '60px' }}
            >
              { columnsRender() }
            </el-table>
            { paginationRender() }
          </>
        )
      }
      return (
        <div class="ms__table">
          { searchRender() }
          { renderTable() }
          { slots.default?.() }
        </div>
      )
    }
  }
})
