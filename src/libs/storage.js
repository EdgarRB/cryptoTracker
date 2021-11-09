import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = new Storage();

    add = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.log("Error adding", err);
            return false;
        }
    };

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log("Error on get:", err);
            throw Error(err);
        }
    };

    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (err) {
            console.log("Error on remove:", err);
            return false;
        }
    };

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (err) {
            console.log("Error getting all keys:", err);
            throw Error(err);
        }
    };

    getAll = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log("Error on multi get:", err);
            throw Error(err);
        }
    };
}
export default Storage;
