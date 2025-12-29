<?php
// proxy.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/xml; charset=UTF-8");

$baseUrl = "http://www.emuseum.go.kr/openapi/relic";
$serviceKey = "***REMOVED_API_KEY***";

// Determine the endpoint (list or detail)
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$endpoint = ($action === 'detail') ? '/detail' : '/list';

// Build the target URL
$url = $baseUrl . $endpoint . "?serviceKey=" . $serviceKey;

// Append other known parameters
$allowedParams = ['name', 'numOfRows', 'pageNo', 'id'];
foreach ($allowedParams as $param) {
    if (isset($_GET[$param])) {
        // basic sanitization
        $val = urlencode($_GET[$param]);
        $url .= "&" . $param . "=" . $val;
    }
}

// Fetch the data
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// Provide a user agent just in case
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; EMuseumGallery/1.0)');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo "Curl Error: " . curl_error($ch);
} else {
    // Relay the content type from the source if possible, but we default to XML
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
?>
