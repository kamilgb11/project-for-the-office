<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE kontrahenci SET regon = ?, nazwa = ?, czy_platnik_vat = ?, ulica = ?, numer_domu = ?, numer_mieszkania = ? WHERE nip = ?";
$stmt= $pdo->prepare($sql);
$stmt->execute([
    $data['regon'],
    $data['nazwa'],
    $data['czyPlatnikVat'],
    $data['ulica'],
    $data['numerDomu'],
    $data['numerMieszkania'],
    $data['nip']
]);

echo json_encode(['success' => true]);
?>
