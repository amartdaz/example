import React, { Dispatch, SetStateAction, useState } from "react";

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
    <div className={styles.input_password}>
      <input
        type={passwordShown ? "text" : "password"}
        required
        name="password"
        id="password"
        autoComplete="current-password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        title="Eye"
        className="InputIcon"
        onClick={() => setPasswordShown((prev) => !prev)}
      >
        {passwordShown ? getIcon("eye") : getIcon("eye-closed")}
      </Button>
    </div>
  );
}
