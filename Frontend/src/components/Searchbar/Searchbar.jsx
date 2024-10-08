import React from 'react'
import styled from 'styled-components'
import { SearchOutlined } from '@mui/icons-material'

const SearchBarContainer = styled.div`
    display: flex;
    max-width: 550px;
    width: 90%;
    height: 60px;
    border:1px solid ${({ theme }) => theme.text_secondary + 90 };
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px
    cursor: pointer;
    align-items: center;
    gap: 6px;
`

function Searchbar({search, setSearch}) {
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
            height: '40px',
            fontSize: '20px',
            backgroundColor: 'transparent',
            color   : "inherit"
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    </SearchBarContainer>
  )
}

export default Searchbar