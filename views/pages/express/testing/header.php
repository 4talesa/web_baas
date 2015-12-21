<?php

require_once ('../lib/seguranca.php'); // Inclui o arquivo com o sistema de segurança
require_once ('../lib/functions.php');
require_once ('../lib/db.php');
require_once ('../lib/loja.php');
protegePagina(curPageURL(),'usuarios'); // Chama a função que protege a página

?>
	
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <title><?php echo pegarParam('servidor','titulosite')?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?php echo pegarParam('servidor','titulosite')?>">
  <meta name="author" content="<?php echo pegarParam('servidor','titulosite')?>">

	<!--link rel="stylesheet/less" href="less/bootstrap.less" type="text/css" /-->
	<!--link rel="stylesheet/less" href="less/responsive.less" type="text/css" /-->
	<!--script src="js/less-1.3.3.min.js"></script-->
	<!--append ‘#!watch’ to the browser URL, then refresh the page. -->
	
	<link href="../css/bootstrap.min.css" rel="stylesheet">
	<link href="../css/style.css" rel="stylesheet">
	<link href="../css/style-navbar.css" rel="stylesheet">
	<link href="../css/style.php" rel="stylesheet">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
  <![endif]-->

  <!-- Fav and touch icons -->
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../img/apple-touch-icon-144-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../img/apple-touch-icon-114-precomposed.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../img/apple-touch-icon-72-precomposed.png">
  <link rel="apple-touch-icon-precomposed" href="../img/apple-touch-icon-57-precomposed.png">
  <link rel="shortcut icon" href="../img/favicon.png">
  
	<script type="text/javascript" src="../js/jquery.min.js"></script>
	<script type="text/javascript" src="../js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../js/scripts.js"></script>
	
	<!-- Scripts do easyUI -->
	<link rel="stylesheet" type="text/css" href="../css/easyui.css">
	<link rel="stylesheet" type="text/css" href="../css/icon.css">
	<script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
</head>

<body>
<div class="container">
	<div class="row clearfix">
		<div class="col-md-12 column">
			<div class="divh1">				
				<form action="" method="post" target="_self">
					Empresa selecionada:
					<select name="empresaheader" id="empresaheader" class="easyui-validatebox" required="true" onchange="this.form.submit()">
						<option value="0">Selecione uma empresa</option>
						<?php
						if(isset($_POST["empresaheader"])){
							$_SESSION['empresaheader'] = $_POST["empresaheader"];
						}elseif(!isset($_SESSION['empresaheader']) && intval(pegarParam("PagSeguro","idempresa")) > 0){
							$_SESSION['empresaheader'] = intval(pegarParam("PagSeguro","idempresa"));
						}elseif(!isset($_SESSION['empresaheader'])){
							$_SESSION['empresaheader'] = 0;
						}

						$result = mysql_query("select id,razaosocial from empresa");

						while($row = mysql_fetch_array($result)){
							$selected = "";
							if(isset($_SESSION['empresaheader'])){
								if ($_SESSION['empresaheader']==$row['id']){
									$selected = " selected ";
								}
							}elseif($row['id'] == intval(pegarParam("PagSeguro","idempresa"))){
									$selected = " selected ";								
							}
							echo "<option ".$selected." value='".$row['id']."'>".$row['razaosocial']."</option>";
						}
						?>
					</select>						
					<!--<input value="Trocar" type="submit">-->
				</form>				
			</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="row clearfix divheader">	
		<div class="col-md-4 column">
			<div class="pull-center">				
				<a href="<?php echo curPageURL(false);?>"><img alt="P&aacute;gina Inicial" src="../img/empresa_logo.png" class="img-logo"></a>
			</div>
		</div>
		<div class="col-md-8 column">
			<div class="row clearfix">
				<div class="col-md-12 column navbar-inner">
				<?php

					include ('menu_admin.php');

				?>
				</div>
			</div>			
		</div>
	</div>
</div>

<div class="container">
	
