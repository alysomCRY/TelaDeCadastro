async function postalCode(code) {
    const errorMsg = document.getElementById("error");
      errorMsg.innerHTML = "";
  
    try {
  
      const codeSearch = await fetch(`https://viacep.com.br/ws/${code}/json/`);
      
      const convertCode = await codeSearch.json();
      if (convertCode.erro) {
        throw Error("CEP não encontrado");
      }
  
      const city = document.getElementById("city");
      const address = document.getElementById("address");
      const state = document.getElementById("state");
      const block = document.getElementById("block");
  
      city.value = convertCode.localidade;
      address.value = convertCode.logradouro;
      state.value = convertCode.uf;
      block.value = convertCode.bairro;
  
      return convertCode;
    } catch (erro) {
      errorMsg.innerHTML = "<p>CEP nao encontrado</p>";
    }
    
  }
  
  const zipCode = document.getElementById("zip-code");
  zipCode.addEventListener("focusout", () => postalCode(zipCode.value));
 