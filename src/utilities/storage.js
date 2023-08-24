const lStorage = {
  set: (key, val) => {
    let stringfyVal, encriptData;

    stringfyVal = JSON.stringify(val);

    encriptData = stringfyVal.toString();

    localStorage.setItem(key, encriptData);
  },

  get: (key) => {
    let val, bytes, originalText;

    val =
      typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem(key)
        : null;

    if (val) {
      bytes = val;
      originalText = bytes.toString();
      return JSON.parse(originalText);
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: (key) => {
    localStorage.clear(key);
  },
};

export { lStorage };
