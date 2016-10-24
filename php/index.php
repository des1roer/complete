<?php
include_once 'classSave.php';
include_once 'project_ini.php';

$param = $_POST;

$save = new SaveClass($dbh, PRJ);
$save->setLog(TRUE);
$return = $save->Save($param);
echo json_encode($return);