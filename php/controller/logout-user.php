<?php 
	 require_once(__DIR__ . "/../model/config.php");

	 unset($S_SESSION["authenticated"]);

	 session_destroy();
	 header("Location: " . $path . "index.php");