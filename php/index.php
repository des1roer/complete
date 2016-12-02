<?php
$link = mysql_connect("localhost", "root", "")
        or die("Could not connect: " . mysql_error());

$db_selected = mysql_select_db('new_db', $link);
if (!$db_selected) {
    die ('Не удалось выбрать базу foo: ' . mysql_error());
}

$arr = $_POST;

if (!empty($arr['act']))
{
    unset($arr['act']);
    $keys = implode(',', array_keys($arr));
    $val = implode(',', array_values($arr));
         $result = mysql_query("select * from test where ");

    var_dump($arr);
    die();
}
// Выполняем запрос
 $result = mysql_query('select * from test');

 
if (!$result) {
    $message  = 'Неверный запрос: ' . mysql_error() . "\n";
    $message .= 'Запрос целиком: ' . $query;
    die($message);
}

$res = array();
while ($row = mysql_fetch_assoc($result)) {
    foreach ($row as $key => $value) {   
            $res[$key][] = $value;
    }    
}

echo json_encode($res);