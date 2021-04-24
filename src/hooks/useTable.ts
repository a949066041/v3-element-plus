import { get, IPageResponse } from '@/api'
import { IItemConfig } from '@/types/components'
import { IUseTableOption, IUseTable, IUseTableState, IUseTableSearchState, IUseTableModalState, IUseTableModal } from '@/types/hooks'
import { reactive, onMounted, watch } from 'vue'
import { useExpose } from './useExpose'

const useTable = function<T> (options: IUseTableOption, firstLoad = true): IUseTable<T> {
  const search: IUseTableSearchState = reactive({
    searchForm: {},
    initForm: {}
  })
  const state: IUseTableState<T> = reactive({
    total: 0,
    dataSource: [],
    loading: false,
    page: 1,
    size: 10,
    pagination: true
  })

  const toggleLoading = (val: boolean) => { state.loading = val }

  const getTable = () => {
    toggleLoading(true)
    const params = {
      ...search.searchForm,
      ...search.initForm,
      page: state.page - 1,
      size: state.size
    }
    get(options.api, params).then((res: IPageResponse<T>) => {
      state.total = res.totalElements
      state.dataSource = res.content
    }).finally(() => { toggleLoading(false) })
  }

  const searchTable = () => {
    if (state.page !== 1) {
      state.page = 1
      return
    }
    getTable()
  }

  const resetSearch = () => {
    search.searchForm = {}
    searchTable()
  }

  watch([() => state.page, () => state.size], getTable)

  onMounted(() => { firstLoad && getTable() })

  useExpose({
    searchTable
  })

  return {
    search,
    state,
    getTable,
    resetSearch,
    searchTable
  }
}

const useTableModal = function (): IUseTableModal {
  const state: IUseTableModalState = reactive({
    formId: 0,
    visible: false
  })

  const toggleVisible = (val: boolean) => { state.visible = val }

  const openDialog = (formId: number | string = '') => {
    state.formId = formId
    toggleVisible(true)
  }

  return {
    state,
    openDialog
  }
}

// 匹配值
const MAP_WIDTH: { [key: string]: number } = {
  username: 200
}

const FORMAT_TIME = { formatTime: true }
const TOOL_TIP = { 'show-overflow-tooltip': true }

const createColumn = function (dataIndex = '',
  label = '',
  config?: { [key: string]: any } | number | boolean,
  width?: number | boolean | null): IItemConfig {
  // eslint-disable-next-line prefer-rest-params
  const arg = Array.from(arguments)
  const slots = arg[arg.length - 1]
  if (typeof config === 'number') {
    width = config
    config = {}
  }

  if (typeof config === 'boolean' || typeof width === 'boolean') {
    width = undefined
    config = {}
  }

  width = MAP_WIDTH[dataIndex] || width || null

  return {
    dataIndex,
    label,
    config: { ...config as any, width },
    slots: (typeof slots === 'boolean' && slots) as boolean
  }
}

export {
  useTableModal,
  createColumn,
  FORMAT_TIME,
  TOOL_TIP
}

export default useTable
