function myFunction(){
   document.getElementById("demo").innerHTML = "Esta definida cojones!.";
}
function myLogin(){
    if(window.localStorage){ // Se comprueba si hay soporte para Web Storage
        var frm= document.querySelectorAll("form")[0];
        localStorage.setItem("login", frm.login.value);
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var f=new Date();
        alert(f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
        //location.href="index.html";
    }
    else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}
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

                    var nombre = respuesta.split(",");
                    nombre = nombre[4];
                    var nombre2 = nombre.split(":");
                    var nombre3 = nombre2[1].split("\"");
                    sessionStorage.setItem("nombre", nombre3[1]);

                    var email = respuesta.split(",");
                    email = email[5];
                    var email2 = email.split(":");
                    var email3 = email2[1].split("\"");
                    sessionStorage.setItem("email", email3[1]);

                    var ultima = respuesta.split(",");
                    ultima = ultima[6];
                    var ultima2 = ultima.split("\"");
                    sessionStorage.setItem("ultima", ultima2[3]);

                    var foto = respuesta.split(",");
                    foto = foto[7];
                    var foto2 = foto.split(":");
                    var foto3 = foto2[1].split("\"");
                    sessionStorage.setItem("foto", foto3[1]);
                    
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
    
    div1.setAttribute("id","fondo");
    div2.setAttribute("id","mensaje");
    div2.setAttribute("class","rotar");
    div3.setAttribute("class","botones boton");
    div3.setAttribute("onclick","borrarCapa()")
    div3.textContent = "Cerrar ventana";
    
    strong.textContent = "Bienvenido "+login+" su ultima conexion fue el "+ultima;
    
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
function rellenar(){
    //alert("rellena");
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        var menu = document.getElementById("menu-nav");//Accedo al menú mediante el DOM
        if(sessionStorage.getItem("login")){
             //PERFIL
            li = document.createElement("li");
            li.innerHTML = "<a href='registro.html'> <i class='icon-user'></i>Perfil</a>";
            menu.appendChild(li);
            //CREAR VIAJE
            var li = document.createElement("li");
            li.innerHTML = "<a href='crear_viaje.html'><i class='icon-plus'</i>Crear viaje</a>";
            menu.appendChild(li);
            //LOGOUT
            li = document.createElement("li");
            li.innerHTML = "<a href='' onclick='logout();'> <i class='icon-logout'></i>Cerrar Sesión</a>";
            menu.appendChild(li);
           
            
        }else{
            //REGISTRO
            li = document.createElement("li");
            li.innerHTML = "<a href='registro.html' class='icon-user-add'>Registro</a>";
            menu.appendChild(li);
            //LOGIN
            //alert("login lo croe si o si");
            var li = document.createElement("li");
            li.innerHTML = "<a href='login.html' class='icon-login'>Login</a>";
            menu.appendChild(li);
           
        }
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}



function logout(){
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        sessionStorage.removeItem("login");
        sessionStorage.removeItem("clave");
        sessionStorage.removeItem("foto");
        sessionStorage.removeItem("nombre");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("ultima");
        alert("Has cerrado sesion");
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}

function check(){
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        if(sessionStorage.getItem("login")){ // Si hay datos en loginStorage...
            window.location = "index.html";
        }
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}

function check2(){
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        if(!sessionStorage.getItem("login")){ // Si hay datos en loginStorage...
            window.location = "index.html";
        }
    }else{
        alert("Hola, tu navegador no soporta Web Storage");
    }
}

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
var obj3;
function peticionAJAX_GET3(url,funcion) {

    obj3= crearObjAjax();

    if(obj3) { // Si se ha creado el objeto, se completa la petición ...
        obj3.onreadystatechange= funcion; // función callback: procesarCambio
        obj3.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
        obj3.send(); // Se envía la petición
    }
}
function procesarIndex(){
    if(obj.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
        //alert("procesar");
        if(obj.status== 200){ // El valor 200 significa "OK"
        // Aquí se procesa lo que se haya devuelto:
            var viajes=window.JSON.parse(obj.responseText);
            var sectionviajes=document.getElementById("fotos");
            var inserta;
            sectionviajes.innerHTML="<h1>Últimos 6 viajes<h1>";
            console.log(viajes)
            for(i=0;i<parseInt(viajes.TOTAL_COINCIDENCIAS);i++){
                var div_box=document.createElement("div");
                div_box.className="floating-box";
                inserta="<h2><a href='viaje.html?id="+viajes.FILAS[i].ID+"'>"+viajes.FILAS[i].NOMBRE+"</a></h2><figure><img  class='image' src='fotos/"+viajes.FILAS[i].ID+"/"+viajes.FILAS[i].FOTO+"' alt='Paisaje Natural' /><figcaption class='imagetext'>"+viajes.FILAS[i].DESCRIPCION+"<a href='viaje.html?id="+viajes.FILAS[i].ID+"'> ver más...</a></figcaption></figure><ul><li>Autor:"+viajes.FILAS[i].LOGIN+"</li><li>Fecha:"+viajes.FILAS[i].FECHA_INICIO+"</li>";
                if(parseInt(viajes.FILAS[i].VALORACION)==1)
                   inserta+="<li><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==2)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==3)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==4)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==5)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></li></ul>"
                div_box.innerHTML=inserta;
                sectionviajes.appendChild(div_box);
            }
        } else alert("Hubo un problema con los datos devueltos"); // ERROR
    }
}
function IndexComentarios(){
    //alert("peee");
    if(obj2.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
        if(obj2.status== 200){ // El valor 200 significa "OK"
        // Aquí se procesa lo que se haya devuelto:
            var comentarios=window.JSON.parse(obj2.responseText);
            //alert(obj.responseText);
            var sectioncomentarios=document.getElementById("comentarios");
            sectioncomentarios.innerHTML="<h1>Últimos 10 comentarios<h1>";
            for(i=0;i<comentarios.FILAS.length;i++){
            var ulcomentarios=document.createElement("li");
            ulcomentarios.innerHTML="<div class='comment-main-level'><div class='comment-avatar'><img src='fotos/usu/"+comentarios.FILAS[i].LOGIN+".jpg' alt='foto perfil'></div><div class='comment-box'><div class='comment-head'><h6 class='comment-name'><a href='viaje.html?id="+comentarios.FILAS[i].ID_VIAJE+"&idcom="+comentarios.FILAS[i].ID+"'><span>"+comentarios.FILAS[i].TITULO+" - </span> "+comentarios.FILAS[i].LOGIN+"</a></h6><span><time datetime='"+comentarios.FILAS[i].FECHAHORA+"'>"+comentarios.FILAS[i].FECHAHORA+"</time></span></div><div class='comment-content' >"+comentarios.FILAS[i].TEXTO+"</div></div></div>";
            sectioncomentarios.appendChild(ulcomentarios);
            }
        } else alert("Hubo un problema con los datos devueltos"); // ERROR
    }
}
function infoViajes(){
    if(obj3.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
        if(obj3.status== 200){ // El valor 200 significa "OK"
        // Aquí se procesa lo que se haya devuelto:
            var viajes=window.JSON.parse(obj3.responseText);
            var section=document.getElementById("viaje");
            var ulviaje=document.createElement("ul");
            var inserta;
            var fechaini=viajes.FILAS[0].FECHA_INICIO.split(" ",1);
            var fechafin=viajes.FILAS[0].FECHA_FIN.split(" ",1);

            inserta=" <li><span>Autor: </span> "+viajes.FILAS[0].LOGIN+"</li><li ><span>Desde: </span> "+fechaini+" <span>Hasta: </span> "+fechafin+"</li>";
            
            if(parseInt(viajes.FILAS[0].VALORACION)==1)
                   inserta+="<li><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[0].VALORACION)==2)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[0].VALORACION)==3)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[0].VALORACION)==4)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[0].VALORACION)==5)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></li></ul>"

            inserta+="<li>"+viajes.FILAS[0].DESCRIPCION+"</li>"
            ulviaje.innerHTML=inserta;
            section.appendChild(ulviaje);
        }
    }
    
}
function fotosViajes(){
    if(obj.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
            if(obj.status== 200){ // El valor 200 significa "OK"
            // Aquí se procesa lo que se haya devuelto:
                var fotos_viaje=window.JSON.parse(obj.responseText);
                console.log(fotos_viaje)
                var section= document.querySelectorAll("section")[0];
            for(i=0;i<fotos_viaje.FILAS.length;i++){
                var divfotos=document.createElement("div");
                divfotos.className="floating-box";
                var fecha=fotos_viaje.FILAS[i].FECHA.split(" ",1);
                divfotos.innerHTML="<img src='fotos/"+fotos_viaje.FILAS[i].ID_VIAJE+"/"+fotos_viaje.FILAS[i].FICHERO+"' alt='Paisaje Natural'/><ul><li ><span>Fecha: </span> "+fecha+"</li><li ><span>Descripción foto: </span> "+fotos_viaje.FILAS[i].DESCRIPCION+"</li></ul>";
                section.appendChild(divfotos);
                }
            }
        }
}
function comViajes(){
    if(obj2.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
            if(obj2.status== 200){ // El valor 200 significa "OK"
            // Aquí se procesa lo que se haya devuelto:
                var comentarios=window.JSON.parse(obj2.responseText);
                var sectioncomentarios=document.getElementById("comentarios");
                comentarios.FILAS.reverse();
            for(i=0;i<comentarios.FILAS.length;i++){//Para cada comentario
            titulo=comentarios.FILAS[i].TITULO.split(" ");
                if(titulo[0]=="Re:"){
                    titulo=comentarios.FILAS[i].TITULO.split(": ",2);
                    console.log(titulo[1]);
                    var comentariogrande=document.getElementById(titulo[1]);
                    var ulcomentarios=document.createElement("ul");
                    ulcomentarios.className="comments-list reply-list";
                    ulcomentarios.name=comentarios.FILAS[i].ID;
                    ulcomentarios.innerHTML="<li><div class='comment-avatar'><img src='fotos/usu/"+comentarios.FILAS[i].LOGIN+".jpg' alt='foto perfil'></div><div class='comment-box'><div class='comment-head'><h6 class='comment-name'><span>"+comentarios.FILAS[i].TITULO+" - </span> "+comentarios.FILAS[i].LOGIN+"</h6><span><time datetime='"+comentarios.FILAS[i].FECHAHORA+"'>"+comentarios.FILAS[i].FECHAHORA+"</time></span></div><div class='comment-content' >"+comentarios.FILAS[i].TEXTO+"</div></div></li>";
                    comentariogrande.appendChild(ulcomentarios);
                }
                else{
                    var ulcomentarios=document.createElement("li");
                    var div=document.createElement("div");
                    div.setAttribute("id",comentarios.FILAS[i].ID);
                    ulcomentarios.id=comentarios.FILAS[i].TITULO;
                    ulcomentarios.setAttribute("name", comentarios.FILAS[i].ID);
                    ulcomentarios.innerHTML="<div class='comment-main-level'><div class='comment-avatar'><img src='fotos/usu/"+comentarios.FILAS[i].LOGIN+".jpg' alt='foto perfil'></div><div class='comment-box'><div class='comment-head'><h6 class='comment-name'><a href='viaje.html?id="+comentarios.FILAS[i].ID_VIAJE+"&idcom="+comentarios.FILAS[i].ID+"'><span>"+comentarios.FILAS[i].TITULO+" - </span> "+comentarios.FILAS[i].LOGIN+"</a></h6><span><time datetime='"+comentarios.FILAS[i].FECHAHORA+"'>"+comentarios.FILAS[i].FECHAHORA+"</time></span></div><div class='comment-content' >"+comentarios.FILAS[i].TEXTO+"</div></div></div>";
                    div.innerHTML="<button onclick='responder("+comentarios.FILAS[i].ID+");' class='boton'> Responder </button><input id='oculto"+comentarios.FILAS[i].ID+"' type='text' value='"+comentarios.FILAS[i].TITULO+"' style='display:none;' />";
                    sectioncomentarios.appendChild(ulcomentarios);
                    if(sessionStorage.getItem('login')!=null)
                    sectioncomentarios.appendChild(div);
             }
            }
            var name=gup('idcom');
            if(name!=""){
                var tmpURL = window.location.href;
                if(tmpURL.indexOf('#') == -1){
                URL=tmpURL.split("?");
                window.location.href = URL[0]+"#"+name+"?"+URL[1];
            }
            }
          }
        }
}
function diezViajes(){
    if(obj.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
        //alert("procesar");
        if(obj.status== 200){ // El valor 200 significa "OK"
        // Aquí se procesa lo que se haya devuelto:
            var viajes=window.JSON.parse(obj.responseText);
            var sectionviajes=document.getElementById("fotos");
            var inserta;
            console.log(viajes)
            for(i=0;i<parseInt(viajes.TOTAL_COINCIDENCIAS);i++){
                var div_box=document.createElement("div");
                div_box.className="floating-box";
                inserta="<h2><a href='viaje.html?id="+viajes.FILAS[i].ID+"'>"+viajes.FILAS[i].NOMBRE+"</a></h2><figure><img  class='image' src='fotos/"+viajes.FILAS[i].ID+"/"+viajes.FILAS[i].FOTO+"' alt='Paisaje Natural' /><figcaption class='imagetext'>"+viajes.FILAS[i].DESCRIPCION+"<a href='viaje.html?id="+viajes.FILAS[i].ID+"'> ver más...</a></figcaption></figure><ul><li>Autor:"+viajes.FILAS[i].LOGIN+"</li><li>Fecha:"+viajes.FILAS[i].FECHA_INICIO+"</li>";
                if(parseInt(viajes.FILAS[i].VALORACION)==1)
                   inserta+="<li><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==2)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==3)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==4)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==5)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></li></ul>"
                div_box.innerHTML=inserta;
                sectionviajes.appendChild(div_box);
            }
        } else alert("Hubo un problema con los datos devueltos"); // ERROR
    }

}
function busquedaviaje(){
    
    // VER CAMPOS DEL FORMULARIO
    
    form = document.getElementById("fbusqueda");
    var titulo, descripcion, autor, valoracion, valoracion2, fecha1, fecha2;
    var viaje = "rest/viaje/?";
    var primer = true;
    if(document.getElementById("general")!=null){
        titulo = document.getElementById("general").value;
        viaje = viaje+"bt="+titulo;
    }
    else{
    if(document.getElementById("title").value.match(/\S/))   
    {
        titulo = document.getElementById("title").value;
        viaje = viaje+"n="+titulo;
        primer = false;
    }
    
    if(document.getElementById("description").value.match(/\S/))   
    {
        descripcion = document.getElementById("description").value;     
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"d="+descripcion;
        primer = false;
    }
     if(document.getElementById("since").value.match(/\S/))   
    {
        fecha1 = document.getElementById("since").value;       
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"fi="+fecha1;
        primer = false;
        
    }
    if(document.getElementById("until").value.match(/\S/)){
        fecha2 = document.getElementById("until").value;       
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"ff="+fecha1;
        primer = false;

    }
    
        valoracion = document.getElementById("desde").value;       
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"vi="+valoracion;
        primer = false; 

        valoracion = document.getElementById("hasta").value;       
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"vf="+valoracion;
        primer = false;


    if(document.getElementById("autor").value.match(/\S/))   
    {
        autor = document.getElementById("autor").value;     
        if(primer==false) viaje = viaje+"&";        
        viaje = viaje+"l="+autor;
        primer = false;
    }
}
    
    args=viaje+"&pag=0&lpag=3";
    console.log("Viaje: "+viaje);
    
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj) 
       {
         url=args;
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function()
          {
              if (obj.readyState==4){
                if(obj.status==200)
                {
                   var viajes=window.JSON.parse(obj.responseText);
                   console.log(viajes);
                   // BORRAR CAJAS ANTERIORES SI YA ESTABAN CREADAS                
                    figures = document.getElementById('resultado').querySelectorAll('div');
                    if(figures.length==0)
                        {       
                            //NADA
                        }
                    else
                        {                                                       
                            for(i=0;i<figures.length;i++)
                            {
                                figures[i].parentNode.removeChild(figures[i]);
                            }           
                        }   
            //PAGINACION
            var paginas_totales=Math.ceil(viajes.TOTAL_COINCIDENCIAS/3);
            paginas_totales=paginas_totales-1;
            //PRIMERA
            var primera=viaje+"&pag=0&lpag=3";
            //SEGUNDA
            if(parseInt(viajes.PAGINA)<paginas_totales){
                var mas=parseInt(viajes.PAGINA+1);
                console.log(mas);
                var siguiente=viaje+"&pag="+mas+"&lpag=3";
            }
            else
                var siguiente=primera;
            //TERCERA
            var ultima=viaje+"&pag="+paginas_totales+"&lpag=3";
            //CUARTA
            if(parseInt(viajes.PAGINA)>0){
                var menos=parseInt(viajes.PAGINA-1);
                var anterior=viaje+"&pag="+menos+"&lpag=3";
            }
            else
                anterior=primera;

                   // INTRODUCIR CAJAS NUEVAS                  
                        
            var sectionviajes=document.getElementById("resultado");
            sectionviajes.innerHTML="<h1>Resultado de la búsqueda<h1>";
            var inserta;
            for(i=0;i<viajes.FILAS.length;i++){
                var div_box=document.createElement("div");
                div_box.className="floating-box";
                inserta="<h2><a href='viaje.html?id="+viajes.FILAS[i].ID+"'>"+viajes.FILAS[i].NOMBRE+"</a></h2><figure><img  class='image' src='fotos/"+viajes.FILAS[i].ID+"/"+viajes.FILAS[i].FOTO+"' alt='Paisaje Natural' /><figcaption class='imagetext'>"+viajes.FILAS[i].DESCRIPCION+"<a href='viaje.html?id="+viajes.FILAS[i].ID+"'> ver más...</a></figcaption></figure><ul><li>Autor:"+viajes.FILAS[i].LOGIN+"</li><li>Fecha:"+viajes.FILAS[i].FECHA_INICIO+"</li>";
                if(parseInt(viajes.FILAS[i].VALORACION)==1)
                   inserta+="<li><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==2)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==3)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==4)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==5)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></li></ul>"
                div_box.innerHTML=inserta;
                sectionviajes.appendChild(div_box);
            }
            var ul=document.createElement("ul");
            ul.innerHTML="<li class='enlinea'><button onclick='elegir(\""+primera+"\")'>Primera</button></li><li class='enlinea'><button onclick='elegir(\""+siguiente+"\")'>Siguiente</button></li><li class='enlinea'><button onclick='elegir(\""+anterior+"\")'>Anterior</button></li><li class='enlinea'><button onclick='elegir(\""+ultima+"\")' >Última</button></li>"
            var div=document.createElement("div");
            div.innerHTML="<p>Página "+viajes.PAGINA+" de "+paginas_totales+".</p>"
            sectionviajes.appendChild(ul);
            sectionviajes.appendChild(div);
        }
        }
    }
         obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición         
       }
}
function elegir(elegido){
    console.log(elegido);
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj) 
       {
         url=elegido;
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function()
          {
              if (obj.readyState==4){
                if(obj.status==200)
                {
                    var viajes=window.JSON.parse(obj.responseText);
                   console.log(viajes);
            viaje=elegido.split("&pag",1);
            //PAGINACION
            var paginas_totales=Math.ceil(viajes.TOTAL_COINCIDENCIAS/3);
            paginas_totales=paginas_totales-1;
            //PRIMERA
            var primera=viaje+"&pag=0&lpag=3";
            //SEGUNDA
            if(parseInt(viajes.PAGINA)<paginas_totales){
                var mas=parseInt(viajes.PAGINA+1);
                console.log(mas);
                var siguiente=viaje+"&pag="+mas+"&lpag=3";
            }
            else
                var siguiente=primera;
            //TERCERA
            var ultima=viaje+"&pag="+paginas_totales+"&lpag=3";
            //CUARTA
            if(parseInt(viajes.PAGINA)>0){
                var menos=parseInt(viajes.PAGINA-1);
                var anterior=viaje+"&pag="+menos+"&lpag=3";
            }
            else
                anterior=primera;

                   // BORRAR CAJAS ANTERIORES SI YA ESTABAN CREADAS                
                    figures = document.getElementById('resultado').querySelectorAll('div');
                    if(figures.length==0)
                        {       
                            //NADA
                        }
                    else
                        {                                                       
                            for(i=0;i<figures.length;i++)
                            {
                                figures[i].parentNode.removeChild(figures[i]);
                            }           
                        } 
                        

                             // INTRODUCIR CAJAS NUEVAS                  
                        
            var sectionviajes=document.getElementById("resultado");
            sectionviajes.innerHTML="<h1>Resultado de la búsqueda<h1>";
            var inserta;
            for(i=0;i<viajes.FILAS.length;i++){
                var div_box=document.createElement("div");
                div_box.className="floating-box";
                inserta="<h2><a href='viaje.html?id="+viajes.FILAS[i].ID+"'>"+viajes.FILAS[i].NOMBRE+"</a></h2><figure><img  class='image' src='fotos/"+viajes.FILAS[i].ID+"/"+viajes.FILAS[i].FOTO+"' alt='Paisaje Natural' /><figcaption class='imagetext'>"+viajes.FILAS[i].DESCRIPCION+"<a href='viaje.html?id="+viajes.FILAS[i].ID+"'> ver más...</a></figcaption></figure><ul><li>Autor:"+viajes.FILAS[i].LOGIN+"</li><li>Fecha:"+viajes.FILAS[i].FECHA_INICIO+"</li>";
                if(parseInt(viajes.FILAS[i].VALORACION)==1)
                   inserta+="<li><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==2)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==3)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==4)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9734</span></li></ul>"
                if(parseInt(viajes.FILAS[i].VALORACION)==5)
                    inserta+="<li><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span><span>&#9733</span></li></ul>"
                div_box.innerHTML=inserta;
                sectionviajes.appendChild(div_box);
            }
            var ul=document.createElement("ul");
            ul.innerHTML="<li class='enlinea'><button onclick='elegir(\""+primera+"\")'>Primera</button></li><li class='enlinea'><button onclick='elegir(\""+siguiente+"\")'>Siguiente</button></li><li class='enlinea'><button onclick='elegir(\""+anterior+"\")'>Anterior</button></li><li class='enlinea'><button onclick='elegir(\""+ultima+"\")' >Última</button></li>"
            var div=document.createElement("div");
            div.innerHTML="<p>Página "+viajes.PAGINA+" de "+paginas_totales+".</p>"
            sectionviajes.appendChild(ul);
            sectionviajes.appendChild(div);     
                }
            }
        }
          obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición  
    }
}
function cargaf(){
    if(obj2.readyState== 4){ // valor 4: respuesta recibida y lista para ser procesada
        //alert("procesar");
        if(obj2.status== 200){ // El valor 200 significa "OK"
        // Aquí se procesa lo que se haya devuelto:
    figures = document.getElementById('busqueda').querySelectorAll('fieldset');
     if(figures.length!=0){                                                      
        figures[0].parentNode.removeChild(figures[0]);
    } 

            var formulario=obj2.responseText;
            var sectionf=document.getElementById("busqueda");
            var fieldset=document.createElement("fieldset");
            fieldset.innerHTML=formulario;
            sectionf.appendChild(fieldset);
        }
     }       
}
function ajaxindex(){
    peticionAJAX_GET("http://localhost:8080/ph2/Practica2/rest/get/viaje.php?prm=&u=6",procesarIndex);
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/rest/get/comentario.php?prm=&u=10",IndexComentarios);
}
function ajaxindexComentarios(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/rest/get/comentario.php?prm=&u=10",IndexComentarios);
}
function ajaxViaje(){
    var id=gup('id');
    if(id==""){
         window.location = "index.html";
    }
    else{
    peticionAJAX_GET3("http://localhost:8080/ph2/Practica2/rest/viaje/"+id,infoViajes);
    peticionAJAX_GET("http://localhost:8080/ph2/Practica2/rest/foto/?id_viaje="+id,fotosViajes);
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/rest/comentario/?id_viaje="+id,comViajes);
    }
}
function ajaxDiez(){
    peticionAJAX_GET("http://localhost:8080/ph2/Practica2/rest/viaje/?u=10",diezViajes);
}
function ajaxFormulario(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/fbusqueda.html",cargaf);
}
function ajaxFormularioA(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/fbusqueda_avanzada.html",cargaf);
}
function ajaxFormularioR(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/fregistro.html",cargaf);
}
function ajaxFormularioRa(){
    peticionAJAX_GET2("http://localhost:8080/ph2/Practica2/fperfil.html",cargaf);
}

