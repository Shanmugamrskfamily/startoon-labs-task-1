import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { css } from "@emotion/react";
import { ClockLoader } from "react-spinners";
import axios from 'axios';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function SignupForm() {

    const handleSubmit = async (values, { setSubmitting,resetForm }) => {
        try {
            // Send data to the backend API
            const response = await axios.post('http://localhost:5000/auth/signup', values);
    
            // Show success message if request is successful
            if (response.status === 201) {
                toast.success('User registered successfully! You Can Login Now.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            // Clear form values
            resetForm();

                
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Error registering user. Please try again later.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <div>
            <h2 className="text-3xl text-center mb-4">Sign Up</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '', gender: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
                        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol, and be between 8 and 12 characters long'
                    ).required('Required'),
                    gender: Yup.string().required('Required')
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-2xl text-gray-700">Name</label>
                            <Field type="text" id="name" name="name" className="form-input w-full" />
                            <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-2xl text-gray-700">Email</label>
                            <Field type="email" id="email" name="email" className="form-input w-full" />
                            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-2xl text-gray-700">Password</label>
                            <Field type="password" id="password" name="password" className="form-input w-full" />
                            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-sm font-medium mb-2 text-2xl text-gray-700">Gender</label>
                            <Field as="select" id="gender" name="gender" className="form-select w-full h-120">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-red-600 text-sm mt-1" />
                        </div>
                        <div className='text-center'>
                        <button type="submit" className="btn btn-primary text-white" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <ClockLoader color="#ffffff" css={override} size={20} />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignupForm;
