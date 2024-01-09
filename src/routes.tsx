import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootLayout = lazy(() => import('@layout/RootLayout'));
const LandingPage = lazy(() => import('@pages/LandingPage/LandingPage'));
const MainPage = lazy(() => import('@pages/MainPage'));
const JobSeekPage = lazy(() => import('@pages/JobPage/JobSeekPage'));
const JobInterviewPage = lazy(() => import('@pages/JobPage/JobInterviewPage'));
const JobInterviewItemPage = lazy(
  () => import('@pages/JobPage/JobInterviewItemPage')
);
const JobCodingTestPage = lazy(
  () => import('@pages/JobPage/JobCodingTestPage')
);
const JobCodingTestItemPage = lazy(
  () => import('@pages/JobPage/JobCodingTestItemPage')
);
const JobCodingTestCreatePage = lazy(
  () => import('@pages/JobPage/JobCodingTestCreatePage')
);
const JobInterviewCreatePage = lazy(
  () => import('@pages/JobPage/JobInterviewCreatePage')
);
const StudyPage = lazy(() => import('@pages/StudyPage/StudyPage'));
const MyPage = lazy(() => import('@pages/MyPage/MyPage'));
const MyResumePage = lazy(() => import('@pages/MyPage/MyResumePage'));
const CommunityPage = lazy(() => import('@pages/CommunityPage/CommunityPage'));
const CommunityCreatePage = lazy(
  () => import('@/pages/CommunityPage/CommunityCreatePage')
);
const IntroductionProjectPage = lazy(
  () => import('@pages/IntroductionPage/IntroductionProjectPage')
);
const IntroductionTeamPage = lazy(
  () => import('@pages/IntroductionPage/IntroductionTeamPage')
);
const CommunityDetailPage = lazy(
  () => import('@pages/CommunityPage/CommunityDetailPage')
);
const ErrorPage = lazy(() => import('@pages/ErrorPage'));
const StackDetailPage = lazy(() => import('@pages/StudyPage/StackDetailPage'));
const StackListlPage = lazy(() => import('@pages/StudyPage/StackListlPage'));
const StackNewPage = lazy(() => import('@pages/StudyPage/StackNewPage'));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="main" element={<MainPage />} />
      <Route path="/job" element={<JobSeekPage />} />
      <Route path="/job/interview" element={<JobInterviewPage />} />
      <Route path="/job/interview/:id" element={<JobInterviewItemPage />} />
      <Route
        path="/job/interview/create"
        element={<JobInterviewCreatePage />}
      />
      <Route path="/job/codingTest" element={<JobCodingTestPage />} />
      <Route path="/job/codingTest/:id" element={<JobCodingTestItemPage />} />
      <Route
        path="/job/codingTest/create"
        element={<JobCodingTestCreatePage />}
      />

      <Route path="study" element={<StudyPage />} />
      <Route path="mypage/:userId" element={<MyPage />} />
      <Route path="mypage/:userId/resume" element={<MyResumePage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route
        path="community/communitycreate"
        element={<CommunityCreatePage />}
      />
      <Route
        path="/detailPage/:dataType/:itemId"
        element={<CommunityDetailPage />}
      />
      <Route path="introduction" element={<IntroductionProjectPage />} />
      <Route path="introduction/team" element={<IntroductionTeamPage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/study/stack/detail/:itemId" element={<StackDetailPage />} />
      <Route path="/study/stack/ListTable" element={<StackListlPage />} />
      <Route path="/study/stack/StackNewPage" element={<StackNewPage />} />
    </Route>
  )
);
export default router;
