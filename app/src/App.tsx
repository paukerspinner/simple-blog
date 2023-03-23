import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { IRoute, routes } from './utils/routes';
import { Box } from '@mui/material';

function App() {
  return (
    <Box mt={4}>
      <BrowserRouter>
        <Routes>
          {routes.map((route: IRoute, idx: number) => {
            return (
              <Route key={idx} path={route.path} element={route.element} />
            )
          })}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
