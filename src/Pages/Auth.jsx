import React, { useState } from 'react';
import SignupForm from '../Forms/SignupForm';
import LoginForm from '../Forms/LoginForm';

function Auth() {
    const [action, setAction] = useState("login");

    return (
        <div className="flex flex-col md:flex-row">

            <div className="md:hidden flex items-center justify-center">
                <img src='./images/main.png' alt="Authentication" className="max-w-xs" />
            </div>

            <div className="hidden md:flex items-center justify-center flex-1">
                <img src='./images/main.png' alt="Authentication" className="max-w-xs" />
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-md w-full px-4 py-8  shadow-md rounded-lg">
                    {action === 'login' ? <LoginForm /> : <SignupForm />}
                    <p className="mt-4 text-center">
                        {action === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => setAction(action === 'login' ? 'signup' : 'login')} className="text-blue-500 hover:underline">
                            {action === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default Auth;
