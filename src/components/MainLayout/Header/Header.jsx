import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';
import { useLocation, useParams } from 'react-router-dom';
import HeaderImg from 'images/sidebar/GooseHeader.png';
import FeedbackBtn from '../Header/AddFeedbackBtn/AddFeedbackBtn';
import LanguageFlags from './LanguageFlags/LanguageFlags';

import { ThemeToggler } from './ThemeToggler/ThemeToggler';

import {
  Title,
  Container,
  Box,
  Div,
  BrgMenu,
  BrgBtn,
  UserAvatar,
  UserName,
  GooseImg,
  NoAvatar,
  Span,
  TitleCalendar,
  HeaderParagraph,
} from './Header.styled';
import Icons from 'images/sprite.svg';
import { useEffect, useState } from 'react';

const Header = ({ isOpen, onOpenClick }) => {
  const { name, avatarURL } = useSelector(selectUser);
  const [windowSize, setWindowSize] = useState(window.innerWidth >= 300)

  const firstLetter = name?.charAt(0).toUpperCase();
  const location = useLocation();
  let { currentDay } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth >= 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      {!isOpen && (
        <BrgBtn onClick={onOpenClick}>
          <BrgMenu>
            <use href={`${Icons}#profile-mobile-menu`}></use>
          </BrgMenu>
        </BrgBtn>
      )}
      <TitleCalendar>
        {location.pathname === '/calendar' && <Title> Calendar</Title>}

        {location.pathname === '/account' && <Title> User Profile</Title>}

        {location.pathname === `/calendar/day/${currentDay}` && (
          <>
            <GooseImg src={HeaderImg} alt="Goose" />
            <Div>
              <Title>Calendar</Title>
              <HeaderParagraph>
                {' '}
                <Span>Let go</Span> of the past and focus on the present!
              </HeaderParagraph>
            </Div>
          </>
        )}
      </TitleCalendar>
      <Box>
        {windowSize <= 340 &&
          <>
            <LanguageFlags />
            <FeedbackBtn />
          </>
        }
        <ThemeToggler />
        <UserName>{name}</UserName>
        {avatarURL ? (
          <UserAvatar src={avatarURL} alt="user avatar" />
        ) : (
          <NoAvatar>{firstLetter}</NoAvatar>
        )}
      </Box>
    </Container>
  );
};

export default Header;
