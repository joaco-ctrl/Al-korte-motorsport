const conexion = require("../database");
function login(data, callback) {
    const { email, password } = data;
    if (!email || !password) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email],
            callback
        );
    }
}

function registro(data, callback) {
    const { email, password } = data;
    if (!email || !password) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "INSERT INTO usuarios (email, password) VALUES (?, ?)",
            [email, password],
            callback
        );
    }
}

module.exports = {
    login,
    registro
};

