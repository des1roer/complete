function Form(idform, param, obj, url) {
    this.param = param;
    this.idform = idform;
    this.obj = obj;
    this.url = url;

    this.run = function () {
        var html = '<form id ="serForm"><table>';
        var row, td = '';
        for (var id in param) {
            var customClass = (typeof param[id].class != 'undefined') ? param[id].class : '';
            if (typeof param[id].list != 'undefined')
            {
                td = '<select name="' + id + '" id="' + id + '" class="' + customClass + '">';
                for (var val in param[id].list) {
                    td += '<option value="' + param[id].list[val] + '">' + val + '</option>';
                }
                td += '</select>';
            } else
            {
                td = '<input name="' + id + '" id="' + id + '" class="' + customClass + '"/>';
            }
            row = '<tr>\n\
                            <td>' + param[id].name + '</td>\n\
                            <td>' + td + '</td>\n\
                        <tr>'
            html += row;
        }
        html += '</table></form>';

        html += "<input id='send' onclick='" + obj + ".send()' type='button' value='Отправить'/>";
        $('#' + idform).html(html);
    };

    this.send = function () {

        var bad = 0;
        for (var id in param) {
            if ($('#' + id).hasClass('check') && $('#' + id).val().trim() == '')
            {
                bad++;
                $('#' + id).addClass('warning');
            } else
                $('#' + id).removeClass('warning');
        }
        if (bad > 0)
            return false;
        
        $('#send').attr('disabled', true);
        var form = $('#serForm').serializeArray();
        $.ajax({
            url: url,
            type: "POST",
            data: form,
            success: function (data) {
                console.log(data);
                $('#send').attr('disabled', false);
            }
        });
    };
}

