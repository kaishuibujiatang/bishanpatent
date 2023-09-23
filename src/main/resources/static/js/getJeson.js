$.ajax({
    url: url,
    type: "POST",
    data: parameters,
    dataType:"json",
    async: false,
    success: function(result){
        var newData = JSON.stringify(result);    //将json对象转换为字符串
        newData = eval("("+newData+")");   //解析json

        var annualDays = newData.annualDays;
        var entryDate = newData.entryDate;

        $("input[name='extendDataFormInfo.value(fd_shengyu_nianjia)']").val(annualDays);
        $("input[name='extendDataFormInfo.value(fd_ruzhi_date)']").val(entryDate);

    }});