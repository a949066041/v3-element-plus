import { get } from '@/api'
import { IUseTableOption, IUseTable, IUseTableState } from '@/types/hooks'
import { reactive, onMounted, watch } from 'vue'

const useTable = function<T> (options: IUseTableOption): IUseTable<T> {
  const state: IUseTableState<T> = reactive({
    total: 0,
    dataSource: [],
    loading: false,
    page: 1,
    size: 10,
    pagination: true,
    searchForm: {}
  })

  const toggleLoading = (val: boolean) => { state.loading = val }

  const getTable = () => {
    toggleLoading(true)
    get(options.api, { ...state.searchForm, page: state.page - 1, size: state.size }).then((res) => {
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
    state.searchForm = {}
    searchTable()
  }

  watch([() => state.page, () => state.size], getTable)

  onMounted(() => { options.firstLoad && getTable() })

  return {
    state,
    getTable,
    resetSearch,
    searchTable
  }
}

export default useTable
