import { defineComponent, PropType, reactive, h } from 'vue'
import useTable from '@/hooks/useTable'
import MsTable from '@/components/Table'
import RenderForm from './components/RenderForm'
import MsDialog from '@/components/Dialog'
import MsDrawer from '@/components/Drawer'
import MsFull from '@/components/Full'

const MODAL: { [key: string]: any } = {
  dialog: MsDialog,
  drawer: MsDrawer,
  full: MsFull
}

export default defineComponent({
  name: 'RenderView',
  props: {
    api: {
      type: String,
      default: ''
    },
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
    const { state, searchTable, search: searchState, resetSearch } = useTable<any>({ api: props.api })
    const search: any = props.search
    return () => {
      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={props.table}
        >
          {{
            search: () => (
              <RenderForm
                v-model={[searchState.searchForm, 'model']}
                config={props.search}
              >
                <>
                  <el-col span={8}>
                    {
                      search.btns.map((item: any) => (
                        <el-button
                          type={item.theme}
                          disabled={state.loading}
                          onClick={() => {
                            if (['search', 'reset'].includes(item.type)) {
                              console.log(searchState.searchForm)
                              item.type === 'search' ? searchTable() : resetSearch()
                              return
                            }
                            dialogs.dialog[item.trigger] = true
                            console.log(dialogs.dialog)
                          }}
                        >
                          { item.text }
                        </el-button>
                      ))
                    }
                  </el-col>
                </>
              </RenderForm>
            ),
            default: () => props.modals.map((item, index) => (
              h(MODAL[item.type], {
                visible: (dialogs.dialog as any)[item.value],
                onClose: () => { (dialogs.dialog as any)[item.value] = false },
                onOk: () => { (dialogs.dialog as any)[item.value] = false },
                key: index
              }, {
                default: () => (<RenderForm
                  model={dialogs.formInfo[item.value]}
                  config={item}
                />)
              }
              )
            ))
          }}
        </MsTable>
      )
    }
  }
})
