import React, { useState } from "react";
import styled from "styled-components";
import GenForm from "../components/Form/GenForm";
import GenImageCard from "../components/GenImageCard/GenImageCard";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media only screen and (max-width: 600px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  height: fit-content;
  gap: 8%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
function CreatePost() {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <Container>
      <Wrapper>
        <GenForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          generateImageLoading={generateImageLoading}
          setGenerateImageLoading={setGenerateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
        />
        <GenImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
}

export default CreatePost;
