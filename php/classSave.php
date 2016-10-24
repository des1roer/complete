<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

class SaveClass
{
  private $log = false;
  public $dbh, $prj  = null;

  private function Log($txt, $method)
  {
    $txt = print_r($txt, true);
    file_put_contents(__DIR__.'/logs/'.date('Y-m-d').'_log.log', "[$method][".date('H:i:s')."]".PHP_EOL.$txt.PHP_EOL,
        FILE_APPEND);
  }

  public function setLog($log)
  {
    $this->log = $log;
  }

  public function __construct(&$dbh, $prj)
  {
    $this->dbh = $dbh;
    $this->prj = $prj;
  }

  public function Save($param)
  {
    $fieds = $param["fields"];
    unset($param['act'], $param["fields"]);
    $send  = '';
    $array = array();

    foreach ($fieds as $key => $value) {
      $array[$key] = $value['value'];
      if (!empty($value['name'])) $send .= $value['name']." : ".$value['value'].'<br/>';
    }
    $array         = array_filter($array);
    $id            = $this->dbh->query('insert into form (?#) values (?a)', array_keys($array), array_values($array));
    $send .= 'Номер : '.$id;
    $param['body'] = $send;

    return $this->Send($param, $id);
  }

  public function Send($param, $id)
  {
    $curl   = curl_init('http://projects.city-call.ru/libs/card_modules/mail/php/mail.php?action=send&db=log_prj&table=emails');
    curl_setopt($curl, CURLOPT_POST, TRUE);
    $data   = $param + array('mailer' => 'smtp', 'server' => 'smtp.city-call.ru', 'pid' => $this->prj, 'type' => 'html',
        'from_name' => 'operator');
    $data   = http_build_query($data);
    curl_setopt($curl, 9, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    $json   = json_decode($result, true);

    if ($json["code"] == 0) {
      $this->dbh->query("update form SET `mail_num`=? where id=?", $json["mail_num"], $id);
    }
    curl_close($curl);
    echo $result;
  }
}