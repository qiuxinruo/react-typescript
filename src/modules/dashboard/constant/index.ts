export const FILTER_TYPE = [
    {
        label: '基础筛选',
        value: 1
    },
    {
        label: '高级筛选',
        value: 2
    }
]

export const SECOND_INPUT = [
    'between',
]

export const FILTER_HIGHT_ITEM = [
    {
        label: '包含',
        value: 'containOperatorStrategy'
    },
    {
        label: '范围',
        value: 'betweenOperatorStrategy'
    }
]

export const OPERATOR= [
    {
        label: '+',
        value: '+'
    },
    {
        label: '-',
        value: '-'
    },
    {
        label: '*',
        value: '*'
    },
    {
        label: '/',
        value: '/'
    },
    {
        label: '(',
        value: '('
    },
    {
        label: ')',
        value: ')'
    },
]

export const INPUT_TEXT = {
    containOperatorStrategy: '包含',
    betweenOperatorStrategy: '范围'
}

export const companyInfo = {
    shineMoOW: 'https://www.shinemo.com/', // 讯盟官网
    cloudOW: 'https://www.jituancaiyun.com/', // 彩云官网
    client: 'https://www.jituancaiyun.com/', // 客户端地址
    clientName: '移动彩云', // 产品名称
    projectName: '可视化智能平台',
    footText:
        '@ jituancaiyun.com 浙ICP备13016135号 杭州讯盟科技有限公司 版权所有',
}

export const digitList = [
    {
        text:'%',
        value: '%'
    },
    {
        text:'保留小数点一位',
        value: '1'
    },
    {
        text:'保留小数点二位',
        value: '2'
    },
    {
        text:'保留小数点三位',
        value: '3'
    },
    {
        text:'无',
        value:''
    }
]

export const CREAT_TYPE=[
    {
        text:'我发布的',
        value: 1
    },
    {
        text:'所有人发布',
        value: 0
    }
]