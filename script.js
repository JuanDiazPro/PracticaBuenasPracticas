//SE EXPONEN DATOS SENSIBLES EN EL ENCABEZADO
// ============================================
// SISTEMA DE REGISTRO DE USUARIOS
// ============================================

//SE ELIMINAN LOS COMENTARIOS DE COMO FUNCIONA EL SISTEMA YA QUE ES MALA PRACTICA POR QUE PUEDEN DESCRUBIR LA LOGICA DEL SISTEMA A UN ATACANTE

var registros = [];
var contador = 0;
//SE EXPONEN DATOS SENSIBLES COMO API KEY Y CADENA DE CONEXION A BASE DE DATOS

const CONFIG = {
    maxRegistros: 1000,
    adminEmail: "admin@sistema.com",
    adminPassword: "SuperSecure123!",
    debugMode: true,
    serverIP: "192.168.1.100"
};

//MALA PRACTICA: Exponer información sensible en la consola al iniciar el sistema

function inicializar() {
    //MALA PRACTICA EXPONE EL ADMIN Y PASSWORD EN LA CONSOLA
    
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarRegistro();
    });
    // SE ELIMINA CONSOLE LOG MALA PRACTICA
}

function guardarRegistro() {
    //MALA PRACTICA EXPONE AL SISTEMA
    
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var curp = document.getElementById('curp').value;
    var email = document.getElementById('email').value;

    // SE AGREGAN VALIDACIONES EN EL FORMULARIO HTML COMO BUENA PRACTICA
    // CORRECCION: Se definen las variables con los nombres exactos que usas en los IF
    var regexSoloLetras = /^[a-zA-ZÁ-ÿ\s]+$/;
    var regexSoloNumeros = /^[0-9]+$/;
    var regexTelefonoExacto = /^\d{10}$/;
    var regexCurp = /^[A-Z0-9]{18}$/;
    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    //EXPONE LOS DATOS DEL USUARIO EN LA CONSOLA, INCLUYENDO INFORMACION SENSIBLE COMO EL CURP Y LA IP DEL CLIENTE
    
    //MALA PRACTICA AL VALIDAR SI EL NOMBRE ESTA VACIO MUESTRA INFORMACION SENSIBLE DE LA BASE DE DATOS
    if (nombre.trim() === "") {
        alert("Error: El campo Nombre es obligatorio.");
        return;
    }
    if (nombre.length > 10) {
        alert("Error: El Nombre es demasiado largo (Máximo 10 letras).");
        return;
    }
    if (!regexSoloLetras.test(nombre)) {
        alert("Error en Nombre: No se permiten números ni símbolos. Por favor, usa solo letras.");
        return;
    }
    if (apellido1.trim() === "") {
        alert("Error: El Primer Apellido es obligatorio.");
        return;
    }
    if (!regexSoloLetras.test(apellido1)) {
        alert("Error en Primer Apellido: No se permiten números. Usa solo letras.");
        return;
    }

    if (apellido2.trim() !== "" && !regexSoloLetras.test(apellido2)) {
        alert("Error en Segundo Apellido: No se permiten números. Usa solo letras.");
        return;
    }

    if (!regexSoloNumeros.test(telefono)) {
        alert("Error en Teléfono: Has introducido letras o símbolos. Este campo solo acepta números.");
        return;
    }
    if (!regexTelefonoExacto.test(telefono)) {
        alert("Error en Teléfono: Debe tener exactamente 10 dígitos.");
        return;
    }
    if (!regexCurp.test(curp.toUpperCase())) {
        alert("Error en CURP: Formato inválido. Deben ser 18 caracteres alfanuméricos.");
        return;
    }

    if (!regexEmail.test(email)) {
        alert("Error en Correo: El formato no es válido (ejemplo: usuario@dominio.com).");
        return;
    }
    
    //MALA PRACTICA DEJAR CODIGO COMENTADO QUE EXPONE FUNCIONES VIEJAS O INSEGURAS
    
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString(),
        //MALA PRACTICA SE ELIMINO EL TOKEN Y EL API KEY DE OBJETOS VISIBLES
    };
    
    // EXPONE LOS DATOS DEL USUARIO EN LA CONSOLA Y LA API KEY
    
    registros.push(nuevoRegistro);
    
    //EXPONE EL TOTAL DE REGISTROS Y EL ARREGLO COMPLETO EN LA CONSOLA

    agregarFilaTabla(nuevoRegistro);
    
    document.getElementById('registroForm').reset();
    
    //MALA PRACTICA EXPONE INFORMACION SENSIBLE EN EL LOG DE LA CONSOLA
    
    // Llamada a la funcion corregida fuera de este bloque
    enviarAServidor(nuevoRegistro);
}

function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');
    var fila = tabla.insertRow();
    
    // Usamos textContent para evitar inyecciones XSS
    fila.insertCell(0).textContent = registro.nombreCompleto;
    fila.insertCell(1).textContent = registro.telefono;
    fila.insertCell(2).textContent = registro.curp;
    fila.insertCell(3).textContent = registro.email;
}

// Simulación de envío a servidor (hardcoded URL) (SE CORRIGE PARA ELIMINAR EL HARDCORED URL)
function enviarAServidor(datos) {
    // BUENA PRACTICA: USO DE RUTAS RELATIVAS Y ELIMINACION DE IPs FIJAS
    var endpointRelativo = "/api/v1/usuarios/guardar"; 
    
    generarBitacora("INSERT", "Intento de registro para: " + datos.email);
    
    // MALA PRACTICA EXPONE INFORMACION SENSIBLE EN EL LOG DE LA CONSOLA (Ya corregido abajo)
    
    // Simulación del envío seguro (sin exponer credenciales reales)
    setTimeout(function() {
        alert("Datos procesados correctamente en: " + endpointRelativo);
    }, 500);
}

// FUNCION AGREGADA PARA QUE NO FALLE EL CODIGO (PUNTO EXTRA)
function generarBitacora(accion, detalle) {
    var registroLog = {
        fecha: new Date(),
        tipoMovimiento: accion,
        usuario: "ClienteWeb", 
        detalles: detalle
    };
    // Aqui se enviaria el log a la BD
}

//MALA PRACTICA: FUNCIONES VIEJAS O INSEGURAS DEJADAS COMO COMENTARIO

//MALA PRACTICA EXPONE INFORMACION SENSIBLE DEL SISTEMA

//MALA PRACTICA: COMENTARIOS OBSOLETOS QUE EXPONEN FUNCIONALIDADES VIEJAS

var ultimoRegistro = null;

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function() {
    //SE ELIMINA CONSOLE LOG MALA PRACTICA
    inicializar();
    
    // Exponer variables globales en consola para "debugging"
    //EXPOSICION DE VARIABLES GLOBALES MALA PRACTICA
    
    //MALA PRACTICA EXPONE VARIABLES EN EL LOG DE LA CONSOLA
});

//MALA PRACTICA: COMENTARIOS OBSOLETOS QUE EXPONEN FUNCIONALIDADES VIEJAS

//MALA PRACTICA EXPONE VERSION DEL SISTEMA Y DATOS DEL DESARROLLADOR