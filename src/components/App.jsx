// import { lazy, Suspense } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import PublicRoute from './Auth/AuthRoutes/Public';
// import PrivateRoute from './Auth/AuthRoutes/Private';

// import ChoosedMonth from './Calendar/ChoosedMonth/ChoosedMonth';
// import ChoosedDay from './Calendar/ChoosedDay/ChoosedDay';
// import Page404 from './Page404/Page404';
// import LoginWithToken from './LoginWithToken';

// const StartPage = lazy(() => import('pages/Start/StartPage'));
// const LoginPage = lazy(() => import('pages/Login/LoginPage'));
// const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));
// const AccountPage = lazy(() => import('pages/Account/AccountPage'));
// const CalendarPage = lazy(() => import('pages/Calendar/CalendarPage'));
// const MainLayout = lazy(() => import('pages/MainLayout/MainLayout'));


// export const App = () => {
//   return (
//     <Suspense fallback={''}>
//       <Routes>
//         <Route>
//           <Route path="" element={<PublicRoute />}>
//             <Route index element={<StartPage />} />
//             <Route path="login" element={<LoginPage />} />
//             <Route path="register" element={<RegisterPage />} />
//             <Route path="login/:token" element={<LoginWithToken />} />
//           </Route>
//           <Route path="" element={<PrivateRoute />}>
//             <Route path="" element={<MainLayout />}>
//               <Route path="calendar" element={<CalendarPage />}>
//                 <Route path="month/:currentDate" element={<ChoosedMonth />} />
//                 <Route path="day/:currentDay" element={<ChoosedDay />} />
//               </Route>
//               <Route path="account" element={<AccountPage />} />
//             </Route>
//           </Route>
//           <Route path="*" element={<Page404 />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// };

// export default App;

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './Auth/AuthRoutes/Public';
import PrivateRoute from './Auth/AuthRoutes/Private';
import StartPage from 'pages/Start/StartPage';
import LoginPage from 'pages/Login/LoginPage';
import RegisterPage from 'pages/Register/RegisterPage';
import MainLayout from 'pages/MainLayout/MainLayout';
// import CalendarPage from 'pages/Calendar/CalendarPage';

import ChoosedMonth from './Calendar/ChoosedMonth/ChoosedMonth';
import ChoosedDay from './Calendar/ChoosedDay/ChoosedDay';
import Page404 from './Page404/Page404';
import LoginWithToken from './LoginWithToken';

// const StartPage = lazy(() => import('pages/Start/StartPage'));
// const LoginPage = lazy(() => import('pages/Login/LoginPage'));
// const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));

const AccountPage = lazy(() => import('pages/Account/AccountPage'));
const CalendarPage = lazy(() => import('pages/Calendar/CalendarPage'));
// const MainLayout = lazy(() => import('pages/MainLayout/MainLayout'));


export const App = () => {
  return (
    <Suspense fallback={''}>
      <Routes>
        <Route>
          <Route path="" element={<PublicRoute />}>
            <Route index element={<StartPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login/:token" element={<LoginWithToken />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="" element={<MainLayout />}>
              <Route path="calendar" element={<Suspense fallback={<>...</>}><CalendarPage /></Suspense>}>
                <Route path="month/:currentDate" element={<ChoosedMonth />} />
                <Route path="day/:currentDay" element={<ChoosedDay />} />
              </Route>
              <Route path="account" element={<Suspense fallback={<>...</>}><AccountPage /></Suspense>} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
