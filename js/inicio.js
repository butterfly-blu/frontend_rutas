const token = localStorage.getItem("token");
const msgContent = document.getElementById("msg-content");

const msg = (texto) => {
  msgContent.getElementsByTagName("p")[0].textContent = texto;
  msgContent.classList.remove("hidden");
};

const irAlLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
};

// 1. Sin token no se puede entrar
if (!token) {
  irAlLogin();
}

// 2. Validar con el backend que la sesión siga activa
validarSesionService(token, {
  success: (data) => {
    document.getElementById("nombre-usuario").textContent = data.usuario.nombre;
    document.getElementById("rol-usuario").textContent = data.usuario.rol;
  },
  error: (mensaje) => {
    msg(mensaje + ". Redirigiendo al login...");
    setTimeout(irAlLogin, 2000);
  },
});

// 3. Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", () => {
  logoutService(token, {
    success: () => irAlLogin(),
    error: () => irAlLogin(),
  });
});