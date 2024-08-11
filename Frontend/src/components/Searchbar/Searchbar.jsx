import React from 'react'
import styled from 'styled-components'
import { SearchOutlined } from '@mui/icons-material'

const SearchBarContainer = styled.div`
    display: flex;
    max-width: 550px;
    width: 90%;
    height: 40px;
    border:1px solid ${({ theme }) => theme.text_secondary + 90 };
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px
    cursor: pointer;
    align-items: center;
    gap: 6px;
`

function Searchbar() {
  return (
    <SearchBarContainer>
        <SearchOutlined/>
        <input
        type="text"
        placeholder="Search for images"
        style={{
            border: 'none',
            outline: 'none',
            width: '90%',
            height: '100%',
            fontSize: '20px',
            backgroundColor: 'transparent',
            color   : "inherit"
        }}
        />
    </SearchBarContainer>
  )
}

export default Searchbar