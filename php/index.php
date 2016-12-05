<?php

$link = mysql_connect("localhost", "root", "")
        or die("Could not connect: " . mysql_error());

$db_selected = mysql_select_db('new_db', $link);
if (!$db_selected) {
    die('Не удалось выбрать базу foo: ' . mysql_error());
}

$arr = $_POST;

if (!empty($arr['act'])) {
    unset($arr['act']);
    $cond = '';
    foreach ($arr as $key => $value) {
        $cond .= " and " . $key . " like '%$value%'";
    }
    $cond = substr($cond, 4);
    //var_dump("select * , count(*) as cnt from test where $cond");
    $result = mysql_query("select * from test where $cond");
    $num_rows = mysql_num_rows($result);
 
    $res = array();
    while ($row = mysql_fetch_assoc($result)) {
  
        if ($num_rows == 1) {
            echo json_encode($row);
            die();
        } 
        elseif ($num_rows == 0) {
            echo '{}';
            die();
        } 
        else {
            foreach ($row as $key => $value) {
                $res[$key][] = $value;
            }
        }
    }

    $res = uniq($res);
    echo json_encode($res);

    die();
}
// Выполняем запрос
$result = mysql_query('select * from test');


if (!$result) {
    $message = 'Неверный запрос: ' . mysql_error() . "\n";
    $message .= 'Запрос целиком: ' . $query;
    die($message);
}

$res = array();
while ($row = mysql_fetch_assoc($result)) {
    foreach ($row as $key => $value) {
        $res[$key][] = $value;
    }
}

$res = uniq($res);

echo json_encode($res);

function uniq($res) {
    foreach ($res as $key => $value) {
        $res[$key] = array_unique($res[$key]);
    }

    foreach ($res as $key => $value) {
        $res[$key] = array_values($res[$key]);
    }
    return $res;
};
