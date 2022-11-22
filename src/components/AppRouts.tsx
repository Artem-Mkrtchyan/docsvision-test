import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes';
import { MAIN_PAGE } from '../utils/constants';
import { randomIndex } from '../utils/helperFunc';



export const AppRouter = React.memo (() => {
  return (
      <Routes>
        {publicRoutes.map(({ path, Element }) => <Route key={randomIndex()} path={path} element={<Element />} />)}
        <Route path='*' element={<Navigate to={MAIN_PAGE} replace />} />
      </Routes>
    )
})
