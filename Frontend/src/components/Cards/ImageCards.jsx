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
  gap:10px;
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
  font-weight: 600px;
  font-size: 20px;
  color: ${({ theme }) => theme.white};
`;
const Author = styled.div`
  font-weight: 400px;
  font-size: 16px;
  display: flex;
  gap: 5px;
  align-items: center;
  color: ${({ theme }) => theme.secondary};
`;

function ImageCards({item}) {
    return (
        <Card>
            <LazyLoadImage
                style={{borderRadius: "15px"}}
                width={"100%"}
                src= {item?.photo}
                alt={item?.prompt}
            />
            <HoverOverlay>
                <Prompt>{item?.prompt}</Prompt>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                }}>

                    <Author sx={{ width: "32px", height: "32px" }}>
                        <Avatar>{item?.author[0]}</Avatar>
                        {item?.author}
                    </Author>
                    <DownloadRounded  onClick={()=>FileSaver.saveAs(item?.photo ,"download.jpg")} />
                </div>
            </HoverOverlay>
        </Card>
    );
}

export default ImageCards;
