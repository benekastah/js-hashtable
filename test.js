(function() {
  var Hash, QHash, hash, hkey, _ref;
  _ref = require('hashtable'), Hash = _ref.Hash, QHash = _ref.QHash;
  hkey = Hash.key;
  hash = new Hash();
  hash[hkey([1, 2, 3, 4])] = "asdf";
  console.log(hkey([1, 2, 3, 4]) === hkey([1, 2, 3, 4]));
  console.log(hkey({
    a: 'b',
    c: 'd'
  }) === hkey({
    c: 'd',
    a: 'b'
  }));
  console.log(hkey({
    a: {
      b: {
        c: 'd',
        e: 'f'
      }
    },
    g: 'h'
  }) === hkey({
    g: 'h',
    a: {
      b: {
        e: 'f',
        c: 'd'
      }
    }
  }));
  console.log(hkey(NaN) === hkey(NaN));
}).call(this);
