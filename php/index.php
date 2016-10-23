<?php
include_once 'classSave.php';

class SendClass extends SaveClass {
    public function Save($param) {
        $param = array_filter($param);
        return $this->Send($param);
        // var_dump($this->log);
    }
}

$param = $_POST;

$save = new SendClass();
$save->setLog(TRUE);
$return = $save->Save($param);
echo json_encode($return);