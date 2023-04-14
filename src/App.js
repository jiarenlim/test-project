import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import AuthPage from './AuthPage1';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* <Route exact path="/home" component={} />
        <Route exact path="/auth" component={AuthPage} /> */}
          <Route path="/auth" element={<AuthPage />} />
          <Route index element={<AuthPage />} />

          {/* <Route index element={<AuthPage/>} /> */}
          <Route path="Home" element={<HomePage />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;















