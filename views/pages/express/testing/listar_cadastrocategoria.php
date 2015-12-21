<?php

require_once ('header.php');

?>
<script src="../js/jquery.form.js" type="text/javascript"></script>
<script type="text/javascript">
		var url;
		function newUser(){
			$('#dlg').dialog('open').dialog('setTitle','Novo');
			$('#fm').form('clear');
			imagePreviewShow();
			url = 'salvar_cadastrocategoria.php';
		}
		function editUser(){
			var row = $('#dg').datagrid('getSelected');
			if (row){
				$('#dlg').dialog('open').dialog('setTitle','Editar');
				$('#fm').form('load',row);
				url = 'atualizar_cadastrocategoria.php?id='+row.id;
				imagePreviewShow();
			}
		}
		function saveUser(){
			$('#fm').form('submit',{
				url: url,
					onSubmit: function(){
					return $(this).form('validate');
				},
				success: function(result){
					var result = eval('('+result+')');
					if (result.success){
						$('#dlg').dialog('close');		// close the dialog
						$('#dg').datagrid('reload');	// reload the user data
					} else {
						$.messager.show({
							title: 'Erro',
							msg: result.msg
						});
					}
				}
			});
		}
		function removeUser(){
			var row = $('#dg').datagrid('getSelected');
			if (row){
				$.messager.confirm('Confirm','Tem certeza que deseja remover o registro?',function(r){
					if (r){
						$.post('remover_cadastrocategoria.php',{id:row.id},function(result){
							if (result.success){
								$('#dg').datagrid('reload');	// reload the user data
							} else {
								$.messager.show({	// show error message
									title: 'Error',
									msg: result.msg
								});
							}
						},'json');
					}
				});
			}
		}
		function imagePreviewShow(){
			var src = $('#idimagem').val();
			if (src=="0")
			{
				$('#divimagepreview').hide();
				$('#divnovaimagem').show();					
				return;
			}
			$.ajax({
				url: 'pegar_preview_imagem.php',
				type: 'get',
				data: {id: $('#idimagem').val()},
				success: function(response) {
					$('#divnovaimagem').hide();
					$('#divimagepreview').show();
					$('#imagePreview').html(response);
				}
			});
		}		
		$(document).ready(function() {
			$("#idimagem").change(function() {
				imagePreviewShow();
			});
		});		
	</script>

	<div class="row clearfix">
		<div class="col-md-12 column">
			<div class="demo-info" style="margin-bottom:10px">
				<div class="demo-tip icon-tip">&nbsp;</div>
				<div>Clique na opção desejada na barra de ferramentas.</div>
			</div>
		</div>
	</div>
	<div class="row clearfix">
		<div class="col-md-12 column">
			<div class="pull-center">
				<table id="dg" title="Cadastro de Produtos" class="easyui-datagrid" style="width:1024px;height:400px"
						url="pegar_cadastrocategoria.php"
						toolbar="#toolbar" pagination="true"
						rownumbers="true" fitColumns="true" singleSelect="true">
					<thead>
						<tr>
							<th field="descricao" width="50">Descri&ccedil;&atilde;o</th>						
							<th field="slug" width="50">Slug</th>						
						</tr>
					</thead>
				</table>
			</div>
			<div id="toolbar">
				<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newUser()" title="Adicionar">Novo</a>
				<a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editUser()" title="Alterar Dados">Editar</a>
				<a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeUser()" title="Remover Dados">Remover</a>
			</div>
			
			<div id="dlg" class="easyui-dialog" style="width:700px;height:500px;padding:10px 20px"
					closed="true" buttons="#dlg-buttons">
				<div class="ftitle">Dados do Produto</div>
				<form id="fm" method="post" novalidate enctype="multipart/form-data">
				
					<div class="fitem">
					   <label>Descri&ccedil;&atilde;o:</label>
					   <input name="descricao" class="easyui-validatebox" required="true" size=90>
					</div>

					<div class="fitem">
					   <label>Slug:</label>
					   <input name="slug" class="easyui-validatebox" required="true">
					</div>
					
					<div class="fitem">
						<label>Frete Gratis:</label>						
						<select name="fretegratis" class="easyui-validatebox" required="true">
							<option value="P">Por tipo de frete</option>
							<option value="S">Sim</option>
							<option value="N">N&atilde;o</option>
						</select>
					</div>
					
					<div class="fitem">
					   <label>Imagem:</label>
						<select name="idimagem" id="idimagem" class="easyui-validatebox" required="true">
						<option value='0'>Nova</option>
						<?php
						$dir = "../img/fotos/";					
						$result = mysql_query("select id,nome,descricao,titulo,filename from imagem");

						while($row = mysql_fetch_array($result)){		
							echo "<option value='".$row['id']."'>".$row['nome']."</option>";
						}
						?>
						</select>
					</div>
				
					<div class="fitem" id="divnovaimagem">
						<label>Arquivo:</label>						
						<!-- MAX_FILE_SIZE must precede the file input field -->
						<input type="hidden" name="MAX_FILE_SIZE" value="10000" />
						<!-- Name of input element determines name in $_FILES array -->						
						<input name="userfile" type="file"/>						
					</div>				

					<div class="fitem" id="divimagepreview">
						<label>Pr&eacute;via:</label>
						<div id="imagePreview"></div>
					</div>
					
				</form>
			</div>
			<div id="dlg-buttons">
				<a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveUser()">Salvar</a>
				<a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">Cancelar</a>
			</div>			
		</div>
	</div>
	
<?php

require_once ('footer.php');

?>
