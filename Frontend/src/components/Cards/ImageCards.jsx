import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 12px;
  justify-content: flex-end;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  position: relative;
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position above the text */
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: 250px;
  white-space: normal;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  &::after {
    content: "";
    position: absolute;
    top: 100%; /* Arrow at the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.black} transparent transparent transparent;
  }
`;

const PromptWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
  }
`;

const Author = styled.div`
  font-weight: 400;
  font-size: 16px;
  display: flex;
  gap: 5px;
  align-items: center;
  color: ${({ theme }) => theme.secondary};
`;

function ImageCards({ post }) {
  return (
    <Card>
      <LazyLoadImage
        style={{ borderRadius: "15px" }}
        width={"100%"}
        src={post?.photo}
        alt={post?.prompt}
      />

      <HoverOverlay>
        <PromptWrapper>
          <Prompt>{post?.prompt}</Prompt>
          <Tooltip>{post?.prompt}</Tooltip>
        </PromptWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Author sx={{ width: "32px", height: "32px" }}>
            <Avatar>{post?.name[0]}</Avatar>
            {post?.name}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(post?.photo, "download.jpg")}
          />
        </div>
      </HoverOverlay>
    </Card>
  );
}

export default ImageCards;