//生成随机戳
export function createTimestamp() {
    return parseInt(new Date().getTime()) + '';
}

//时间戳转换为时间
export function rTime(date) {
    var json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

export function bjDate(date1,date2){
    let d1 = date1.split('-').join('');
    let d2 = date2.split('-').join('');
    if(d1&&d2&&d2===d1){
        return date1+"#"+date2;
    }else if(d1&&d2&&!(d2>d1)){
        return '500';
    }else{
     if(date1&&date2){
        return date1+"#"+date2;
     }else if(date1 && !date2){
        return date1+"#";
     }else{
        return "#"+ date2;
      }
    }
}