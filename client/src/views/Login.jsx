import logo from "../assets/logo.png";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    // bancamela mae
    const url = "http://localhost:3001/api/auth/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="h-screen bg-slate-800 grid items-center shadow-lg loginBg">
      <div className="backdrop-blur-sm bg-slate-800/40 text-white w-[90%] mx-auto text-center p-10 space-y-2 flex flex-col justify-center items-center rounded-lg">
        <div>
          <img src={logo} alt="logo" className="pr-3" />
          <h2 className="">Tu consultor vial inteligente</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
          <input
            type="text"
            placeholder="Ingrese su email"
            className="p-2 border-2 border-blue-400 text-slate-900 font-medium"
          />
          <input
            type="password"
            placeholder="Ingrese su password"
            className="p-2 border-2 border-blue-400 text-slate-900 font-medium"
          />
          <input
            type="submit"
            value="Iniciar Sesión"
            className="p-2 bg-blue-400 rounded-full shadow-lg mt-4"
          />
        </form>
        <div className="text-sm flex flex-col pt-4">
          <a href="/forgot-password" className="text-blue-200">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="/register" className="text-blue-200 ">
            ¿No tenés cuenta?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;