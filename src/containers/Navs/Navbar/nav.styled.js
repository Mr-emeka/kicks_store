import styled from "styled-components";

export const NavbarContainer = styled.nav`
  height: 8vh;
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 2em;

  ul {
    font-size: 1.05em;
    li {
      float: left;
      list-style-type: none;
      padding: 0 0.7em;
      cursor: pointer;
    }
    a {
      color: black;
      text-decoration: none;
      &:hover {
        color: grey;
      }
    }
  }
`;
export const NavBrand = styled.h3`
  font-size: 1.3em;
  color: grey;
  cursor: pointer;
  a {
    color:black;
    text-decoration: none;
    &:hover {
      color: black;
    }
  }
`;
