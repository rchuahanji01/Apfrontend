
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LogInpage';
import Dashboard from './pages/Dashboard';
import UploadInvoice from './pages/UploadInvoice';
import PurchaseRequest from './pages/PurchaseRequest';
import Approvals from './pages/Approval';
// import ConfigManager from './pages/ConfigManager';
// import ContactList from './pages/ContactList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Dashboard />}>
        <Route path="uploadInvoice" element={<UploadInvoice />} /> 
         <Route path="purchaseRequest" element={<PurchaseRequest />} />
         <Route path="approvals" element={<Approvals />} />
        {/* <Route path="config" element={<ConfigManager />} />
        <Route path="contacts" element={<ContactList />} />    */}
      </Route>
    </Routes>
  );
}

export default App;
