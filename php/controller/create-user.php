<?php
	require_once(__DIR__ . "/../model/config.php");


	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
	// used to encrypt the password so people won't be able to identify the password.
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

	// telling it to use $password and $salt use together to make an encrypted password, will give a unique encrypted password.

	$hashedPassword = crypt($password, $salt);

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt', "
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0 ");

	$_SESSION["name"] = $username;
	if($query){
		echo "true"; //need for Ajax on index.php
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}

?>
