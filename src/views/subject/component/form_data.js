export const invite = {
  formLabelWidth: '120px',
  itemList: [
    {
      label: '选择角色：',
      prop: 'role',
      type: 'select',
      placeholder: '请选择角色',
      list: [
        {
          value: '1',
          label: 'EDC'
        },
        {
          value: '2',
          label: 'ePRO'
        },
        {
          value: '3',
          label: 'IWRS'
        }
      ]
    },
    {
      label: '数据范围：',
      prop: 'dataF',
      type: 'input',
      disabled: true,
      placeholder: ''
    },
    {
      label: '选择中心：',
      prop: 'center',
      type: 'select',
      placeholder: '请选择中心',
      list: [
        {
          value: '1',
          label: 'EDC'
        },
        {
          value: '2',
          label: 'ePRO'
        },
        {
          value: '3',
          label: 'IWRS'
        }
      ]
    }
  ],
  addCenterList: [
    {
      label: '中心编号：',
      prop: 'centerNum',
      type: 'input',
      placeholder: '请输入中心编号'
    },
    {
      label: '中心名称：',
      prop: 'centerName',
      type: 'input',
      placeholder: '请输入中心名称'
    },
    {
      label: '计划例数：',
      prop: 'centerSum',
      type: 'input',
      placeholder: '请输入计划例数'
    },
    {
      label: '是否启用：',
      prop: 'status',
      type: 'radio',
      list: [
        {
          name: '是',
          label: '1'
        },
        {
          name: '否',
          label: '0'
        }
      ]
    }
  ],
  model: {
  },
  addCenterModel: {}
}
