<?php
	require_once ('../lib/db.php');

	$id = intval($_REQUEST['id']);

	$sql = "delete from categoria where id=$id";
	$result = @mysql_query($sql);
	if ($result){
		echo json_encode(array('success'=>true));
	} else {
		echo json_encode(array('msg'=>'Erro ao remover dados.'));
	}
?>