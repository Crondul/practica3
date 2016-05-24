<?php
// =================================================================================
// =================================================================================
// CONFIGURACION DE ACCESO A LA BASE DE DATOS:
// =================================================================================
$_server   = "127.0.0.1"; // IP del servidor de mysql. Si mysql está escuchando en 
                          // otro puerto, por ejemplo 3307, hay que añadírselo a la
                          // IP del servidor de la siguiente manera:
                          //     $_server   = "127.0.0.1:3307";
$_dataBase = "ph2";       // Nombre de la BD en mysql
$_user     = "ph2";       // Usuario con acceso a la BD $_dataBase
$_password = "ph2";       // Contraseña del usuario
// =================================================================================
// SE ABRE LA CONEXION A LA BD
// =================================================================================
$link =  mysqli_connect($_server, $_user, $_password, $_dataBase);
if (mysqli_connect_errno()) {
  printf("Fallo en la conexión: %s\n", mysqli_connect_error());
  exit();
}
// =================================================================================
// SE CONFIGURA EL JUEGO DE CARACTERES DE LA CONEXION A UTF-8
// =================================================================================
mysqli_set_charset($link, 'utf8');
// =================================================================================
// =================================================================================

// =================================================================================
// Limpia y prepara el valor correspondiente a un parámetro recibido en el servidor
// procedente de una petición del cliente (ajax, etc)
// =================================================================================
function sanatize($valor)
{
  global $link;

  $valor_retorno = urldecode('' . $valor);
  $valor_retorno = mysqli_real_escape_string($link, $valor_retorno);

  return $valor_retorno;
}
// =================================================================================
// Comprueba si el usuario está logueado y la clave es válida:
// =================================================================================
function comprobarSesion($login, $clave)
{
	global $link;
	global $tiempo_de_sesion;
  $valorRet = false;
  $mysql  = 'select * from usuario where LOGIN="' . $login . '"';
  $mysql .= ' and CLAVE="' . $clave . '"';
  $mysql .= ' and UNIX_TIMESTAMP(NOW())-UNIX_TIMESTAMP(ULTIMO_ACCESO)<' . $tiempo_de_sesion;
  if( $res = mysqli_query($link, $mysql) )
  {
    if(mysqli_num_rows($res)==1) 
    {
        $row = mysqli_fetch_assoc($res);
        actualizarUltimoAcceso($login, $row['PASSWORD']);
        $valorRet = true;
    }
  }
  else
  {
    $RESPONSE_CODE = 500;
    print json_encode( array('RESULTADO' => 'error', 'CODIGO' => $RESPONSE_CODE, 'DESCRIPCION' => 'Error de servidor.') );
    exit();
  }
  return $valorRet;
}
// =================================================================================
// =================================================================================
// Actualiza el valor de último acceso para el usuario que se le pasa
// =================================================================================
function actualizarUltimoAcceso($login, $pwd)
{
  global $link;
  $retVal = true;

  $mysql = 'update usuario set ULTIMO_ACCESO=NOW() where LOGIN="' . $login . '" and PASSWORD="' . $pwd . '"';
  mysqli_query($link, "BEGIN");
  if( mysqli_query($link, $mysql) )
    $retVal = true;
  else $retVal = false;
  mysqli_query($link, "COMMIT");

  return $retVal;
}


?>
