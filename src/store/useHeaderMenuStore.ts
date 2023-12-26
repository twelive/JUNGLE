import HeaderMenu from '@components/Header/HeaderMenu';
import { create } from 'zustand';

interface State {
  currentMenu: string;
  setCurrentMenu: (path: string) => void;
}

interface HeaderMenu {
  [key: string]: string;
}

const HeaderMenuName: HeaderMenu[] = [
  { '/mypage': '내 활동.' },
  { '/job': '취업.' },
  { '/job/interview': '취업.' },
  { '/job/codingTest': '취업.' },
  { '/community': '커뮤니티.' },
  { '/detailPage/project': '커뮤니티.' },
  { '/detailPage/study': '커뮤니티.' },
  { '/study': '공부.' },
  { '/study/stack/ListTable': '공부.' },
  { '/study/stack/detail': '공부.' },
  { '/study/stack/StackNewPage': '공부.' },
  { '/introduction': '프로젝트.' },
  { '/introduction/team': '팀 소개.' },
];

const useHeaderMenuStore = create<State>((set) => ({
  currentMenu: '내 활동.',
  setCurrentMenu: (path) => set(() => {
    if (path.includes('/resume')) return { currentMenu: '이력서.' };

    const exactMatch = HeaderMenuName.find((menu) => menu[path]);
    const paramsPath = path.substring(0, path.lastIndexOf('/'));
    const paramsMatch = HeaderMenuName.find((menu) => menu[paramsPath]);

    return {
      currentMenu: (exactMatch && exactMatch[path]) || (paramsMatch && paramsMatch[paramsPath]) || '경로오류',
    };
  }),
}));

export default useHeaderMenuStore;
