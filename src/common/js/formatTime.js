//date： 日期字符串yyyy-MM-dd，如：2016-02-14
//years：年份，正整数字符串
//返回日期字符串yyyy-MM-dd，如：2016-02-14
var myfunction={
  TimeChange:function formatDate(datetime) {
  // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
    var year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2),
    hour = ("0" + datetime.getHours()).slice(-2),
    minute = ("0" + datetime.getMinutes()).slice(-2),
    second = ("0" + datetime.getSeconds()).slice(-2);
  // 拼接
  var result = year + "-"+ month +"-"+ date +"   "+ hour +":"+ minute +":" + second;
  // 返回
  return result;
}

}

export default myfunction;
