//LOGIN
function hacerLogin()
{

    console.log("Pasa por hacerLogin");
    var form = document.getElementById("flog");
    var login = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    
    var args = "login="+login+"&pwd="+pass;
    
    console.log("Argumentos registro: "+args)
    
    var obj3; // variable que guarda el objeto XMLHttpRequest    
    obj3 = crearObjAjax();
     if(obj3) 
       {
         
         url="rest/login/";
         obj3.onreadystatechange=function()
          {

            console.log(obj3.readyState);
              if (obj3.readyState==4)
                { 
                    if(obj3.status==200){
                   //obj.responseText;
                   var respuesta = obj3.responseText;
                   console.log("Respuesta Registro: "+respuesta);
                    
                    var login = respuesta.split(",");
                    login = login[3];
                    var login2 = login.split(":");
                    var login3 = login2[1].split("\"");
                    sessionStorage.setItem("login", login3[1]);
                    
                    var clave = respuesta.split(",");
                    clave = clave[2];
                    var clave2 = clave.split(":");
                    var clave3 = clave2[1].split("\"");
                    sessionStorage.setItem("clave", clave3[1]);
                    
                    mostrarMensajeLogin();
                }

            else{
                mostrarMensajeLoginerror();
            }
            }
          }

         obj3.open("POST", url, true); // Se crea petición POST a url, asíncrona ("true")
         obj3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         obj3.send(args); // Se envía la petición         
       }
      
}
    function mostrarMensajeLogin()
{
    console.log("Pasa por mostrarMensajeLogin");
    // MOSTRAR CAPA
    ultima = sessionStorage.getItem("ultima");
    login = sessionStorage.getItem("login");
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    strong = document.createElement("strong");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    
    padre = document.querySelector("body");
    
    div1.setAttribute("class","fondo");
    div2.setAttribute("class","mensaje");
    div3.setAttribute("class","botones boton");
    div3.setAttribute("onclick","borrarCapa()")
    div3.textContent = "Cerrar ventana";
    
    strong.textContent = "Bienvenido "+login;
    
    padre.appendChild(div1).appendChild(div2);
    div2.appendChild(p1).appendChild(strong);
    div2.appendChild(p2)
    div2.appendChild(div3);
}

function mostrarMensajeLoginerror()
{
    console.log("Pasa por mostrarMensajeerror");
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    strong = document.createElement("strong");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    
    padre = document.querySelector("body");
    
    div1.setAttribute("id","fondo");
    div2.setAttribute("id","mensaje");
    div3.setAttribute("class","botones boton");
    div3.setAttribute("onclick","borrarCapa2()")
    div3.textContent = "Cerrar";
    
    strong.textContent = "Datos incorrectos";
    
    padre.appendChild(div1).appendChild(div2);
    div2.appendChild(p1).appendChild(strong);
    div2.appendChild(p2)
    div2.appendChild(div3);
}
function borrarCapa()
{
    window.location.href = 'index.html';
}
function borrarCapa2()
{
    window.location.href = 'login.html';
}
//LOGOUT
function logout(){
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        sessionStorage.removeItem("login");
        sessionStorage.removeItem("clave");
        sessionStorage.removeItem("foto");
        sessionStorage.removeItem("nombre");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("ultima");
        alert("Has cerrado sesion");
        window.location.href='index.html';
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}
//PETICIONES GET
function crearObjAjax(){
    var xmlhttp;
    if(window.XMLHttpRequest) { // Objeto nativo
        xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
    }else if(window.ActiveXObject){ // IE(Windows): objectoActiveX
        xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
var obj;
function peticionAJAX_GET(url,funcion) {

    obj= crearObjAjax();

    if(obj) { // Si se ha creado el objeto, se completa la petición ...
        obj.onreadystatechange= funcion; // función callback: procesarCambio
        obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
        obj.send(); // Se envía la petición
    }
}
var obj2;
function peticionAJAX_GET2(url,funcion) {

    obj2= crearObjAjax();

    if(obj2) { // Si se ha creado el objeto, se completa la petición ...
        obj2.onreadystatechange= funcion; // función callback: procesarCambio
        obj2.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
        obj2.send(); // Se envía la petición
    }
}
//INDEX
function ajaxindex(){
    peticionAJAX_GET("http://localhost:8080/ph2/Practica3/rest/clasificacion/?c=10",clasificacion);
}
function clasificacion(){
    if(obj.readyState== 4){ 
        if(obj.status== 200){ 
            var clasificacion=window.JSON.parse(obj.responseText);
             var tabla=document.getElementById("tabla");
              for(i=0;i<parseInt(clasificacion.FILAS.length);i++){
                var fila=document.createElement("tr");
                var porcentaje=parseInt(clasificacion.FILAS[i].GANADAS)/parseInt(clasificacion.FILAS[i].JUGADAS);
                fila.innerHTML="<td>"+clasificacion.FILAS[i].LOGIN+"</td><td>"+clasificacion.FILAS[i].JUGADAS+"</td><td>"+clasificacion.FILAS[i].GANADAS+"</td><td>"+porcentaje.toFixed(2)+"</td>";
                tabla.appendChild(fila);

            }
        }
    }
}
//LOGIN
function ajaxFormularioLogin(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica3/flogin.html",cargaf);
     console.log("aaaa");
}
function cargaf(){
    if(obj2.readyState== 4){ 
        if(obj2.status== 200){ 
            var formulario=obj2.responseText;
            var body=document.getElementById("body");
            var div=document.createElement("div");
            div.innerHTML=formulario;
            body.appendChild(div);
        }
     }       
}
function ajaxFormularioRegistro(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica3/fregistro.html",cargaf);
     console.log("aaaa");
}
function rellenar(){
    //alert("rellena");
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        var menu = document.getElementById("botones");//Accedo al menú mediante el DOM
        if(sessionStorage.getItem("login")){

            //LOGOUT
            li = document.createElement("li");
            li.innerHTML = "<button onclick='logout();'> <i class='icon-logout'></i>Cerrar Sesión</button>";
            menu.appendChild(li);
            li = document.createElement("li");
            li.innerHTML = "<button onclick='juego();'> <i class='icon-paper-plane'></i>Jugar</button>";
            menu.appendChild(li);
            
        }else{
            //REGISTRO
            li = document.createElement("li");
            li.innerHTML = "<button onclick='ajaxFormularioRegistro();'><i class='icon-user'></i>Registro</button>";
            menu.appendChild(li);
            //LOGIN
            //alert("login lo croe si o si");
            var li = document.createElement("li");
            li.innerHTML = "<button onclick='ajaxFormularioLogin();'><i class='icon-login'></i>Login</button>";
            menu.appendChild(li);
           
        }
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}
function juego(){
    window.location.href='juego.html';
}



    