var prj = window.parent.prj;

var list = {
    'oblast': {'name': 'область', 'class': 'form-control complete'},
    'city': {'name': 'город', 'class': 'form-control complete'},
    'street': {'name': 'улица', 'class': 'form-control complete'},

 
};
var myForm = new Form('form', list, 'myForm', 'php/index.php', 'mail@mail.ru');
myForm.run();

  
