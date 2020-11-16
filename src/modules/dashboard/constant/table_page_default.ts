
/*
* 同Table一同使用的pagination 后台通用配置，非通用配置则于各页面自行添加
*
* @pageSizeOptions 指定每页可以显示多少条；@showSizeChanger为true时展示，false时隐藏
* @showSizeChanger 是否可以改变
* @total           数据在服务端分页时使用
* @showTotal       总页数展示
*
* */

const PageDefault = {
    defaultPageSize: 10,
    showTotal: (total, range) => {
      return '共 ' + total + ' 条'
    },
    simple: false,
    pageSizeOptions: ['10', '20', '50', '100'],/*与showSizeChanger 搭配使用*/
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0
}

export default PageDefault