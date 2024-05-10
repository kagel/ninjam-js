class SimpleLocalStorage {
  static setItem(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }

  static getItem(key) {
    return new Promise((resolve, reject) => {
      try {
        const item = window.localStorage.getItem(key);
        if (item === null) {
          reject(new Error('Key not found in storage'));
        } else {
          resolve(JSON.parse(item));
        }
      } catch (error) {
        reject(new Error('Error getting item from localStorage:', error));
      }
    });
  }

  static removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }

  static clear() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// Check if `localStorage` is supported and export the implementation
if (typeof window.localStorage === 'object') {
  module.exports = SimpleLocalStorage;
} else {
  // Throw an error if localStorage is not available
  throw new Error('No local storage implementation found!');
}
