<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE kontrahenci SET usuniety = TRUE WHERE nip = ?";
$stmt= $pdo->prepare($sql);
$stmt->execute([$data['nip']]);

echo json_encode(['success' => true]);
?>
