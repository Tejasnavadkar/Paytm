import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";

function Input({ label, placeholder, onChange, type = "text" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setActive] = useState(false);
  console.log("isActive--", isActive);

  const PasswordToggel = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="">
        <div className="font-medium text-left py-2">
          <label htmlFor="">{label}</label>
        </div>
        <div
          className={`w-full flex ${
            type === "password" ? "border border-slate-200 rounded " : ""
          }`}
        >
          <input
            onKeyDown={() => type === "password" && setActive(true)}
            type={
              type === "password"
                ? `${showPassword ? "text" : "password"}`
                : type
            }
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full py-1 px-2 rounded outline-none ${
              type !== "password" ? "border border-slate-200 " : ""
            }    `}
          />
          {type === "password" && isActive && (
            <button onClick={PasswordToggel} className="mx-2">
              {showPassword ? <IoMdEye /> : <IoEyeOff />}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Input;
