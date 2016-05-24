<?php
// FICHERO: rest/post/juego.php

$METODO = $_SERVER['REQUEST_METHOD'];
// EL METODO DEBE SER POST. SI NO LO ES, NO SE HACE NADA.
if($METODO<>'POST') exit();
// PETICIONES POST ADMITIDAS:
//   rest/juego/empezar -> empieza el juego, hay que colocar los barcos
//                hace falta enviar el login.
//   rest/juego/disparo/jugador -> con parámetros columna y fila siginifica disparo recibido
//                    teniendo que devolver true o false si ha sido alcanzado algún barco
//                hace falta enviar el login.
//   rest/juego/disparo/maquina -> sin parámetros columna y fila siginifica disparo recibido
//                hace falta enviar el login.

$DIVISIONES = 10; // divisiones de la cuadrícula

// Devuelve true si las posiciones que se pasan están libres
function comprobarPosicion($LOGIN,$COLUMNA,$FILA,$TAMANYO,$ANGULO)
{
  global $link, $DIVISIONES;

  if($ANGULO == 0 && $COLUMNA + $TAMANYO > $DIVISIONES
    || $ANGULO == -90 && $FILA - $TAMANYO < 1)
    return false;

  $mysql = 'select * from barco where LOGIN="' . $LOGIN . '"';
  if( $res = mysqli_query( $link, $mysql ) )
  {
      while( $row = mysqli_fetch_assoc($res) )
      {
        for($i=0;$i<$TAMANYO;$i++)
        {
          $C = $COLUMNA;
          $F = $FILA;

          if($ANGULO == 0)
            $C = $C + $i;
          else
            $F = $F - $i;

          if( ($row['ANGULO']==0 && $C>=$row['COLUMNA'] - 1 && $C<=$row['COLUMNA'] + $row['TAMANYO'] && $F<=$row['FILA'] + 1 && $F>=$row['FILA'] - 1)
            || ($row['ANGULO']==-90 && $F<=$row['FILA'] + 1 && $F>=$row['FILA'] - $row['TAMANYO'] && $C>=$row['COLUMNA'] - 1 && $C<=$row['COLUMNA'] + 1) )
            {
              return false;
            }
        } // for($i=0;$i<$TAMANYO;$i++)
      }
    mysqli_free_result( $res );
  }
  return true;
}

// Función que genera y coloca aleatoriamente los barcos
function generarBarcos($LOGIN)
{
  global $link, $DIVISIONES;
  $BARCOS = [4,3,3,2,2,2,1,1,1,1];

  foreach ($BARCOS as $tamanyo)
  {
    do
    {
      $COLUMNA = rand(1, $DIVISIONES);
      $FILA    = rand(1, $DIVISIONES);
      $ANGULO  = rand(0,1) * (-90);

    }while( !comprobarPosicion($LOGIN,$COLUMNA,$FILA,$tamanyo,$ANGULO) );

    $mysql = 'insert into barco(COLUMNA,FILA,TAMANYO,ANGULO,LOGIN) values(' . $COLUMNA . ',' . $FILA . ',' . $tamanyo . ',' . $ANGULO . ',"' . $LOGIN . '")';
    //printf("%s\n", $mysql);
    if( !mysqli_query( $link, $mysql ) )
    {
      $rtn = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => 'Error al crear los barcos.', 'err' => mysqli_error($link));
      http_response_code(500);
      print json_encode($rtn);
      exit();
    }
  }
}

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
$RECURSO = explode("/", $_GET['prm']);
$PARAMS = $_POST;

$LOGIN = sanatize($PARAMS['login']);

if( !isset($LOGIN) )
{
  $rtn = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => "Faltan parámetros en la petición.");
  http_response_code(400);
  print json_encode($rtn);
  exit();
}

