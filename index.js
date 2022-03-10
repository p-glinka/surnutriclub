// constantes que utiliza todo el codigo del paquete que instalamos

const express = require("express");
const app = express();
const Port = 9000 || 8080;
const path = require("path"); 
const hbs = require("hbs");  
// traigo la libreria para la conexion
const mysql = require("mysql2"); 

// Creo la coneccion
const conexion = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"m32hh1100",
    database: "surnutriclubDB"
});

// conecto a la base de datos

 conexion.connect((error) =>{
    if(error) throw error;
    console.log("conexion a la Base de Datos Exitosa") 
});  


// Middelware : Funciones que realizan una tarea especifica en el Servidor
app.use(express.json());         
app.use(express.urlencoded({extended:false}));   
app.use(express.static (path.join(__dirname,"public")));       
// configuracion del motor de plantillas        
app.set("view engine", "hbs");    
app.set("views", path.join(__dirname,"views")); 
hbs.registerPartials(path.join(__dirname,"views/partials"));

// Rutas HTTP

app.get("/", (req, res) =>{
    res.render("index", {titulo: "Home"})
});   

app.get("/formulario", (req, res) =>{
    res.render("formulario", {titulo: "formulario para completar"})
}); 

app.get("/productos", (req, res) =>{
    res.render("productos", {titulo: "Productos"})
});  

/*res.json({
        Dato: "recibido"   
    });*/
    //Desestructuro las Variables

app.post("/formulario", (req, res) =>{ 
const { nombre, apellido,mail } = req.body
    if(nombre =="" || apellido == "" || mail == ""){
        let validacion = "Faltan datos para registrarte"
        res.render("formulario", {
        titulo: "Completa el formulario ", validacion
    } );
}else{
    console.log(nombre);
    console.log(apellido);
    console.log(mail);
    res.render("index",{
        titulo: "index,"
    })
}
}) 

app.get("/sobrenosotros", (req, res) =>{
    res.render("sobrenosotros", {titulo: "Sobre Nosotros "})
}); 



app.listen(Port, () =>{
    console.log("el servidor esta trabajando en el puerto ${Port}" + Port ) ;
});
app.on("error", (err) =>{
    console.log("Error en la ejecucion del servidor ${error}");
});