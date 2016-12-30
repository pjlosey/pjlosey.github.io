<?php
	require_once ( 'settings.php' );
	$ch = curl_init();
	curl_setopt( $ch, CURLOPT_HTTPGET, 1 );
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, TRUE );
	curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
	$http_headers = array();
	$http_headers[] = 'Authorization: Bearer ' . AIRTABLE_API_KEY;
	curl_setopt( $ch, CURLOPT_HTTPHEADER, $http_headers );

	$airtable_url = AIRTABLE_API_URL . AIRTABLE_APP_ID;
	$airtable_url .= '/Collection';
	$airtable_url .= '?view=Main+View';
	//$airtable_url .= '&limit=10';
	$airtable_url .= '&sortField=Vehicle&sortDirection=asc';
	curl_setopt( $ch, CURLOPT_URL, $airtable_url );
	$response_json = curl_exec( $ch );
	if ( curl_errno( $ch ) != 0 ) {
		echo '<h2>CURL Error</h2>';
		echo 'Code: ' . curl_errno( $ch );
		die;

	}
	$airtable_response = json_decode( $response_json, TRUE );
	return json_encode($airtable_response);
	//echo '<pre>';
	//print_r($airtable_response);
	//echo '</pre>';

	// Close the curl session.
	curl_close( $ch );

?>
