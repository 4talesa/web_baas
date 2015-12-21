<?php
	require_once ('../lib/db.php');
	require_once ('../lib/imagem.php');

	$id = intval($_REQUEST['id']);
	$descricao = $_REQUEST['descricao'];
	$slug = $_REQUEST['slug'];
	$idimagem = intval($_REQUEST['idimagem']);
	if ($idimagem == 0)
	{
		$idimagem = cadastrarImagem('userfile');
	}
	$fretegratis = $_REQUEST['fretegratis'];
	
	if (is_numeric($idimagem)){
		$sql = "update categoria set descricao='$descricao', slug='$slug', idimagem=$idimagem, fretegratis='$fretegratis' where id=$id";
		$result = @mysql_query($sql);
		if ($result){
			echo json_encode(array('success'=>true));
		} else {
			echo json_encode(array('msg'=>'Erro ao atualizar dados.'));
		}
	}else{
		echo json_encode(array('msg'=>'Erro ao atualizar dados. '.$idimagem));
	}	
?>