import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import TextInput from "../Inputs/TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { generateImage, createPost } from "../../api/index.js";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 668px) {
    margin-top: 200px;
  }
  @media (min-width: 669px) {
    margin-top: 20px;
  }
`;

const Top = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const Tittle = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Action = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const Desc = styled.div`
  font-size: 19px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

function GenForm({
  post,
  setPost,
  createPostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  setCreatePostLoading,
}) {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    await generateImage({ prompt: post.prompt })
      .then((res) => {
        setPost({ ...post, photo: `data:image/jpeg;base64,${res.data?.photo}` });
        setGenerateImageLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setGenerateImageLoading(false);
        console.log(err);
      });
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
    await createPost(post)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setCreatePostLoading(false);
        console.log(err);
      });
  };

  return (
    <Form>
      <Top>
        <Tittle>Generate Image</Tittle>
        <Desc>Write your prompt according to the Image You want</Desc>
      </Top>
      <Body>
        <TextInput
          label="name"
          name="name"
          placeholder="Enter your name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Enter the prompt That Your want to Generate the image..."
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        **Your can post Your Generated Image to the Community**
      </Body>
      <Action>
        <Button
          text="Generate Image"
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          flex
          leftIcon={<AutoAwesome />}
          onClick={() => generateImageFun()}
        />
        <Button
          text="Post Image"
          flex
          type="secondary"
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          leftIcon={<CreateRounded />}
          onClick={() => createPostFun()}
        />
      </Action>
    </Form>
  );
}

export default GenForm;