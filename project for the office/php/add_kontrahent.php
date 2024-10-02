<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO kontrahenci (nip, regon, nazwa, czy_platnik_vat, ulica, numer_domu, numer_mieszkania) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt= $pdo->prepare($sql);
$stmt->execute([
    $data['nip'],
    $data['regon'],
    $data['nazwa'],
    $data['czyPlatnikVat'],
    $data['ulica'],
    $data['numerDomu'],
    $data['numerMieszkania']
]);

echo json_encode(['success' => true]);
?>
