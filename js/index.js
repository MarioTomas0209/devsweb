document.addEventListener('DOMContentLoaded', function(){

    /***************************************
     * MENU HAMBURGUESA                    *
     * ************************************/
    const headerNav = document.querySelector('.header__nav');
    const hamburger = document.querySelector('.hamburger');
    const img_toggle = document.querySelector('.hamburger a img');
    var isClosed = true;


    hamburger.addEventListener("click", () => {

        if (isClosed) {
            img_toggle.src = '../images/icon-close.svg';
            isClosed = false;
        } else {
            img_toggle.src = '../images/icon-hamburger.svg';
            isClosed = true;
        }

        headerNav.classList.toggle('nav-menu_visible'); 
    });


    /***************************************
     * VALIDAR FORMULARIO                  *
     * ************************************/
    // Objetos
    const email = {
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
    }

    // Seleccionar los elementos del interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const btnEnviar = document.querySelector('#enviar');
    const bolita = document.querySelector('#bolita');
    const enviarEmail = document.querySelector('#enviar-email');
    const btnReset = document.querySelector('#limpiar');

    // Eventos
    inputNombre.addEventListener('input', validar);
    inputTelefono.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    
    enviarEmail.addEventListener('submit', envairMail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        // Reiniciar el objeto
        limpiarFormulario();
    });

    // Funciones
    function envairMail(e){
        e.preventDefault();

        bolita.classList.remove('hidden')   
        
        setTimeout(() => {
            bolita.classList.add('hidden');

            // Reiniciar el objeto
            limpiarFormulario()

            // Creando una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('alerta');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            enviarEmail.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarFormulario();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarFormulario();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
        // Asignar los valores del formulario
        email[e.target.id] = e.target.value.trim().toLowerCase();

        // comprobar el objeto email si esta rellenado
        comprobarFormulario();
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        // Genera la alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error');

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.error');

        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarFormulario(){
        if(Object.values(email).includes('')){
            btnEnviar.classList.add('opaco', 'cursor-cancel');
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove('opaco', 'cursor-cancel');
        btnEnviar.classList.add('cursor');
        btnEnviar.disabled = false;
    }

    // Limpiar formulario
    function limpiarFormulario(){
        email.email = '';
        email.mensaje = '';
        email.nombre = '';
        email.telefono = '';

        enviarEmail.reset();
        comprobarFormulario();
    }

});