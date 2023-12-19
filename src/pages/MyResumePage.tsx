import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function MyResumePage() {

  return (
    <>
      <Helmet>MyResumePage - JUNGLE</Helmet>
      <h1>JUNGLE - 이력서 목록 페이지</h1>
      <Link to='detail'>이력서 상세 페이지로 이동</Link>
    </>
  )
}

export default MyResumePage