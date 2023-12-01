import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootLayout = lazy(() => import('@layout/RootLayout'));
const MainPage = lazy(() => import('@pages/MainPage'));
const JobPage = lazy(() => import('@pages/JobPage'));
const StudyPage = lazy(() => import('@pages/StudyPage'));
const MyPage = lazy(() => import('@pages/MyPage'));
const CommunityPage = lazy(() => import('@pages/CommunityPage'));
const IntroductionPage = lazy(() => import('@pages/IntroductionPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path="job" element={<JobPage />} />
      <Route path="study" element={<StudyPage />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route path="introduction" element={<IntroductionPage />} />
    </Route>
  )
);
export default router;
