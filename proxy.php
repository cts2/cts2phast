<?php
$approved_hosts = array("informatics.mayo.edu", "phastservices.cloudapp.net");

$url = $_GET['url'];


$parsed_url = parse_url($url);

$host_name = $parsed_url["host"];

if(! in_array($host_name, $approved_hosts)){
    echo "Forbidden";
    header(' ', true, 403);
    return;
}

echo file_get_contents($_GET['url']);
?>