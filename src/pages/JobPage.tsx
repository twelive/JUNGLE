import LoginModal from '@/components/LoginModal';
import { useAuthStore } from '@/store/useAuthStore';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';


function JobPage() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [allSizeModalShow, setAllSizeModalShow] =useState(false);
  const { handleLogout } = useAuthStore();

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(modalRef.current === e.target) {
      setAllSizeModalShow(false)
  }  }
  return (
    <>
      <Helmet>
        <title>Introduction - JUNGLE</title>
      </Helmet>
      <section>
        <button onClick={()=>{setAllSizeModalShow(true)}}>로그인</button>
        {allSizeModalShow &&  
          <LoginModal modalRef={modalRef} modalOutSideClick={modalOutSideClick}/>}
          <button onClick={handleLogout}>로그아웃</button>
        <h1>JobPage</h1>
   
      </section>
    </>
  );
}

export default JobPage;


