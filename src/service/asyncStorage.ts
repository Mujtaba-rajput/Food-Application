import AsyncStorage from "@react-native-async-storage/async-storage";

// Function: Reterive Data from AsyncStorage (In Device Cache)
const getStorageData = async (key: string) => {
  try {
    const stringifyData: any = await AsyncStorage.getItem(key);
    const data = JSON.parse(stringifyData);
    return data;
  } catch (e) {
    console.log("Failed to fetch the data from storage");
  }
};

// Function: Save Data in AsyncStorage (In Device Cache)
const setStorageData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

// Function: Remove Data from AsyncStorage (In Device Cache)
const removeStorageData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export { getStorageData, setStorageData, removeStorageData };
