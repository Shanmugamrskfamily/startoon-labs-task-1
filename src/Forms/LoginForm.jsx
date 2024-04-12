import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

function LoginForm() {
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoggingIn(true);
        try {
            // Send login data to the backend API
            const response = await axios.post('http://localhost:5000/auth/login', values);

            
            if (response.status === 200) {

            // Save token in local storage
            localStorage.setItem('token', response.data.token);

            // Show success message
            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Redirect to dashboard
            navigate('/dashboard');
        } else {
            throw new Error('Failed to Login User');
        }
        } catch (error) {
            console.error('Error logging in:', error);
            // Show error message
            toast.error('Invalid email or password. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoggingIn(false);
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl text-center mb-4">Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-2xl mb-2 text-gray-700">Email</label>
                            <Field type="email" id="email" name="email" className="form-input w-full" />
                            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-2xl mb-2 text-gray-700">Password</label>
                            <Field type="password" id="password" name="password" className="form-input w-full" />
                            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className='text-center'>
                        <button type="submit" className="btn btn-success text-white" disabled={isSubmitting || isLoggingIn}>
                            {isLoggingIn ? (
                                <ClockLoader color="#ffffff" size={20} />
                            ) : (
                                'Login'
                            )}
                        </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;
