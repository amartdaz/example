import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import './input.css';

type InputPasswordProps = {
  password: string | undefined;
  setPassword: Dispatch<SetStateAction<string>>;
};

export default function InputPassword({
  password,
  setPassword,
}: InputPasswordProps) {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className='input_password'>
      <input
        type={passwordShown ? "text" : "password"}
        name="password"
        id="password"
        autoComplete="current-password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setPasswordShown((prev) => !prev)} type='button'>{passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
    </div>
  );
}
