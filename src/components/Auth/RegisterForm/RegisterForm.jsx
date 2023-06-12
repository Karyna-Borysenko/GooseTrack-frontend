import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { useState } from 'react';
import { register, resendEmail } from 'redux/auth/operations';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

// import { setAuthHeader } from '../../../redux/auth/operations';
// import { refreshUser } from '../../../redux/auth/operations';
// import { selectToken } from '../../../redux/auth/selectors';
import { AuthNavigate } from 'components/Auth/AuthNavigate/AuthNavigate';
import RegistrationSuccessModal from './RegisterSuccessModal/RegisterSuccessModal';

import {
  Wrapper,
  StyleButton,
  StyleFormContainer,
  StyleFormTitle,
  Form,
  StyleInput,
  StyleLabel,
  StyleParaghraph,
  ErrorMessage,
  ButtonText,
  Svg,
  RegisterGooseImage,
  BtnGoogle,
  GoogleIcon,
  Or,
} from './RegisterForm.styled';
import gooseRegister2x from 'images/goose-register@2x.png';
import gooseRegister from 'images/goose-register.png';
import Icons from 'images/sprite.svg';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(30, 'Name must be at most 30 characters')
    .required('Please enter your name'),
  email: yup
    .string()
    .email('Email must be valid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .required('Password is a required field'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const emailId = nanoid();
  const passwordId = nanoid();
  const nameId = nanoid();
  const [isOpened, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleToggleModal = () => setIsModalOpen(!isOpened);

  const handleResendEmail = async () => {
    try {
      await dispatch(resendEmail(userEmail));
    } catch (error) {
      console.error('Failed to resend email:', error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values, { resetForm }) => {
        setUserEmail(values.email);
        dispatch(
          register({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        ).then(() => {
          resetForm();
          setIsModalOpen(true);
        });
      }}
      validationSchema={validationSchema}
    >
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        isSubmitting,
      }) => (
        <Wrapper>
          <StyleFormContainer>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <StyleFormTitle>Sign Up</StyleFormTitle>
              <StyleLabel htmlFor={nameId}>
                <StyleParaghraph>Name</StyleParaghraph>
                <StyleInput
                  type="text"
                  name="name"
                  id={nameId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter your name"
                />
              </StyleLabel>
              <ErrorMessage>
                {errors.name && touched.name && errors.name}
              </ErrorMessage>
              <StyleLabel htmlFor={emailId}>
                <StyleParaghraph>Email</StyleParaghraph>
                <StyleInput
                  type="email"
                  name="email"
                  id={emailId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email"
                />
              </StyleLabel>
              <ErrorMessage>
                {errors.email && touched.email && errors.email}
              </ErrorMessage>
              <StyleLabel htmlFor={passwordId}>
                <StyleParaghraph>Password</StyleParaghraph>
                <StyleInput
                  type="password"
                  name="password"
                  id={passwordId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                />
              </StyleLabel>
              <ErrorMessage>
                {errors.password && touched.password && errors.password}
              </ErrorMessage>
              <StyleButton type="submit" disabled={isSubmitting}>
                <ButtonText>
                  Sign Up
                  <Svg>
                    <use href={`${Icons}#login-door-sf`}></use>
                  </Svg>
                </ButtonText>
              </StyleButton>
              <Or>or</Or>
              <BtnGoogle href="https://goosetrack-backend.onrender.com/api/auth/google">
                <GoogleIcon>
                  <use href={`${Icons}#icon-google`}></use>
                </GoogleIcon>
                Sign Up with Google
              </BtnGoogle>
            </Form>
            <AuthNavigate route="/login" content="Log In" />
            <RegisterGooseImage
              srcSet={`${gooseRegister} 1x, ${gooseRegister2x} 2x`}
              src={gooseRegister2x}
              alt="goose"
            />
          </StyleFormContainer>
          {isOpened && (
            <RegistrationSuccessModal
              onCloseModal={handleToggleModal}
              onResendEmail={() => handleResendEmail(values.email)}
              email={values.email}
            />
          )}
        </Wrapper>
      )}
    </Formik>
  );
};
