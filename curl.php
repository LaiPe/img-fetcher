<?php
// URL de la ressource distante à récupérer (peut être fournie en paramètre GET)
$url = $_GET['url'] ?? '';

if (empty($url)) {
    // Vérifie que l'URL est présente, sinon envoie un message d'erreur
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No URL specified']);
    exit;
}

// Initialise une session cURL
$ch = curl_init($url);

// Configurer cURL pour récupérer la réponse de l'URL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Permet de suivre les redirections si l'URL en a

// Exécute la requête et stocke la réponse
$response = curl_exec($ch);

// Vérifie s'il y a des erreurs
if ($response === false) {
    header('Content-Type: application/json');
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

// Récupère le type de contenu de la réponse
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Ferme la session cURL
curl_close($ch);

// Envoie les en-têtes CORS pour permettre l'accès depuis d'autres origines
header('Access-Control-Allow-Origin: *');
header("Content-Type: $contentType");

// Renvoie la réponse de la ressource distante
echo $response;
?>
