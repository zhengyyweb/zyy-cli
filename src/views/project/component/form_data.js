export const addProject = {
  formLabelWidth: '120px',
  itemList: [
    {
      label: '项目ID：',
      prop: 'projectID',
      type: 'input',
      placeholder: '请输入项目ID'
    },
    {
      label: '项目简称：',
      prop: 'projectName',
      type: 'input',
      placeholder: '请输入项目简称：'
    },
    {
      label: '方案编号：',
      prop: 'projectNumber',
      type: 'input',
      placeholder: '请输入方案编号'
    },
    {
      label: '申办方：',
      prop: 'projectSB',
      type: 'input',
      placeholder: '请输入申办方'
    },
    {
      label: '委托方：',
      prop: 'projectWT',
      type: 'input',
      placeholder: '请输入委托方'
    },
    {
      label: '项目全称：',
      prop: 'projectFullName',
      type: 'input',
      placeholder: '请输入项目全称'
    },
    {
      label: '启用功能：',
      prop: 'projectStart',
      type: 'checkBox',
      list: [
        {
          name: '1',
          label: 'EDC'
        },
        {
          name: '2',
          label: 'ePRO'
        },
        {
          name: '3',
          label: 'IWRS'
        }
      ]
    }
  ],
  model: {
    projectID: '',
    projectName: '',
    projectNumber: '',
    projectSB: '',
    projectWT: '',
    projectFullName: '',
    projectStart: []
  }
}
