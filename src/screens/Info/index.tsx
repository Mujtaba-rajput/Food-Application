import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const Info = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
    </>
  );
};

export default Info;
