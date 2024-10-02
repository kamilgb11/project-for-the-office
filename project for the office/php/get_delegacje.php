<?php
require 'db.php';

$stmt = $pdo->query('SELECT * FROM delegacje');
$delegacje = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($delegacje);
?>
