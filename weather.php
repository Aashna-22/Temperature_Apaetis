<?php
$location = $_GET['location'];
$units = 'metric';
$apiKey = '166d12a2b82faf53d785d55427743d73';
$apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=". $location. "&appid=". $apiKey. "&units=".$units;
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);
$city = $data['city']['name'];
$desc = $data['list'][0]['weather'][0]['description'];
$weatherData = array();
$previousDate = null;
$dayCount = 0;

foreach ($data['list'] as $entry) {
    $date = $entry['dt_txt'];
    $weather = $entry['main']['temp'];
    $temp_min = $entry['main']['temp_min'];
    $temp_max = $entry['main']['temp_max'];
    $datePart = substr($date, 0, 10);
    if ($datePart !== $previousDate) {
        $weatherData[] = [
            'date' => $date,
            'weather' => $weather,
            'temp_min' => $temp_min,
            'temp_max' => $temp_max,
        ];
        $previousDate = $datePart;
        $dayCount++;
        if ($dayCount === 6) {
            break;
        }
    }
}

echo json_encode(['city' => $city, 'weatherData' => $weatherData, 'desc' => $desc]);

?>