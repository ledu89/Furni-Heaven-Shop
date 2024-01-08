import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="hero-img" />
        <article>
          <div className="title">our story</div>
          <div className="underline"></div>
          <p>
            {" "}
            Consequat ipsum cillum fugiat qui. Duis do ea deserunt culpa officia
            aute deserunt tempor et fugiat ullamco ex. Dolor Lorem nulla irure
            cillum Lorem. Fugiat culpa exercitation pariatur in mollit do
            consectetur id sit ut dolore. Occaecat consequat quis consequat eu
            ipsum qui qui mollit pariatur do elit irure aliqua. Id laborum sit
            eu dolor. Voluptate labore veniam Lorem quis excepteur ullamco
            reprehenderit consectetur.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