try
{
  // ******** INICIO DE TRANSACCION **********
  mysqli_query($link, "BEGIN");

  switch( $valor_shifted = array_shift( $RECURSO ) )
  {
    case 'empezar': // EMPIEZA EL JUEGO
        $mysql = 'delete from disparo where LOGIN="' . $LOGIN . '"'; // Se eliminan los disparos
        if( $res = mysqli_query( $link, $mysql ) )
        {
          $mysql = 'delete from barco where LOGIN="' . $LOGIN . '"'; // Se eliminan los barcos
          if( $res = mysqli_query( $link, $mysql ) )
          {
            generarBarcos($LOGIN);
            $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'DESCRIPCION' => 'Barcos del servidor generados');
          }
        }
      break;
    case 'ganada': // SE ANOTA LA VICTORIA DE UN USUARIO
    case 'perdida': // SE ANOTA LA DERROTA DE UN USUARIO
        $mysql = 'update partidas set JUGADAS = JUGADAS + 1';
        if( $valor_shifted == 'ganada')
          $mysql .= ', GANADAS = GANADAS + 1';
        $mysql .= ' where LOGIN="' . $LOGIN . '"';
        if( $res = mysqli_query( $link, $mysql ) )
        {
          $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'DESCRIPCION' => 'Clasificación actualizada correctamente');
        }
        else
        {
          $RESPONSE_CODE = 500;
          $R = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => mysqli_error($link));
        }
      break;
    case 'disparo':
        switch( array_shift( $RECURSO ) )
        {
          case 'jugador': // SE TRATA DE UN DISPARO DEL USUARIO
            if( isset( $PARAMS['columna'] ) && isset( $PARAMS['fila'] ) )
            {
              $COLUMNA = sanatize($PARAMS['columna']);
              $FILA    = sanatize($PARAMS['fila']);

              $mysql = 'insert into disparo values("' . $LOGIN . '",' . $COLUMNA . ',' . $FILA . ',0);';

              if( $res = mysqli_query( $link, $mysql ) )
              {
                // ======================================
                // Comprobar si ha tocado algún barco
                $TOCADO = false;
                $HUNDIDO = false;
                $mysql = 'select * from barco where LOGIN="' . $LOGIN . '"';
                if( $res = mysqli_query( $link, $mysql ) )
                {
                  while( $row = mysqli_fetch_assoc($res) )
                  {
                    for($i=0;$i<$row['TAMANYO'];$i++)
                    {
                      if( ($row['ANGULO'] == 0 && $row['COLUMNA'] + $i == $COLUMNA && $row['FILA'] == $FILA)
                        || ($row['ANGULO'] == -90 && $row['COLUMNA'] == $COLUMNA && $row['FILA'] -$i == $FILA))
                      { // TOCADO
                        $mysql  = 'update barco set HITS=' . ($row['HITS'] + 1);
                        $mysql .= ' where COLUMNA=' . $row['COLUMNA'] . ' and FILA=' . $row['FILA'];
                        $mysql .= ' and LOGIN="' . $LOGIN . '"';
                        if( $res2 = mysqli_query( $link, $mysql ) )
                        {
                          $TOCADO = true;
                          $row['HITS']++;
                          if($row['HITS'] == $row['TAMANYO'])
                          {
                            $HUNDIDO = true;
                            $BARCO = $row;
                          }
                        }
                        break;
                      }
                    }
                  } // while( $row = mysqli_fetch_assoc($res) )
                  mysqli_free_result( $res );
                  if($TOCADO)
                  {
                    $DESCRIPCION = "TOCADO";
                    $DISPARO = 1;
                    if($HUNDIDO)
                    {
                      $DESCRIPCION .= " Y HUNDIDO";
                      $DISPARO = 2;
                    }
                  }
                  else
                  {
                    $DESCRIPCION = "AGUA";
                    $DISPARO = -1;
                  }

                  $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'DISPARO' => $DISPARO, 'DESCRIPCION' => $DESCRIPCION);
                  if($HUNDIDO) $R['BARCO'] = $BARCO;
                  // ======================================
                }
                else
                { // ERROR
                  $RESPONSE_CODE = 500;
                  $R = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => mysqli_error($link));
                }
              }
            }
            else
            { // FALTAN PARÁMETROS
              http_response_code(400);
              $rtn = array('RESULTADO' => 'error', 'CODIGO' => '400', 'DESCRIPCION' => "Faltan parámetros en la petición.");
            }
            break;
          case 'enemigo': // Se solicita disparo de la máquina
              $repetir    = true;
              $intentos   = 0;
              do{
                // columna y fila seleccionada al azar
                $COLUMNA = rand(1, $DIVISIONES);
                $FILA    = rand(1, $DIVISIONES);
                $intentos ++;
                $mysql = 'select * from disparo where COLUMNA=' . $COLUMNA . ' and FILA=' . $FILA . ' and LOGIN="' . $LOGIN . '" and REALIZADO=1';
                if( ($res = mysqli_query($link, $mysql) ) )
                  $repetir = (mysqli_num_rows($res) > 0);
              }while($repetir && $intentos < 200);

              if($repetir)
                $COLUMNA = $FILA = -1; // no quedan disparos
              else
              { // Se ha generado un disparo
                $mysql = 'insert into disparo values("' . $LOGIN . '",' . $COLUMNA . ',' . $FILA . ',1);';
                mysqli_query( $link, $mysql );
              }

              $R = array('RESULTADO' => 'ok', 'CODIGO' => '200', 'DISPARO' => array('COLUMNA' => $COLUMNA, 'FILA' => $FILA));
            break;
        }
      break;
  } // fin del switch


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
}catch (SomeException $ex) {
    $rtn = array('RESULTADO' => 'error', 'CODIGO' => '500', 'DESCRIPCION' => "Se ha producido un error al devolver los datos.");
    http_response_code(500);
    print json_encode($rtn);
}

// =================================================================================
?>