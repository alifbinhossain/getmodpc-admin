import React from 'react';
import { AppForm } from '../_components/app-form';

function AddAppPage() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold tracking-tight '>
        Add New App
      </h1>
      <AppForm  />
    </div>
  );
}

export default AddAppPage;
