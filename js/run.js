var prj = window.parent.prj;

var list = {
    'fio': {'name': 'ФИО', 'class': 'check'},
    'client': {'name': 'Клиент', 'list': {'Выберите': '', 'Физ.лицо': 'Физ.лицо', 'Юр.лицо': 'Юр.лицо'}, 'class': 'check'},
    'city': {'name': 'Город', 'list': {'Выберите': '', 'Екатеринбург': 'Екатеринбург', 'Челябинск': 'Челябинск'}, 'class': 'check'},
    'phone': {'name': 'Телефон', 'class': 'check'},
    'product': {'name': 'Товар', 'class': 'check', 'type': 'textarea'},
    'cnt': {'name': 'Количество', 'class': 'check'},
    'target': {'name': 'Для каких целей', 'class': 'check', 'type': 'textarea'},
    'stat_id': {'value': prj.record_id || 1}
};
var myForm = new Form('form', list, 'myForm', 'php/index.php', 'mail@mail.ru');
myForm.run();

$(document).on("click", ".warning", function () {
    $(this).removeClass('warning')
});



