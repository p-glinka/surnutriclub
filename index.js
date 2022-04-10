// constantes que utiliza todo el codigo del paquete que instalamos
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const path = require("path"); 
const hbs = require("hbs");  
const nonemailer =require("nodemailer");
// traigo la libreria para la conexion     
const mysql = require("mysql2");    
const { dirname } = require("path");          

// Creo la configuracion para la coneccion
/* const conexion = mysql.createConnection({    
    host: "localhost",
    port: 3306,           
    user: "root",                         
    password:"m32hh1100",                             
    database: "surnutriclubDB"                                                                        
}); */                                                   
// conecto a la base de datos                                                   
/*conexion.connect((error) =>{                                    
    if(error) throw error;                     
    console.log("Conexion a la Base de Datos Exitosa");                   
}); */                                      
            
// Middelware : Funciones que realizan una tarea especifica en el Servidor   
app.use(express.json());         
app.use(express.urlencoded({extended:false}));     
app.use(express.static(path.join(__dirname,`public`)))   
app.use("/assets", express.static(path.join(__dirname,"public")));
               
            
// configuracion del motor de plantillas                 
app.set("view engine", "hbs");                    
app.set("views", path.join(__dirname,"views"));      
hbs.registerPartials(path.join(__dirname,"views/partials"));     
// Rutas HTTP            
                        
app.get("/", (req, res) =>{             
    res.render("index", {titulo: "Sur Nutri Club"})              
});      
app.get("/formulario", (req, res) =>{   
    res.render("formulario", {titulo: "Completa el Formulario"})  
}); 
app.get("/productos", (req, res) =>{
    res.render("productos", {titulo: "Encontra todos Nuestros Productos"})
});  

app.get("/sobrenosotros", (req, res) =>{
    res.render("sobrenosotros", {titulo: "Conoce Mas Sobre la gente que Trabaja con Nosotros"})
});      

/*res.json({   
        Dato: "recibido"       
    });*/
    //Desestructuro las Variables  
app.post("/formulario", (req, res) =>{ 
const { nombre, apellido, dni, telefono, mail, fechadenacimiento } = req.body
    if(nombre =="" || apellido == "" || mail == ""){
        let validacion = "Faltan datos para registrarte"   
        res.render("formulario", { 
        titulo: "Completa el formulario ", validacion
    } );    
}else{   
    console.log(nombre);   
    console.log(apellido);
    console.log(dni);          
    console.log(telefono);    
    console.log(mail);   
    console.log(fechadenacimiento); 
    let data = {
        nombre: nombre,
        apellido: apellido,        
        dni: dni,     
        telefono: telefono,     
        mail: mail,  
        fechadenacimiento: fechadenacimiento,       
    
    }       
      
    let sql = "insert into usuario set ?";        
    conexion.query(sql, data, (error, results) =>{   
        if(error)throw error;  
    res.render("index", {titulo: "Sur Nutri Club"})
    });   
};       
});
/*conexion.end();*/
    
app.listen(PORT, () =>{
    console.log(`el servidor esta trabajando en el puerto ${PORT}`) ;  
});
app.on("error", (err) =>{
    console.log(`Error en la ejecucion del servidor ${error}`);       
});                     
    