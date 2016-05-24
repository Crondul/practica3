<?php
// FICHERO: rest/post/usuario.php
// FUNCIÓN: Realiza el registro de usuario

$METODO = $_SERVER['REQUEST_METHOD'];
// EL METODO DEBE SER POST. SI NO LO ES, NO SE HACE NADA.
if($METODO<>'POST') exit();
// PETICIONES POST ADMITIDAS:
//   rest/usuario/

// =================================================================================
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
   require_once('../configbd.php');
// =================================================================================
// =================================================================================

// =================================================================================
// COMPROBAR SI EXISTE EL USUARIO EN LA BD
// =================================================================================
function comprobarExistencia($login)
{
    global $link;
    $valorRet = false;

    $mysql  = 'select * from usuario where LOGIN="' . $login . '"';
    if( $res = mysqli_query( $link, $mysql ) )
    {
      $row = mysqli_fetch_assoc( $res ); // Se transforma en array el registro encontrado
      if( mysqli_num_rows($res)==1 && $row['LOGIN'] == $login )
        $valorRet = true;
    }

    return $valorRet;
}

// =================================================================================
// CONFIGURACION DE SALIDA JSON Y CORS PARA PETICIONES AJAX
// =================================================================================
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
// =================================================================================
// Se prepara la respuesta
// =================================================================================
$R = []; // Almacenará el resultado.
$RESPONSE_CODE = 200; // código de respuesta por defecto: 200 - OK
// =================================================================================
// =================================================================================
// Se supone que si llega aquí es porque todo ha ido bien y tenemos los datos correctos:
$PARAMS = $_POST;
if( !( isset($PARAMS['login']) ) )
{
  $rtn = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => "Parámetros incorrectos");
  http_response_code(400);
  print json_encode($rtn);
  exit();
}

// Se pillan el usuario y el login:
$login  = sanatize($PARAMS['login']);
$pwd    = sanatize($PARAMS['pwd']);
$pwd2   = sanatize($PARAMS['pwd2']);
$nombre = sanatize($PARAMS['nombre']);
$email  = sanatize($PARAMS['email']);

if( $pwd != $pwd2 ) // Contraseñas distintas
{
  $rtn = array('RESULTADO' => 'error', 'CODIGO' => '401', 'DESCRIPCION' => "Contraseñas distintas");
  http_response_code(400);
  print json_encode($rtn);
  exit();
}

if( $login == '' )
{
  $RESPONSE_CODE = 400;
  $R = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => 'login no correcto');
}
else
{
  try{
    // ******** INICIO DE TRANSACCION **********
    mysqli_query($link, 'BEGIN');

    if(!comprobarExistencia($login))
    { // El usuario no existe, se da de alta
      $mysql  = 'insert into usuario(LOGIN,PASSWORD,NOMBRE,EMAIL) values("';
      $mysql .= $login . '","' . $pwd . '","' . $nombre . '","' . $email . '")';
    } // if(!comprobarExistencia($login))
    else
    { // El usuario existe, se modifican sus datos
      $clave  = sanatize($PARAMS['clave']);

      if( !comprobarSesion($login,$clave) )
        $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'DESCRIPCION' => 'Tiempo de sesión agotado.');
      else
      {
        $mysql  = 'update usuario set ';
        $mysql .= 'NOMBRE="' . $nombre . '"';
        $mysql .= ', EMAIL="' . $email . '"';
        if( strlen($pwd) > 1 )
          $mysql .= ', PASSWORD="' . $pwd . '"';
        $mysql .= ' where LOGIN="' . $login .'"';
      }
    }
    if( count($R) == 0 )
    {
      // Se ejecuta el sql
      if( mysqli_query( $link, $mysql ) )
        $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'LOGIN' => $login, 'FOTO' => '');
      else
        $R = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => 'No se ha podido hacer el registro');

      // SI HAY FOTO, HAY QUE COPIARLA
      if( isset($_FILES['foto']) && count($_FILES['foto']['name']) == 1 )
      {
        // ===================
        // HAY FOTO
        // ===================
        $ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION); // extensión del fichero
        $uploadfile = $uploaddir_fotos_usu . $login . '.' . $ext; // path fichero destino
        if(move_uploaded_file($_FILES['foto']['tmp_name'], $uploadfile)) // se sube el fichero
        {
          // Se ha subido la foto correctamente. Se actualiza el campo FOTO en la BD:
          $mysql ='update usuario set FOTO="' . $login . '.' . $ext . '" where LOGIN="' . $login .'"';
          if( mysqli_query( $link, $mysql ) )
            $R['foto'] = $login . '.' . $ext;
        }
      } // if( count($_FILES['foto']['name']) == 1)
      else
      {
        $mysql = 'select FOTO from usuario where LOGIN="' . $login . '"';
        if( $res = mysqli_query($link,$mysql) )
        {
          $row = mysqli_fetch_assoc($res);
          $R['foto'] = $row['FOTO'];
        }
      }

    } // if( count($R) == 0 )

    // ******** FIN DE TRANSACCION **********
    mysqli_query($link, "COMMIT");
  } catch(Exception $e){
    // Se ha producido un error, se cancela la transacción.
    mysqli_query($link, "ROLLBACK");
  }
}
// =================================================================================
// SE CIERRA LA CONEXION CON LA BD
// =================================================================================
mysqli_close($link);
// =================================================================================
// SE DEVUELVE EL RESULTADO DE LA CONSULTA
// =================================================================================
try {
    // Here: everything went ok. So before returning JSON, you can setup HTTP status code too
    http_response_code($RESPONSE_CODE);
    print json_encode($R);
}
catch (SomeException $ex) {
    $rtn = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => "Se ha producido un error al devolver los datos.");
    http_response_code(500);
    print json_encode($rtn);
}
// =================================================================================
?>