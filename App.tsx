import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/query/queryClient';
import HomeScreen from './src/screens/HomeScreen';
import AddUserScreen from './src/screens/AddUser';

const App = () => {
  return (
    // Provide the client to your App

    <QueryClientProvider client={queryClient}>
      {/* <HomeScreen />
       */}
       <AddUserScreen/>
    </QueryClientProvider>
  );
};

export default App;
