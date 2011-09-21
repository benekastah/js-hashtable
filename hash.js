(function() {
  var Hash, getArray, storage;
  var __hasProp = Object.prototype.hasOwnProperty;
  getArray = function(item) {
    if (item instanceof Array) {
      return item;
    } else if (item !== void 0) {
      return [item];
    } else {
      return [];
    }
  };
  storage = [];
  storage.indexOf = function(key) {
    var index, item, item_key, _len;
    for (index = 0, _len = this.length; index < _len; index++) {
      item = this[index];
      item_key = getArray(item)[0];
      if (key === item_key) {
        return index;
      }
    }
    return -1;
  };
  storage.valueAt = function(index) {
    var key, value, _ref;
    _ref = getArray(this[index]), key = _ref[0], value = _ref[1];
    return value;
  };
  storage.keyAt = function(index) {
    var key;
    key = getArray(this[index])[0];
    return key;
  };
  module.exports = Hash = (function() {
    function Hash(entries) {
      var entry, key, value, _i, _len;
      if (entries == null) {
        entries = [];
      }
      if (entries instanceof Array) {
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
          entry = entries[_i];
          this.set.apply(this, entry);
        }
      } else if (entries instanceof Object) {
        for (key in entries) {
          if (!__hasProp.call(entries, key)) continue;
          value = entries[key];
          this.set(key, value);
        }
      } else if (arguments.length) {
        this.set.apply(this, arguments);
      }
    }
    Hash.prototype.set = function(key, value) {
      var index;
      if (index = storage.indexOf(key) >= 0) {
        storage[index][1] = value;
      } else {
        storage.push([key, value]);
      }
      return value;
    };
    Hash.prototype.get = function(key) {
      return storage.valueAt(storage.indexOf(key));
    };
    Hash.prototype.remove = function(key) {
      var index, ret;
      index = storage.indexOf(key);
      if (index >= 0) {
        ret = this.get(key);
        storage = storage.slice(0, index).concat(storage.slice(index + 1));
      } else {
        ret = false;
      }
      return ret;
    };
    Hash.prototype.forEach = function(callback) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = storage.length; _i < _len; _i++) {
        item = storage[_i];
        _results.push(callback.apply(null, item));
      }
      return _results;
    };
    Object.defineProperty(Hash.prototype, 'length', {
      get: function() {
        return storage.length;
      }
    });
    return Hash;
  })();
}).call(this);
