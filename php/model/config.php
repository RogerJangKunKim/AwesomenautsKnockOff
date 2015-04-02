<?php 

	require_once(__DIR__ . "/Database.php");

	session_start();
	//will regenerate new id and delete the old one. prevents getting hacked.
	session_regenerate_id(true);

	$path = "/RogerKAwesomenautsKnockOff/php/";
	//code refactoring helps with code maintainance, editing, and using. impove how the code looks.
	//storing database information on servers.
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	//we want to check if $_SESSION is called session, and session variable called connection exists.
	//checking if set or not. If set, then it will create the database object and  set it to session variable. we want to set it if it has not been set.
	//only functions when database has not been set.
	if(!isset($_SESSION["connection"])){
		//variable will have access to functions in Database.php
		//contructor will use info from the 4 variables above and store it withing the variable.
		//creates a new database object every time it is run.
		$connection = new Database($host, $username, $password, $database);
		//connection is assigned to $_SESSION. can be accessed throughout all the webpage.
		$_SESSION["connection"] = $connection;
	}