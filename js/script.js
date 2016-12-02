function Form(idform, param, obj, url, to) {
    this.param = param;
    this.idform = idform;
    this.obj = obj;
    this.url = url;
    this.form = param;
    this.to = to;

    this.run = function () {
        //отображение таблицы  
        var html = '<form id ="serForm"><table class="table">';
        var row, td = '';
        for (var id in param) {
            var customClass = (typeof param[id].class != 'undefined') ? param[id].class : '';

            td = '<input name="' + id + '" id="' + id + '" class="' + customClass + '"/>';

            if (typeof param[id].name != 'undefined')
            {
                row = '<tr>\n\
                            <td>' + param[id].name + '</td>\n\
                            <td>' + td + '</td>\n\
                        <tr>'
                html += row;
            }
        }
        html += '</table></form>';

        $('#' + idform).html(html);

        load();

        $(".complete").blur(function () {
            recalc(this.id, this.value);
        });
    };

    function load()
    {
        $.ajax({
            url: url,
            data: param,
            type: "POST",
            success: function (data) {
                data = JSON.parse(data);
                for (var id in param) {
                    $('#' + id).autocomplete({
                        source: data[id],
                        autoFill: true,                   
                        //  minLength: 3 // начинать поиск с трех символов
                    });

                }
            }
        });
    }

    function recalc(tid, val)
    {
        var post = {'act':'recalc'};
        post[tid] = val;
        
        for (var id in param) {
            if (id != tid && $('#' + id).val().trim() != '')
                post[id] = $('#' + id).val();
        }
        console.log('e', post, val)
        
         $.ajax({
            url: url,
            data: post,
            type: "POST",
            success: function (data) {
                data = JSON.parse(data);
                for (var id in param) {
                    $('#' + id).autocomplete({
                        source: data[id],
                        autoFill: true,                   
                        //  minLength: 3 // начинать поиск с трех символов
                    });
                }
            }
        });
    }
}

