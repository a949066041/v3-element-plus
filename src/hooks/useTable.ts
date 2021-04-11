import { get, IPageResponse } from '@/api'
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

export {
  useTableModal
}

export default useTable
