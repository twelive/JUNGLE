import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';


const RootLayout = lazy(() => import('@layout/RootLayout'));
const LandingPage = lazy(() => import('@pages/LandingPage'));
const MainPage = lazy(() => import('@pages/MainPage'));
const JobSeekPage = lazy(() => import('@pages/JobSeekPage'));
const JobInterviewPage = lazy(() => import('@pages/JobInterviewPage'));
const StudyPage = lazy(() => import('@pages/StudyPage'));
const MyPage = lazy(() => import('@pages/MyPage'));
const MyResumePage = lazy(() => import('@pages/MyResumePage'))
const CommunityPage = lazy(() => import('@pages/CommunityPage'));
const CommunityCreatePage = lazy(() => import('@/pages/CommunityCreatePage'));
const IntroductionProjectPage = lazy(
  () => import('@pages/IntroductionProjectPage')
);
const IntroductionTeamPage = lazy(() => import('@pages/IntroductionTeamPage'));
const CommunityDetailPage = lazy(() => import('@pages/CommunityDetailPage'));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="main" element={<MainPage />} />
      <Route path="/job" element={<JobSeekPage />} />
      <Route path="/job/interview" element={<JobInterviewPage />} />
      <Route path="study" element={<StudyPage />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="mypage/resume" element={<MyResumePage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route
        path="community/communitycreate"
        element={<CommunityCreatePage />}
      />
      <Route
        path="/detailPage/:dataType/:itemId"
        element={<CommunityDetailPage />}
      />
      <Route path="/introduction" element={<IntroductionProjectPage />} />
      <Route path="/introduction/team" element={<IntroductionTeamPage />} />
    </Route>
  )
);
export default router;
