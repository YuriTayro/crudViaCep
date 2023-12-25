<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['cep'])) {
    // Processar dados do formulário, se necessário
} elseif ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['cep'])) {
    $cep = $_GET['cep'];
    $cep = preg_replace('/\D/', '', $cep); // Remove caracteres não numéricos

    if (strlen($cep) == 8) {
        $url = "https://viacep.com.br/ws/{$cep}/json/";
        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if (!$data || isset($data['erro'])) {
            echo json_encode(['error' => 'CEP não encontrado. Por favor, verifique o CEP digitado.']);
        } else {
            echo json_encode($data);
        }
    } else {
        echo json_encode(['error' => 'Formato de CEP inválido.']);
    }
}
?>
