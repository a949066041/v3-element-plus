import { get, IPageResponse } from '@/api'
import { IUseTableOption, IUseTable, IUseTableState, IUseTableSearchState } from '@/types/hooks'
import { reactive, onMounted, watch } from 'vue'

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

  return {
    search,
    state,
    getTable,
    resetSearch,
    searchTable
  }
}

export default useTable
