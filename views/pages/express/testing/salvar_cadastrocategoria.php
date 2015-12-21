<?php
	require_once ('../lib/db.php');
	require_once ('../lib/imagem.php');

	$descricao = $_REQUEST['descricao'];
	$slug = $_REQUEST['slug'];
	$idimagem = intval($_REQUEST['idimagem']);
	if ($idimagem == 0)
	{
		$idimagem = cadastrarImagem('userfile');
	}
	$fretegratis = $_REQUEST['fretegratis'];
	
	if (is_numeric($idimagem)){
		$sql = "insert into categoria(descricao, slug, idimagem, fretegratis) values('$descricao','$slug',$idimagem,'$fretegratis')";
		$result = @mysql_query($sql);
		if ($result){
			echo json_encode(array('success'=>true));
		} else {
			echo json_encode(array('msg'=>'Erro ao inserir dados.'));
		}
	}else{
		echo json_encode(array('msg'=>'Erro ao atualizar dados. '.$idimagem));
	}
?>