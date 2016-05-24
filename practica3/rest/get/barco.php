<?php
// FICHERO: rest/get/barco.php

$METODO = $_SERVER['REQUEST_METHOD'];
// EL METODO DEBE SER GET. SI NO LO ES, NO SE HACE NADA.
if($METODO<>'GET') exit();
// PETICIONES GET ADMITIDAS:
//   rest/barco/ -> devuelve el array de los barcos del servidor. Hay que pasar el login del usuario que está jugando con el servidor.

// =================================================================================
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
require_once('../configbd.php');
// =================================================================================
// =================================================================================
$RECURSO = explode("/", $_GET['prm']);
$PARAMS = array_slice($_GET, 1, count($_GET) - 1,true);
// =================================================================================
// CONFIGURACION DE SALIDA JSON Y CORS PARA PETICIONES AJAX
// =================================================================================
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
// =================================================================================
// Se prepara la respuesta
// =================================================================================
if( !isset($PARAMS['login']) )
{
  $rtn = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => "Faltan parámetros en la petición.");
  http_response_code(400);
  print json_encode($rtn);
  exit();
}
$LOGIN = sanatize($PARAMS['login']);

$R = [];                    // Almacenará el resultado.
$RESPONSE_CODE = 200;       // código de respuesta por defecto: 200 - OK

try{
  // ******** INICIO DE TRANSACCION **********
  mysqli_query($link, "BEGIN");

    $mysql = 'select * from barco where LOGIN="' . $LOGIN . '"';

    if($res = mysqli_query($link, $mysql) )
    {
        while( $row = mysqli_fetch_assoc( $res ) )
            $R[] = $row;
    }
    mysqli_free_result( $res );
    $R = array("RESULTADO" => "ok", "CODIGO" => "200", "FILAS" => $R);

  // ******** FIN DE TRANSACCION **********
  mysqli_query($link, "COMMIT");
} catch(Exception $e){
  // Se ha producido un error, se cancela la transacción.
  mysqli_query($link, "ROLLBACK");
  $RESPONSE_CODE = 500;
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

?>