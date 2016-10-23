<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class SaveClass {
    private $log = false;

    private function Log($txt, $method) {
        var_dump($txt);
        file_put_contents(__DIR__ . '/logs/' . date('Y-m-d') . '_log.log', "[$method][".date('H:i:s')."]" . PHP_EOL . $txt . PHP_EOL, FILE_APPEND);
    }

    public function setLog($log) {
        $this->log = $log;
    }

    public function Save($param) {
        $param = array_filter($param);
      //  $this->Send($param);
         var_dump($this->log);
    }

    public function Send($param) {
        //$param = array_filter($param);
        //var_dump($param);
        if ($this->log)
            $this->Log(json_encode($param), __FUNCTION__);
    }

}
