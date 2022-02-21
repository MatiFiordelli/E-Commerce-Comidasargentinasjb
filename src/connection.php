<?php
	header("Access-Control-Allow-Origin: *");
	
	// Connection
	$hostname="fdb34.awardspace.net";
    $username="4044523_matiasdb";
    $password="";
    $database="4044523_matiasdb";
    $table="Products";
    $link = mysqli_connect($hostname, $username, $password);

    if (!$link) {
        die('Error connecting to the database');
    }
	mysqli_set_charset($link, 'utf8');
    mysqli_select_db($link, $database);

	//Query
	if (isset($_GET['type'])) {
		$type = $_GET['type'];
	};
	
	if (isset($_GET['search'])) {
		$search = $_GET['search'];
		$arraySearch = explode(" ", $search);
		$whereContent = ''; //concatenation of conditions based on the search words, to create the 'WHERE' condition

		for($i=0; $i<sizeof($arraySearch); $i++) {
			$whereContent .= "(name LIKE '%$arraySearch[$i]%' OR description LIKE '%$arraySearch[$i]%')";
			if($i <> sizeof($arraySearch)-1) {
				$whereContent .= " OR ";
			};
		};
	};
	
	//$type: for the menu (breads, canastitas, empanadas, pides)
	//$search: for the search bar
	
	if (isset($type)) {
		$query = "SELECT * FROM $table WHERE type='$type'";
	}
	if (isset($search)) {
		$query = "SELECT * FROM $table WHERE $whereContent";
	}


    $result = mysqli_query($link, $query, MYSQLI_STORE_RESULT );
    $cursor = mysqli_fetch_all($result, MYSQLI_ASSOC);

	$js = json_encode($cursor,  DEFINED('JSON_INVALID_UTF8_IGNORE') ? JSON_INVALID_UTF8_IGNORE : 0);
    echo($js); //query results to be used on the app

    mysqli_free_result($result); 
    mysqli_close($link);
?>