export const optionData = {
  rightMenu: [
    { name: '数据管理' },
    { name: '统计报表' },
    { name: '中心管理' },
    { name: '受试者列表' },
    { name: '质疑管理' },
    { name: '稽查痕迹' },
    { name: '数据导出' }
  ],
  // 入组进度
  group: {
    shadow: {
      '神州一院': 'rgba(29,126,252,0.50)',
      '神州五院': 'rgba(170,246,245,0.50)'
    },
    item: ['筛选', '筛选失败', '入组', '随访中', '脱落', '完成'],
    data: [
      {
        name: '神州一院',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: '#3E67EA'
        },
        type: 'bar'

      },
       {
        name: '神州五院',
        data: [120, 200, 150, 80, 70, 110],
        itemStyle: {
          color: '#AAF6F5'
        },
        type: 'bar'
      }
    ]
  },
    // 质疑统计
    query: {
      shadow: {
        '神州一院': 'rgba(29,126,252,0.50)',
        '神州五院': 'rgba(170,246,245,0.50)'
      },
      item: ['打开-待回答', '已回答-待审阅', '完成'],
      data: [
        {
          name: '神州一院',
          data: [120, 200, 150],
          itemStyle: {
            color: '#3E67EA'
          },
          type: 'bar'
        },
         {
          name: '神州五院',
          data: [120, 200, 150],
          itemStyle: {
            color: '#AAF6F5'
          },
          type: 'bar'
        }
      ]
    },
   // y研究中心
  study_center: {
    item: {
      '筛选': '#1D7EFC',
      '筛选失败': '#AAF6F5',
      '入组': '#FF9FCB',
      '随访中': '#FFD693',
      '脱落': '#D7A4FF',
      '完成': '#AFF3A9'
    },
    item1: {
      '打开-待回答': '#1D7EFC',
      '已回答-待审阅': '#FF93D5',
      '完成': '#AAF6F5'
    },
    // 阴影颜色
    shadow: {
      '筛选': 'rgba(29,126,252,0.5)',
      '筛选失败': 'rgba(118,239,223,0.5)',
      '入组': 'rgba(255,159,203,0.5)',
      '随访中': 'rgba(255,214,147,0.5)',
      '脱落': 'rgba(215,164, 255,0.5)',
      '完成': 'rgba(118,239,223,0.50)'
    },
    shadow1: {
      '打开-待回答': 'rgba(29,126,252,0.50)',
      '已回答-待审阅': 'rgba(255,147,213,0.50)',
      '完成': 'rgba(118,239,223,0.50)'
    }
  },
   // 柱状图共用
   barEcharts(legend, xAxis, data) {
    const legendData = Object.keys(legend).map((v) => {
     return {
       name: v,
       icon: 'circle',
       itemStyle: {
         shadowColor: legend[v],
         shadowBlur: 10
       }
     }
    })
    return {
      legend: {
        show: true,
        itemGap: 60,
        itemWidth: 20,
        itemHeight: 20,
        data: legendData,
        left: '30'
      },
        tooltip: {
        trigger: 'axis'
      },
        xAxis: {
          type: 'category',
          axisTick: false,
          data: xAxis
        //  axisLabel: {
        //     interval: 0,
        //     rotate: 40
        //   }
        },
        yAxis: {
          type: 'value'
        },
        series: data
    }
  },
  // 共用饼图
  pieEcharts(legend, data, name) {
      const legendData = Object.keys(legend).map((v) => {
       return {
         name: v,
         icon: 'circle',
         itemStyle: {
           shadowColor: legend[v],
           shadowBlur: 10
         }
       }
     })
     const Data = Object.keys(data).map(v => {
       return {
         name: v,
         value: 200,
         itemStyle: {
           color: data[v]
         }
       }
     })
     return {
       tooltip: {
         trigger: 'item'
       },
       legend: {
         bottom: 10,
         show: true,
         itemGap: 30,
         itemWidth: 20,
         itemHeight: 20,
         data: legendData,
         left: 'center'
       },
       series: [
         {
           name: name,
           type: 'pie',
           stillShowZeroSum: false,
           center: ['50%', '50%'],
           minShowLabelAngle: 0.01, // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。
           radius: '70%',
           label: {
              fontSize: '12',
              position: 'inside'// 标签的位置。
           },
           data: Data
         }
       ]
     }
   }
}