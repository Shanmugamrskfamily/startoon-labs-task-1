import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClockLoader } from 'react-spinners';

const ChangePassword = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: ''
  };

  const [isChanging, setIsChanging] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        setIsChanging(true);


      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/auth/change-password',
        values,
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
        setIsSubmitting(false);
      setSubmitting(false);
    }
  };

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
                    <h2 className="text-2xl text-center font-bold mb-4">Change Password</h2>
                <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
          if (!values.currentPassword) {
            errors.currentPassword = 'Required';
          }
          if (!values.newPassword) {
            errors.newPassword = 'Required';
          } else if (!passwordRegex.test(values.newPassword)) {
            errors.newPassword =
              'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol, and be between 8 and 12 characters long';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md">
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <Field
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Field
                type="password"
                name="newPassword"
                id="newPassword"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className='text-center'>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isChanging ? (
                <ClockLoader color="#ffffff" size={20} />
              ) : (
                'Change Password'
              )}
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
    </div>
  );
};

export default ChangePassword;