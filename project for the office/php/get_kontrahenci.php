<?php
require 'db.php';

$stmt = $pdo->query('SELECT * FROM kontrahenci WHERE usuniety = FALSE');
$kontrahenci = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($kontrahenci);
?>
