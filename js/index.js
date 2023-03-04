class Validator {

  constructor() {
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-only-letters',
      'data-email-validate',
      'data-required',
      "data-equal",
      "data-password-validate",
    ];
  }
  validate(form) {

    let currentValidations = document.querySelectorAll("form .error-validation");

    if(currentValidations.length) {
      this.cleanValidations(currentValidations);
    }
    
   let inputs = form.getElementsByTagName("input");

    
    let inputsArray =[...inputs];

    inputsArray.forEach(function(input, obj) {
      
      for(let i = 0; this.validations.length > i; i++) {
        if(input.getAttribute(this.validations[i]) != null)  { 

          let method = this.validations[i].replace("data-", "").replace("-", "")

          let value = input.getAttribute(this.validations[i])

          this[method](input, value)
          
      } 
    }
    }, this);
  }
  minlength(input, minValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }

  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }

  }
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = "O campo não aceita caracteres especias nem numeros."
    
    if(!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }

  }

  emailvalidate(input){

    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = "Seu email deve seguir o padrão fulano@flano.com";

    if(!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `O campo precisa ser igual ao ${inputName}`

    if (input.value != inputToCompare.value){
      this.printMessage(input, errorMessage);
    }
  }

   required (input){
    let inputValue = input.value;

    if (inputValue == "") {
      let errorMessage = "Este campo é obrigatório."
      this.printMessage(input, errorMessage);
    }
  }



  passwordvalidate(input ){

    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for(let i  = 0; charArr.length > i; i++) {
      if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
    }else if(!isNaN(parseInt(charArr[i]))) {
      numbers++;
    }

  }

  if(uppercases === 0 || numbers === 0) {
    let errorMessage = `Sua senha precisa de um caractere maiúsculo e um numero`;

    this.printMessage(input, errorMessage);
  }

}



printMessage(input, msg) {
  
  // checa os erros presentes no input
  let errorsQty = input.parentNode.querySelector('.error-validation');

  // imprimir erro só se não tiver erros
  if(errorsQty === null) {
    let template = document.querySelector('.error-validation').cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove('template');

    inputParent.appendChild(template);
  }

  
}

  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}

let form = document.querySelector(".form");
let submit = document.querySelector(".submit");

let validator = new Validator();

submit.addEventListener("click", (event) => {
  event.preventDefault();
  validator.validate(form);
  
});




