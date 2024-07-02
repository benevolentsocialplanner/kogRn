import AsyncStorage from '@react-native-async-storage/async-storage';

export const prefix = 'konusarakOgren';

const Storage = {
  setItem: async (key: string, value: string) => {
    try {
      const k = `${prefix}:${key}`;
      const v = {data: value};
      await AsyncStorage.setItem(k, JSON.stringify(v));

      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: async (key: string, defaultValue = false) => {
    try {
      const value = await AsyncStorage.getItem(`${prefix}:${key}`);
      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value).data;
    } catch (error) {
      return defaultValue;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${prefix}:${key}`);
    } catch (error) {
      return error;
    }
  },
  mergeItem: async (key: string, value: 'string') => {
    await AsyncStorage.mergeItem(
      `${prefix}:${key}`,
      JSON.stringify({data: value}),
    );
  },
  clear: async () => {
    const keys = await AsyncStorage.getAllKeys();
    const blackList: string | any[] = [];
    const appKeys = keys.filter(
      (key: string) =>
        Boolean(key.startsWith(`${prefix}:`)) && !blackList.includes(key),
    );

    await AsyncStorage.multiRemove(appKeys);
  },
  getAll: async () => {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter((key) => key.startsWith(`${prefix}:`));
    const appValues = await AsyncStorage.multiGet(appKeys);
    const values = appValues.map(([key, value]) => value);
    return values;
  }
};

export default Storage;