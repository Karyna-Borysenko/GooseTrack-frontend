import { useDispatch } from 'react-redux';
import { googleAuth } from 'redux/auth/operations';
import gooseDesk3x from 'images/start-page-goose-desktop-1x.png';
import gooseDesk2x from 'images/start-page-goose-desktop-2x.png';
import gooseDesk1x from 'images/start-page-goose-desktop-3x.png';
import Icons from 'images/sprite.svg';
import {
  Container,
  Box,
  Img,
  MainTitle,
  SpanTitle,
  BoxBtn,
  BtnSignUp,
  BtnLogIn,
  BtnSignUpMob,
  BtnGoogle,
  SvgIcon,
  GoogleIcon,
} from './AuthSection.styled';

const AuthSection = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Box>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={`${gooseDesk1x} 1x, ${gooseDesk2x} 2x, ${gooseDesk3x} 3x`}
            alt="Goose"
          />
          <Img src={gooseDesk1x} alt="Goose" />
        </picture>

        <MainTitle>
          G<SpanTitle>oo</SpanTitle>seTrack
        </MainTitle>

        <BoxBtn>
          <BtnSignUp to={'/register'} type="button">
            Sign up
          </BtnSignUp>

          <BtnLogIn to={'/login'} type="button">
            Log in
            <SvgIcon>
              <use href={`${Icons}#login-door-sf`}></use>
            </SvgIcon>
          </BtnLogIn>

          <BtnGoogle type="button" onClick={dispatch(googleAuth())}>
            <GoogleIcon>
              <use href={`${Icons}#icon-google`}></use>
            </GoogleIcon>
            Google
          </BtnGoogle>

          <BtnSignUpMob type="button">Sign up</BtnSignUpMob>
        </BoxBtn>
      </Box>
    </Container>
  );
};

export default AuthSection;
