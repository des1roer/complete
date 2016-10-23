<?php
include_once 'classSave.php';

class SendClass extends SaveClass
{
    public function Save($param) {
        $param = array_filter($param);
        $this->Send($param);
        // var_dump($this->log);
    }
}

$param = $_POST;
$param['log'] = true;

$save = new SendClass();
$save->setLog(TRUE);
$save->Save($param);

//$save->Send($param);