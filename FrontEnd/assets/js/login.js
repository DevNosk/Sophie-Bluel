const formInput = document.getElementById("form-input")
const errorMessage = document.getElementById("error-msg-login");

formInput.addEventListener("submit", function(event) {
    event.preventDefault();
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;
    call_api_log(inputEmail, inputPassword).then(returnToken => {

      console.log(returnToken);
    })
  }, true);
  function setLocalStorageItem(key, content) {
    localStorage.setItem(key, content);
  }





