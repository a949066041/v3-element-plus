import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import {
  PieChart,
  PieSeriesOption,
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import {
  LegendComponent,
  ToolboxComponent,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components'
import {
  CanvasRenderer
} from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | TitleComponentOption | GridComponentOption | BarSeriesOption | PieSeriesOption
>

// 注册必须的组件
echarts.use(
  [TitleComponent, GridComponent, LineChart, BarChart, PieChart, LegendComponent, ToolboxComponent, CanvasRenderer]
)

export default defineComponent({
  name: 'MsChart',
  setup () {
    const chartS = ref<any>(null)
    const chartsRef = ref<any>(null)
    const resizeChart = () => {
      chartS.value && chartS.value.resize()
    }
    onMounted(() => {
      const charts = chartS.value = echarts.init(chartsRef.value)
      charts.setOption({
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' }
            ]
          }
        ]
      } as ECOption)

      window.addEventListener('resize', resizeChart)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart)
    })
    return () => {
      return (
        <div class="charts" style="height: 500px; width: 100%;" ref={chartsRef} />
      )
    }
  }
})
