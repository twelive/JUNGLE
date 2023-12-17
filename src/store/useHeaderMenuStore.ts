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
  { '/community': '커뮤니티.' },
  { '/study': '공부.' },
  { '/introduction': '프로젝트.' },
  { '/introduction/team': '팀 소개.' },
];

const useHeaderMenuStore = create<State>((set) => ({
  currentMenu: '내 활동.',
  setCurrentMenu: (path) =>
  set(() => {
    const originMenu = HeaderMenuName.find((menu) => menu[path]);
    
    const paramsPath = path.substring(0, path.lastIndexOf('/'));
    const paramsMenu = HeaderMenuName.find((menu) => menu[paramsPath]);

    return {
      currentMenu: (originMenu && originMenu[path]) || (paramsMenu && paramsMenu[paramsPath]) || '경로오류',
    };
  }),
}));

export default useHeaderMenuStore;
