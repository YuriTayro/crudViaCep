<?php
if(isset($_GET['nom'])) {
    echo $_GET['nom'];
} else {
    echo "Campo 'nom' não foi enviado no formulário.";
}
?>
