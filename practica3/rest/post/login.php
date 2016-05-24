<?php
// FICHERO: rest/post/login.php

$METODO = $_SERVER['REQUEST_METHOD'];
// EL METODO DEBE SER POST. SI NO LO ES, NO SE HACE NADA.
if($METODO<>'POST') exit();
// PETICIONES POST ADMITIDAS:
//   rest/login/

// =================================================================================
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
   require_once('../configbd.php');
// =================================================================================
// =================================================================================

// =================================================================================
// CONFIGURACION DE SALIDA JSON
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
// =================================================================================
// COMPROBACIÓN DE PARÁMETROS
if(!isset($PARAMS['login']) || !isset($PARAMS['pwd']))
{
  $rtn = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => "Faltan parámetros en la petición.");
  http_response_code(400);
  print json_encode($rtn);
  exit();
}

// Se pillan los parámetros de la petición:
$usu = sanatize($PARAMS['login']);
$pwd = sanatize($PARAMS['pwd']);

try{
  // ******** INICIO DE TRANSACCION **********
  mysqli_query($link, "BEGIN");
  $mysql = "select * from usuario where LOGIN='" . $usu . "'";
  if( $res = mysqli_query( $link, $mysql ) )
  {
    $row = mysqli_fetch_assoc( $res ); // Se transforma en array el registro encontrado

    if( mysqli_num_rows($res)==1 && $row['PASSWORD'] == $pwd ) // Se comprueba si el resultado tiene un único registro y si el password coincide
    { 
      $tiempo = time(); // se toma la hora a la que se hizo el login
      $key = md5( $pwd . date('YmdHis', $tiempo) );
      
      $mysql  = 'update usuario set CLAVE="' . $key . '"';
      $mysql .= ', ULTIMO_ACCESO="' . date('Y-m-d H:i:s', $tiempo) . '"';
      $mysql .= ' where LOGIN="' . $usu . '"';

      if( mysqli_query( $link, $mysql ) )
      {
        $R['RESULTADO']     = 'ok';
        $R['CODIGO']        = '200';
        $R['CLAVE']         = $key;
        $R['LOGIN']         = $usu;
        $R['NOMBRE']        = $row['NOMBRE'];
        $R['EMAIL']         = $row['EMAIL'];
        $R['ULTIMO_ACCESO'] = $row['ULTIMO_ACCESO'];
        $R['FOTO']          = $row['FOTO'];
      }
      else
      {
        $RESPONSE_CODE = 500;
        $error = 'Se ha producido un error en el servidor.';
        $R = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => $error);
        throw new Exception($error);
      }
    }
    else
    {
        $RESPONSE_CODE = 401;
        $R = array('RESULTADO' => 'error', 'CODIGO' => '401', 'DESCRIPCION' => 'login no correcto');
    }
  }
  // ******** FIN DE TRANSACCION **********
  mysqli_query($link, "COMMIT");
} catch(Exception $e){
  // Se ha producido un error, se cancela la transacción.
  mysqli_query($link, "ROLLBACK");
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
