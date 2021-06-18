

var pintura ;
var eletrica ;
var automacao ;
var hidraulica ;
var construcao ;
var refoGeral ;
var desigInte ;
var arqEng ;
var obrasAca ;
var forroPvc ;
var marcenaria;
var forroGesso ;
var aplPiso ;


var servico;

const aparecer = (tipo) =>{  
    document.getElementById("overlay1").style.display = 'block';
    
    servico =    document.getElementById(tipo).value;
    
    
}


const fechar = () =>{
   document.getElementById("overlay1").style.display= 'none';
   document.getElementById("overlay2").style.display= 'none';
   document.getElementById("overlay3").style.display= 'none';
   document.getElementById("overlay4").style.display= 'none';
   document.getElementById("overlay5").style.display= 'none';
   document.getElementById("overlay6").style.display= 'none';
   document.getElementById("overlay7").style.display= 'none';
   document.getElementById("overlay8").style.display= 'none';
}

const proximo = (pg) =>{
    document.getElementById(`overlay${pg}`).style.display='none'
    document.getElementById(`overlay${pg + 1}`).style.display='block'
}

const voltar = (pg) =>{
    document.getElementById(`overlay${pg}`).style.display='none'
    document.getElementById(`overlay${pg - 1}`).style.display='block'
}
function video () {
    document.getElementById("overlayVideo").style.display = "block";
    document.getElementById("overlay1").style.display = "none";    
}
function voltarVideo() {
    document.getElementById("overlayVideo").style.display = "none";
    document.getElementById("overlay1").style.display = "block";    
}

var file;
var textContent; 
var pedido;

function nova(){
    file = document.getElementById("arquivo");
    console.log(file); 
    file.addEventListener('change', function() {
            
    var fr =new FileReader();
    fr.onload=function(){
        textContent = fr.result;
    }
        
    fr.readAsBinaryString(this.files[0]);
    })
}

const enviar = ()=>{

    alert(`Sua solicitação foi enviada com sucesso! Respondemos em torno de 72 horas via email!`);
    var mensagem = " ";


    let opc = document.getElementsByName("op");//escolhendo 1 opcao de horario
    for(let i =0 ; i < opc.length ; i++){
        if(opc[i].checked){
        opc = opc[i].value;
        }
    } 
    let Sn = document.getElementsByName("Sn");//escolhendo 1 opcao S/N se vai ser no fim de semana
    for(let i =0 ; i < Sn.length ; i++){
        if(Sn[i].checked){
            Sn = Sn[i].value;
        }
    } 
    let quando = document.getElementsByName("usm");//escolhendo 1 opcao S/N se vai ser no fim de semana
    for(let i =0 ; i < quando.length ; i++){
        if( quando[i].checked){
            quando = quando[i].value;
        }
    } 

    let obs = document.getElementById("obs").value;
    let ind = document.getElementById("ind").value;
    let  tel = document.getElementById("tel").value;
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("ende").value;
    let cpf = document.getElementById("cpf").value;
    let date = document.getElementById("date").value;

    const Pedido = Parse.Object.extend("Pedido");   
    pedido = new Pedido();

    pedido.save({
        TipoServico : servico,
        medida : document.getElementById("medida").value,
        arquivo : new Parse.File(file.value.split("\\").pop(),{ base64: btoa(textContent)}),
        op :  opc,
        Sn : Sn,
        quando : quando,
        obs : obs,
        indicado: ind,
        nome : document.getElementById("name").value,
        Telefone : tel,
        Email: email,
        Endereco : endereco,
        Cpf : cpf,
        DataNascimento : date,
    });

    (async () => {
        const TipoServico = pedido.get('TipoServico')    
        const medida = pedido.get('medida')
        const arquivo = pedido.get('arquivo')
        const op = pedido.get('op')
        const Sn = pedido.get('Sn')
        const quando = pedido.get('quando')
        const obs = pedido.get('obs')
        const indicado = pedido.get('indicado')
        const nome = pedido.get('nome')
        const Telefone = pedido.get('Telefone')
        const Email = pedido.get('Email')
        const Endereco = pedido.get('Endereco')
        const Cpf = pedido.get('Cpf')
        const DataNascimento = pedido.get('DataNascimento')

        mensagem = 
            'A Viverde tem uma nova solicitação de: '+
            "\n Dados Pessoais"+
            "\n"+
            "\n Nome: "+nome+
            "\n Email: "+ Email+
            "\n"+"Telefone: "+Telefone+
            "\n"+"Endereço: "+Endereco+
            "\n"+"Cpf: "+Cpf+
            "\n"+"Data de Nascimento: "+DataNascimento+
            "\n"+
            "\n Informações do Pedido de "+TipoServico+":"+
            "\n"+     
            "\n Medida:"+medida+
            "\n"+ "Foto: "+arquivo+" baixar arquivo pelo back4app!"+
            "\n"+ "Horário: "+op+
            "\n"+ "Fim de semana: "+Sn+
            "\n"+ "Para quando: "+quando+
            "\n"+ "Observação: "+obs+
            "\n"+ "Quem indicou: "+indicado
        ;

        document.location.href = "mailto:yteixeira133@gmail.com?subject="+ "&body=" + encodeURIComponent(mensagem);
    })();

} 


async function  mostrar(){
    let mostrar = []    
    
        const Servicos = Parse.Object.extend('Servicos');
        const query = new Parse.Query(Servicos);


        const results = await query.find();
    for (const object of results) {
        // Access the Parse Object attributes using the .GET method
        const Nome = object.get('Nome');
        //const IDservi = object.get('IDservi');

        mostrar.push(Nome);
        // mostrar.push(`${Nome}\n`);
      

    }
  

    document.getElementById('rows').innerHTML = mostrar.reduce((servicos, servico) => {
     return servicos +     `<div class="serviços" onclick="aparecer(${servico})"> <input type="text" id="${servico}" value="${servico}"  style="display : none;" "> <div class="" style="background-image:url(imgs/pintura.png);background-size:100%; width: 220px ;background-repeat: no-repeat;height: 140px;"></div>  <p> ${servico}</p> </div>`
   }, '')
}