function aparcao() {
    if(window.sessionStorage){ // Se comprueba si hay soporte para Web Storage
        if(sessionStorage.getItem("login")){
  var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj) 
       {
         url='http://localhost:8080/ph2/Practica2/fcomentario.html';
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function()
          {
              if (obj.readyState==4){
                if(obj.status==200)
                {
                   var respuesta = obj.responseText;
                   var comentarios=document.getElementById("comentario");
                   var fieldset=document.createElement("fieldset");
                   fieldset.innerHTML=respuesta;
                   comentarios.appendChild(fieldset);
                }
             }
        }
         obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición
        }   
    }
}
}
  function gup(name){
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp ( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}
var numero=1;
//CREAR VIAJE
function meterFoto(){
    var ul = document.getElementById("crear_viaje");
     li = document.createElement("li");
     li.id="foto"+numero;
     li.innerHTML ="<label style='float:unset;width:unset;'' for='inpFoto"+numero+"' ><img src='images/sinfoto.png' alt='foto del viaje' id='img"+numero+"'></label><textarea placeholder='Descripción de la foto' required></textarea><label id='label"+numero+"' class='botona' for='inpFoto"+numero+"'>Seleccionar foto</label><input class='inputfile' type='file' onchange='mostrarFoto("+numero+")' id='inpFoto"+numero+"'></input><button class='botonr' type='button' onclick='borrarFoto("+numero+")'>Eliminar foto</button> </li>"
     numero++;
    ul.appendChild(li);
}
function mostrarFoto(id){
    var fr = new FileReader(),
        foto = document.getElementById('inpFoto'+id).files[0];
        if(foto.size<2097152){
            fr.onload=function(){
                document.getElementById('img'+id).src=fr.result;
            } 
            //if(foto)   
            fr.readAsDataURL( foto );
            document.getElementById('foto'+id).style.border="unset";
            document.getElementById('label'+id).style.display="none";
        }
        else{
            fr.onload=function(){
                document.getElementById('img'+id).src="";
                document.getElementById('img'+id).alt="imagen demasiado grande";
            } 
            //if(foto)   
            fr.readAsDataURL( foto );
            document.getElementById('foto'+id).style.border="0.5em solid #b03535";
        }
     
}
function borrarFoto(id){
    var foto = document.getElementById("foto"+id);
foto.parentNode.removeChild(foto);
}

//REGISTRO!!
function comprobarPassRegistro()
{
    console.log("Pasa por ComprobarPassRegistro");
    
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    var mensaje;
    var p = document.createElement("p");
    var disponible; 
    
    if(document.getElementById("infousu2"))
      {
        document.getElementById("infousu2").parentNode.removeChild(document.getElementById("infousu2"));
      }
    
    if(pass != pass2)
    {
        mensaje = "Las contrasenyas no coinciden";          
        p.setAttribute("id","infousu2");
        p.textContent = mensaje;
        document.getElementById("capapass").appendChild(p);
        p.style.opacity = 0;
        p.style.color="red";        
        p.style.transition = "opacity 2s";
        p.style.opacity = 1;
        disponible=false;
    }
    else{
        disponible=true;
    }
    return disponible;
}

function registro(){
    console.log("Pasa por Registro");
    var login = document.getElementById("usuario").value;
    var pwd = document.getElementById("pass").value;
    var pwd2 = document.getElementById("pass2").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var foto = document.getElementById("foto").files[0];
    args = "login="+login+"&pwd="+pwd+"&pwd2="+pwd2+"&nombre="+nombre+"&email="+email+"&foto="+foto;

    if(sessionStorage.getItem("clave")!=null){
        var clave=sessionStorage.getItem("clave");
        args = "login="+login+"&clave="+clave+"&pwd="+pwd+"&pwd2="+pwd2+"&nombre="+nombre+"&email="+email+"&foto="+foto;
    }

    
    
    console.log("Argumentos registro: "+args);
    var disponibleP=comprobarPassRegistro();
    if(foto!=null){
    if(disponibleP && foto.size<5000000){
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj){
         url="rest/usuario/";
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function(){
              if (obj.readyState==4 && obj.status==200){
                   //obj.responseText;
                   var respuesta = obj.responseText;
                   console.log("Respuesta Registro: "+respuesta);
                   mostrarMensajeRegistro();
                }
          }    
         obj.open("POST", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         obj.send(args); // Se envía la petición         
       }
   }
   else{
    alert("Comprueba que los campos login y contraseña este escritos correctamente y que la foto no es demasiado grande");
   }
}
}
/*function registro(frm){
var formData=new FormData(frm);
obj2=crearObjAjax();
if(obj2){
    var url="rest/usuario/";
    onreadystatechange=mostrarMensajeRegistro;
    obj2.open("POST",url,true);
    obj2.send(formData);
}
}*/
function initRegistro()
{
    console.log("Pasa por initRegistro");
    comprobarLogin();
}

function mostrarMensajeRegistro()
{
    console.log("Pasa por mostrarMensajeRegistro");
    // MOSTRAR CAPA
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    strong = document.createElement("strong");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    
    padre = document.querySelector("header");
    
    div1.setAttribute("id","fondo");
    div2.setAttribute("id","mensaje");
    div2.setAttribute("class","rotar");
    div3.setAttribute("class","botones boton");
    div3.setAttribute("onclick","borrarCapaRegistro()");
    div3.textContent = "Cerrar ventana";
    
    strong.textContent = "Usuario creado correctamente";
    
    padre.appendChild(div1).appendChild(div2);
    div2.appendChild(p1).appendChild(strong);
    div2.appendChild(p2)
    div2.appendChild(div3);
}

function borrarCapaRegistro()
{
    console.log("Pasa por BorrarCapaInfoRegistro");
    window.location.href = 'login.html';
}
function loginDisponible()
{
     console.log("Pasa por LoginDisponible");    
     var disponible;
     var login = document.getElementById("usuario").value;
     var obj; // variable que guarda el objeto XMLHttpRequest   
     obj = crearObjAjax();
     if(obj) 
       {
         url="rest/login/"+login;
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function()
          {
              if (obj.readyState==4 && obj.status==200)
                {
                   var respuesta = window.JSON.parse(obj.responseText);
                   console.log("RespuestaLoginDisponible: "+respuesta.DISPONIBLE);
                   var res = respuesta.DISPONIBLE;
                   var mensaje;     
                   var p = document.createElement("p");
                   if(res=="false")
                   {
                        mensaje = "Nombre de usuario no disponible";
                        p.style.color="red";
                        disponible = false;
                   } 
                   if(res=="true"){
                        disponible=true;
                   }
                   if(document.getElementById("infousu"))
                   {
                      document.getElementById("infousu").parentNode.removeChild(document.getElementById("infousu"));
                   }
                       p.setAttribute("id","infousu");
                       p.textContent = mensaje;
                       document.getElementById("capausuario").appendChild(p);              
                }
          }    
         obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.send(); // Se envía la petición         
       }
       return disponible;
}
function comprobarLogin()
{
    console.log("Pasa por comprobarLogin");
    var login = sessionStorage.getItem("login");
    if(login!=null) // SI Hay login
      {     
        ajaxFormularioRa();
        window.setTimeout(muestraDatos,50);
      }
      else{
        ajaxFormularioR();
      }
}
function muestraDatos(){
    var login = sessionStorage.getItem("login");
    var pass = sessionStorage.getItem("pass");
    var nombre = sessionStorage.getItem("nombre");
    var email = sessionStorage.getItem("email");
    var foto = sessionStorage.getItem("foto");

     document.getElementById('usuario').setAttribute("value", login);
      document.getElementById('usuario').disabled = true;
      document.getElementById('pass').required=false;
      document.getElementById('pass2').required=false;
      document.getElementById('nombre').setAttribute("value", nombre);
      document.getElementById('email').setAttribute("value", email);
      document.getElementById('foto').setAttribute("input", foto);
}
function mostrarFotoR(){
    var fr = new FileReader(),
        foto = document.getElementById('foto').files[0];
        document.getElementById('mostrarfoto').style.width="15em";
        if(foto.size<5000000){
            fr.onload=function(){
                document.getElementById('mostrarfoto').src=fr.result;
            }   
            fr.readAsDataURL( foto );
            document.getElementById('mostrarfoto').style.border="unset";
        }
        else{
            fr.onload=function(){
                document.getElementById('mostrarfoto').src="";
                document.getElementById('mostrarfoto').alt="imagen demasiado grande";
                document.getElementById('mostrarfoto').style.float="left";
            } 
            //if(foto)   
            fr.readAsDataURL( foto );
            document.getElementById('mostrarfoto').style.border="0.5em solid #b03535";
        }
     
}
function comentar(){
        console.log("Pasa por comentar");
    var login = sessionStorage.getItem('login');
    var clave = sessionStorage.getItem('clave');
    var texto = document.getElementById("texto").value;
    var titulo = document.getElementById("titulo").value;
    

    var id_viaje=gup('id');

    args = "login="+login+"&clave="+clave+"&titulo="+titulo+"&texto="+texto+"&id_viaje="+id_viaje;
    console.log("Argumentos registro: "+args);
    var obj; // variable que guarda el objeto XMLHttpRequest    
    obj = crearObjAjax();
     if(obj){
         url="rest/comentario/";
         // Se establece la función (callback) a la que llamar cuando cambie el estado:      
         obj.onreadystatechange=function(){
              if (obj.readyState==4 && obj.status==200){
                   //obj.responseText;
                   var respuesta = obj.responseText;
                   console.log("Respuesta Registro: "+respuesta);
                   actualizarcomentarios();
                }
          }    
         obj.open("POST", url, true); // Se crea petición GET a url, asíncrona ("true")
         obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         obj.send(args); // Se envía la petición         
       }
   
   else{
    alert("Va mal");
   }
}
function actualizarcomentarios(){
      console.log("Pasa por mostrarMensajecomentario");
    // MOSTRAR CAPA
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    div3 = document.createElement("div");
    strong = document.createElement("strong");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    
    padre = document.querySelector("header");
    
    div1.setAttribute("id","fondo");
    div2.setAttribute("id","mensaje");
    div2.setAttribute("class","rotar");
    div3.setAttribute("class","botones boton");
    div3.setAttribute("onclick","borrarCapacomentario()");
    div3.textContent = "Cerrar ventana";
    
    strong.textContent = "Comentario creado correctamente";
    
    padre.appendChild(div1).appendChild(div2);
    div2.appendChild(p1).appendChild(strong);
    div2.appendChild(p2)
    div2.appendChild(div3);
}
function borrarCapacomentario(){
    ajaxViaje();
    location.reload();
}
function responder(id){
    console.log("aqui entra locooo");
    div=document.getElementById(id);
    var frm=document.createElement("form");
    frm.setAttribute("onsubmit","comentar(); return false;");
    frm.setAttribute("class","form");
    frm.innerHTML="<div><ul><li><h4>Responder comentario</h4></li> <li><label for='titulo'>Título:</label><input id='titulo' name='titulo' type='text'  value='Re: "+document.getElementById('oculto'+id).value+"' disabled /></li><li><textarea id='texto' placeholder='Tu comentario' autofocus></textarea> </li><li><button class='boton' type='submit'>Comentar</button></li></ul></div>";
    div.appendChild(frm);   


}

