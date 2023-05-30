const formInput = document.getElementById("form-input")

formInput.addEventListener("submit", function(event) {
    event.preventDefault();
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;
    call_api_log(inputEmail, inputPassword).then(returnToken => {
      console.log(returnToken)
    })
  }, true);





