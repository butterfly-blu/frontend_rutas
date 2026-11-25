const loginForm = document.forms["login-form"];
const msgError = document.getElementById("msg-error");

const mostrarError = (texto) => {
  msgError.textContent = texto;
  msgError.classList.remove("hidden");
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  msgError.classList.add("hidden");

  const login = loginForm["login"].value.trim();
  const contrasena = loginForm["contrasena"].value;

  // Validación básica en el cliente
  if (login === "" || contrasena === "") {
    mostrarError("Debe ingresar usuario y contraseña");
    return;
  }

  loginService(login, contrasena, {
    success: (data) => {
      // Guardar el token de sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      window.location.href = "inicio.html";
    },
    error: (mensaje) => mostrarError(mensaje),
  });
});