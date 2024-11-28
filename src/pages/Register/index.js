import ggLogo from "./img/Icon-Google.svg";
import "./Register.scss";
import pic from "./img/pictureLeft.svg";
import { useState } from "react";
import { registerValidation } from "../../helpers/validate";
import { register } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isValid, setIsValid] = useState([true, true, true]);
  const navigate = useNavigate();
  const error = (error) => {
    messageApi.open({
      type: "error",
      content: `${error}. Vui lòng thử lại`,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkValid = registerValidation({ fullName, email, password });

    if (!checkValid[0] || !checkValid[1] || !checkValid[2]) {
      setIsValid(() => checkValid);
      return;
    }
    console.log("test");

    try {
      const result = await register(fullName, email, password);
      console.log(result);
      navigate("/login");
    } catch (err) {
      console.log(err);

      error(err);
    }
    setIsValid(() => checkValid);
  };
  const handleGoogle = async () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };
  return (
    <section className="register">
      {contextHolder}
      <div className="register__left">
        <img src={pic} className="picture" alt="register" />
      </div>
      <div className="register__right">
        <form onSubmit={handleSubmit}>
          <h1 className="register__title">Create an account</h1>
          <p className="register__desc">Enter your details below</p>
          <div className="input__field">
            <input type="text" placeholder="Name" name="fullName" />
          </div>
          {isValid[0] ? (
            <></>
          ) : (
            <p className="register__warning">Tên không đúng định dạng</p>
          )}
          <div className="input__field">
            <input
              type="text"
              placeholder="Enter your email address"
              name="username"
            />
          </div>
          {isValid[1] ? (
            <></>
          ) : (
            <p className="register__warning">Email không đúng định dạng</p>
          )}
          <div className="input__field">
            <input type="password" placeholder="Password" name="password" />
          </div>
          {isValid[2] ? (
            <></>
          ) : (
            <p className="register__warning">Mật khẩu không đúng định dạng</p>
          )}
          <div className="btn__group">
            <input type="submit" value={"Create Account"}></input>
          </div>
        </form>
        <button onClick={handleGoogle}>
          <img src={ggLogo} alt="google" />
          Sign up with Google
        </button>
        <p className="register__bottom">
          <span>Already have account?</span>
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}