import { Link } from "react-router-dom"
import styled from "styled-components"

function GithubLink() {
  return (
    <Github to={'#'}>GithubLink</Github>
  )
}

export default GithubLink

const Github = styled(Link)`
  /* reset CSS */
  text-decoration: none;
  /* Style CSS */
  padding: 0.625rem 0.9375rem;
  background-color: var(--bs-black-200);
  border-radius: 0.625rem;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
`