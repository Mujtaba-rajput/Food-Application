import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import styles from './favourites.style';

const Favourites = () => {
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.text}>Favourites Screen</Text>
      </SafeAreaView>
    </>
  );
};

export default Favourites;
