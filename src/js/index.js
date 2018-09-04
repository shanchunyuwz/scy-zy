$(function() {
    $.ajax({
        url: "/api/find",
        dataType: "json",
        success: function(res) {
            var str = "";
            if (res.code == 1) {
                res.data.forEach(function(file) {
                    str += `<dl>
                    <dt><img src="${file.img}" alt=""></dt>
                    <dd>
                        <h1><span>${file.title}</span><b>${file.content}</b></h1>
                        <h2><span>${file.money}</span><b>${file.value}</b></h2>
                        <p><span></span><b>${file.time}</b></p>
                    </dd>
                </dl>`
                })
                $(".section_two").append(str);
            }

        }
    })
})