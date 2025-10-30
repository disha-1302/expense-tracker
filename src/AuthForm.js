import React, { useState, useRef } from "react";
import "./AuthForm.css"; // make sure your CSS file name matches

const AuthForm = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const startX = useRef(null);
  const currentX = useRef(null);
  const dragging = useRef(false);

  const containerClass = isLoginActive ? "container" : "container right-panel-active";

  const onPointerDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || null;
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.clientX || (e.touches && e.touches[0].clientX) || null;
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (startX.current == null || currentX.current == null) {
      startX.current = currentX.current = null;
      return;
    }
    const dx = currentX.current - startX.current;
    const THRESH = 50; // px
    if (dx < -THRESH) setIsLoginActive(false); // swipe left -> signup
    else if (dx > THRESH) setIsLoginActive(true); // swipe right -> signin
    startX.current = currentX.current = null;
  };

  return (
    <div className="auth-body">
      <div
        className={containerClass}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; dragging.current = true; }}
        onTouchMove={(e) => { if (dragging.current) currentX.current = e.touches[0].clientX; }}
        onTouchEnd={() => onPointerUp()}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <p className="subtitle">or use your email for registration</p>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign In</h1>
            <p className="subtitle">or use your account</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="button">Sign In</button>
          </form>
        </div>

        {/* Overlay Section */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Panel */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button
                className="ghost"
                onClick={() => setIsLoginActive(true)}
              >
                Sign In
              </button>
            </div>

            {/* Right Panel */}
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                onClick={() => setIsLoginActive(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;