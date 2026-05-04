import { useState } from "react";
import Login from "./Components/Login";
import TodoApp from "./Components/TodoApp";


function App() {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }
  // اگر لاگین شده بودیم، اپلیکیشن اصلی رو نشون میدیم

  return <TodoApp />;
}

export default App;
