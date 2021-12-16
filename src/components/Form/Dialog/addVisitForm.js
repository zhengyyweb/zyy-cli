export const visitForm = {
  formLabelWidth: '100px',
  itemList: [
    {
      label: '访视阶段：',
      prop: 'visitStep',
      type: 'input',
      placeholder: '请输入访视阶段'
    },
    {
      label: '访视编号：',
      prop: 'visitNo',
      type: 'input',
      placeholder: '请输入访视编号',
      tips: '仅允许字母、数字、下划线，字母开头，最大长度8'
    },
    {
      label: '访视名称：',
      prop: 'visitName',
      type: 'input',
      placeholder: '请输入访视名称'
    },
    {
      label: '访视类型：',
      prop: 'visitType',
      type: 'select',
      placeholder: '请选择访视类型',
      list: [
        {
          value: '1',
          label: '计划访视'
        },
        {
          value: '2',
          label: '非计划访视'
        }
      ]
    },
    {
      label: '可否重复：',
      prop: 'isRepeat',
      type: 'radio',
      list: [
        {
          name: '1',
          label: '是'
        },
        {
          name: '2',
          label: '否'
        }
      ]
    },
    {
      label: '访视说明：',
      prop: 'visitIntrouce',
      type: 'textArea',
      placeholder: '请输入访视说明'
    }
  ],
  model: {
    visitStep: '',
    visitNo: '',
    visitName: '',
    visitType: '',
    isRepeat: '',
    visitIntrouce: ''
  }
}