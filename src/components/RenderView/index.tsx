import { defineComponent, PropType, reactive } from 'vue'
import useTable from '@/hooks/useTable'
import MsTable from '@/components/Table'
import FormItem from './components/FormItem'
import MsDialog from '@/components/Dialog'

export default defineComponent({
  name: 'RenderView',
  props: {
    search: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    table: {
      type: Array as PropType<any[]>,
      default: () => ([])
    },
    modals: {
      type: Array as PropType<any[]>,
      default: () => ([])
    }
  },
  setup (props) {
    const dialog: any = {}
    const formInfo: any = {}
    props.modals.forEach((item) => {
      dialog[item.value] = false
      formInfo[item.value] = {}
    })
    const dialogs = reactive({
      dialog: dialog as any,
      formInfo: formInfo as any
    })
    const { state, searchTable, search: searchState, resetSearch } = useTable<any>({ api: '/api/roles' })
    const search: any = props.search
    return () => {
      const modals = props.modals.map((item, index) => (
        <MsDialog
          visible={(dialogs.dialog as any)[item.value]}
          onClose={() => { (dialogs.dialog as any)[item.value] = false }}
          onOk={() => { (dialogs.dialog as any)[item.value] = false }}
        >
          <el-form ref="form" model={dialogs.formInfo[item.value]} label-width="80px">
            <el-form-item label={`test${index}`}>
              <el-input v-model={[dialogs.formInfo[item.value].a]} />
            </el-form-item>
          </el-form>
        </MsDialog>
      ))

      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={props.table}
        >
          {{
            search: () => (
              <el-form model={searchState.searchForm}>
                <el-row gutter={search.gutter}>
                  {
                    (search.items as []).map((item: any) => (
                      <el-col span={item.span || search.baseSpan}>
                        <FormItem
                          conf={item}
                          value={searchState.searchForm[item.key]}
                          onInput={(e: any) => { searchState.searchForm[item.key] = e }}
                        />
                      </el-col>
                    ))
                  }
                  {
                    <el-col span={8}>
                      {
                        search.btns.map((item: any) => (
                          <el-button
                            type={item.theme}
                            disabled={state.loading}
                            onClick={item.type === 'search' ? searchTable : resetSearch}
                          >
                            { item.text }
                          </el-button>
                        ))
                      }
                    </el-col>
                  }
                  <el-button onClick={() => { dialogs.dialog.modal1 = true }}>open</el-button>
                  <el-button onClick={() => { dialogs.dialog.modal2 = true }}>open</el-button>
                  <el-button onClick={() => { dialogs.dialog.modal3 = true }}>open</el-button>
                </el-row>
              </el-form>
            ),
            default: () => modals
          }}
        </MsTable>
      )
    }
  }
})
