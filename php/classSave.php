<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class Save {

// данные (свойства):
    var $param;

// методы:
    function Save() {
        var_dump($_POST);
    }

}
