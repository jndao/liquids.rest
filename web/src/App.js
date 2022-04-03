import React, { useState, useEffect } from 'react';

import { useColorScheme, useClipboard } from '@mantine/hooks';
import { Button, Select, Loader } from '@mantine/core';

import axios from 'axios';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import { lightTheme, darkTheme } from './theme';

import AppWrapper, { GlobalStyle, RequestFormWrapper } from './App.styled';

function App() {
  const colorScheme = useColorScheme();

  return (
    <StyledThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <MantineProvider theme={{ colorScheme: (colorScheme === 'dark' ? 'dark' : 'light')}}>
        <GlobalStyle />
        <AppWrapper>
          <h1>🫗 Liquids Rest API</h1>
          <div className='caption'>
            A rest api for random facts about liquids.
            <br />
            <br />
            Made by
            <Button 
              component='a'
              variant="subtle" 
              compact 
              href='https://johndao.com' 
              target="_blank"
              rel="noopener noreferrer"
            >
              John
            </Button> 
            and inspired by the
            <Button 
              component='a'
              variant="subtle" 
              compact 
              href='https://kanye.rest' 
              target="_blank"
              rel="noopener noreferrer"
            >
              Kanye Rest Api
            </Button>
            .
          </div>

          <h2>Demo</h2> 
          <RequestForm />
        </AppWrapper>
      </MantineProvider>
    </StyledThemeProvider>
  );
}

function RequestForm() {
  const clipboard = useClipboard({ timeout: 2000 });
  
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.liquids.rest' : 'http://localhost:4000';
  
  const [types, setTypes] = useState(false);
  const [selectedType, setSelectedType] = useState(false);
  const [selectedDataResult, setSelectedDataResult] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingQuote, setLoadingQuote] = useState(false);

  useEffect(() => {
    const getTypes = async () => {
      const response = await axios({
        method: 'get',
        url: baseUrl
      })
      setTypes(response.data.types);
      setSelectedType(response.data.types[0]);
      setLoading(false);
    }
    getTypes();
  }, [baseUrl])
  
  useEffect(() => {
    const getSelectedType = async () => {
      setLoadingQuote(true);
      const response = await axios({
        method: 'get',
        url: baseUrl + '?type=' + selectedType
      })
      
      setSelectedDataResult(response.data.fact);
      setLoadingQuote(false);
    }
    if (selectedType) {
      getSelectedType();
    }

  }, [baseUrl, selectedType])
  
  const setTypeSelect = (value) => {
    setSelectedType(value);
  }

  if (!loading) {
    return (
      <RequestFormWrapper>
        <Button 
          component='a'
          variant="subtle" 
          compact 
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {baseUrl}
        </Button>
        <Select
          label="Select your liquid type"
          placeholder={selectedType}
          data={types}
          sx={{
            maxWidth: '400px',
            margin: '10px 0px',
          }}
          onChange={setTypeSelect}
        />
        <div className='outputTypeContainer'>
          Click below to copy request url
          <Button 
            color={clipboard.copied ? 'teal' : 'gray'} 
            onClick={() => clipboard.copy(baseUrl + '?type=' + selectedType)}
          >
            {clipboard.copied ? 'Copied' : baseUrl + '?type=' + selectedType}
          </Button>
          <span className='dataResult'>
            {loadingQuote ? <Loader /> : `"${selectedDataResult}"`}
          </span>
        </div>
      </RequestFormWrapper>
    );
  }
}
export default App;
