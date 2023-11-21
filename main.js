const textoPregunta = document.querySelector(".preguntas")
const contenedorBotonesRespuesta = document.querySelector("#contenedorBotonesGAAA")
const siguienteBoton = document.querySelector("#siguienteBoton")
const fragmentoRespuesta = document.createDocumentFragment();

contenedorBotonesRespuesta.innerHTML = "";

let jsonPreguntas;
let contadorIndiceArreglo = 0;
let puntaje = 0;
siguienteBoton.style.display = "none";

const consumiendoPreguntasJson = async () =>{
    const data = await fetch("./preguntas.json");
    jsonPreguntas = await data.json();
    poniendoIndiceJson();

    fragmentoRespuestas(jsonPreguntas[contadorIndiceArreglo])
    contenedorBotonesRespuesta.append(fragmentoRespuesta)
    presionandoBotonSiguiente();
}

const poniendoIndiceJson = () =>{
    let dataIndice = jsonPreguntas[contadorIndiceArreglo]
    let preguntasNumeros = contadorIndiceArreglo + 1;
    textoPregunta.textContent = preguntasNumeros+". "+dataIndice.question;
}

const fragmentoRespuestas = (element) =>{
    // console.log(element);
    element.answers.forEach((element) => {
        const buttonFuncion = document.createElement("button");
        buttonFuncion.textContent = `${element.text}`;
        buttonFuncion.dataset.BtnCorrect = element.correct;
        buttonFuncion.classList.add("btn")
        fragmentoRespuesta.append(buttonFuncion);
        // console.log(element);

        buttonFuncion.addEventListener("click", ()=>{
            //aqui coloca la funciona para saber si presiono el boton correcto
            poniendoColorSet(buttonFuncion);
            siguienteBoton.style.display = "block"
        })
    });
}

const presionandoBotonSiguiente = () =>{
    const botonesActivos = document.querySelectorAll(".btn")

    siguienteBoton.addEventListener("click", () =>{
        if(contadorIndiceArreglo < jsonPreguntas.length - 1){
            contadorIndiceArreglo++;

            botonesActivos.forEach(element =>{
                element.disabled = false;
                element.style.cursor = "pointer";
                element.classList.remove("botonCorrecto", "botonIncorrect");
            })

            cambiandoDataSetSegunPosition();
            poniendoIndiceJson();
            siguienteBoton.style.display = "none"
            // console.log(contadorIndiceArreglo);
        }else{
            textoPregunta.textContent = `Tu puntaje es: ${puntaje} y las respuestas 
            en total son ${jsonPreguntas.length}`;
            contenedorBotonesRespuesta.innerHTML = "";
            siguienteBoton.style.display = "none";
            console.log("LLego al limite");
        }
    })
}

const cambiandoDataSetSegunPosition = () =>{
    jsonPreguntas[contadorIndiceArreglo].answers.forEach((element, index) => {
        //children[index]: representa el indice de las respuestas del json
        const indiceSet = contenedorBotonesRespuesta.children[index];
        indiceSet.dataset.BtnCorrect = element.correct;
        indiceSet.innerHTML = element.text;
        console.log(element);
    });
}

const poniendoColorSet = (button) =>{
    let botonPresionado = button.dataset.BtnCorrect;
    const botonesActivos = document.querySelectorAll(".btn");
    //button.disabled = true: Lo que hace es desactivar el boton una vez presionado
    //disabled = true hace eso, osea deshabilita el boton para que no se pueda presionar
    // button.disabled = true;
    if(botonPresionado === "true"){
        button.classList.add("botonCorrecto")
        puntaje++;
    }else{
        button.classList.add("botonIncorrect");
        // Mostrar el botón correcto:
        //encontrando boton correcto para mostrarlo si es que presiono uno incorrecto
        //Array.from: Sirve para convertir una coleccion de elementos, nodeList y objetos iterables
        //en arreglos reales

        // const botones = contenedorBotonesRespuesta.querySelectorAll(".btn");
        // const botonCorrecto = Array.from(botones).find(item => item.dataset.BtnCorrect == "true");
        // if(botonCorrecto) botonCorrecto.classList.add("botonCorrecto")
    }
    const botonIsInCorrect = button.classList.contains("botonIncorrect");
    
    //Esto recorre todos los botones y los desabilita colcando disabled = true
    // console.log(botonesActivos);
    botonesActivos.forEach(element =>{
        if(botonIsInCorrect){
            if(element.dataset.BtnCorrect == "true"){
                element.classList.add("botonCorrecto")
            }
        } 
        element.disabled = true;
        element.style.cursor = "no-drop";
    })
}

consumiendoPreguntasJson();