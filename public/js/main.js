/**
 * Send post request
 */
function postRequest(url, params, callback) {
  var http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      callback(http.responseText);
    }
  };

  http.send(params);
}

/**
 * Submit password and run callback with password url
 */
function submit(password, callback) {
  var url = "/set";

  data = encrypt(password);

  postRequest(url, "pass="+encodeURIComponent(data.encrypted), function(response) {
    callback(response + "#" + data.privateKey);
  });
}

function updateOutput(res) {
  output = document.getElementById('output');
  output.value = 'http://' + window.location.host + res;
  document.getElementById('step2').style.display = 'block';
}

function getInput(elId) {
  input = document.getElementById(elId);
  return input.value;
}

function doTranslation() {
  document.getElementById('step1').style.display = 'none';
  data = getInput('input');
  submit(data, updateOutput);
}
document.addEventListener("DOMContentLoaded", function() {
  btn = document.getElementById('btn-submit');
  btn.style.display = 'none';
  btn.addEventListener("click", doTranslation);

  input = document.getElementById('input');
  input.addEventListener("keyup", function(ev) {
    if (input.value.length > 0) btn.style.display = 'inline-block';
    else btn.style.display = 'none';

    if ((ev.keyCode == 10 || ev.keyCode == 13) && (!ev.ctrlKey) && (!ev.altKey) && (!ev.shiftKey) && (!ev.cmdKey) && (!ev.metaKey)) { // ENTER/RETURN KEY without modifiers (like ALT/SHIFT/CTRL...)
      doTranslation();
    }
  })


});

function encrypt(text) {
    enc = new JSEncrypt();
    enc.getKey();

    return {
        'privateKey': enc.getPrivateKeyB64(),
        'publicKey': enc.getPublicKeyB64(),
        'encrypted': enc.encrypt(text)
    };
}

function decrypt(privateKey, encrypted) {
  enc = new JSEncrypt();
  enc.setPrivateKey(privateKey);

  return enc.decrypt(encrypted);
}
