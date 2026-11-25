const AUTH_URL = "http://127.0.0.1:8081/auth";

const loginService = async (login, contrasena, callbacks) => {
  try {
    const response = await fetch(AUTH_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, contrasena }),
    });
    const data = await response.json();

    if (response.status === 200) {
      callbacks.success(data);
    } else {
      callbacks.error(data.message);
    }
  } catch (exception) {
    console.error(exception);
    callbacks.error("No se pudo conectar con el servidor de autenticación");
  }
};