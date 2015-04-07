<?php
	require_once(__DIR__ . "/../model/config.php");

	$array = array{
		'exp'=> '',
		'exp1'=> '',
		'exp2'=> '',
		'exp3'=> '',
		'exp4'=> '',
	};

	$username = filter_input (INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input (INPUT_POST, "password", FILTER_SANITIZE_STRING);

	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

	//num_rows how many rows we will retrieve from database.
	if($query->num_rows == 1){
		$row = $query->fetch_array();
		// case sensitive.
		//checks if hashed password=new hashed password
		if($row["password"] === crypt($password, $row["salt"])){
			$_SESSION["authenticated"] = true;
			$array["exp"] = $row["exp"]; //row is user's exp
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];

			$_SESSION["name"] = $username;

			echo json_encode($array);
		}
		else{
			echo "Invalid Username and Password";
		}
	}
	else{
		echo "Invalid Username and Password";
	}
