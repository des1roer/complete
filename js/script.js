function Form(idform, param, obj, url, to) {
  this.param = param;
  this.idform = idform;
  this.obj = obj;
  this.url = url;
  this.form = param;
  this.to = to;
  
  this.run = function () {
    //отображение таблицы  
    var html = '<form id ="serForm"><table>';
    var row, td = '';
    for (var id in param) {
      var customClass = (typeof param[id].class != 'undefined') ? param[id].class : '';

      if (typeof param[id].type != 'undefined' && param[id].type == 'textarea')
      {
        td = '<textarea rows="4" name="' + id + '" id="' + id + '" class="' + customClass + '"></textarea>';
      } else if (typeof param[id].list != 'undefined')
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
      {
        this.form[id].value = $('#' + id).val() || this.form[id].value;
        $('#' + id).removeClass('warning');
      }
    }
    if (bad > 0)
      return false;

    var post_fields = {
      act: 'send_mail',
      body: '',
      fields: this.form,
      datetime: window.parent.prj.db.preinsert.start_time,
      number: window.parent.prj.db.result.incoming_number,
      operator: window.parent.prj.db.result.operator_name,
      operator_num: window.parent.prj.db.result.operator_number,
      subject: 'Заявка',
      to: to 
    };

    $('#send').attr('disabled', true);
    $.ajax({
      url: url,
      type: "POST",
      data: post_fields,
      success: function (data) {
        $('#send').attr('disabled', false);
        window.parent.dialog("Успех!", "Отправлено!").show().hideAfterSec(2);
      }
    });
  };
}

