getArray = (item) ->
  if item instanceof Array
    item
  else if item isnt undefined
    [item]
  else
    []

# Storage array, with some helper methods
storage = []
storage.indexOf = (key) ->
  for item, index in this
    [item_key] = getArray item
    return index if key is item_key
  return -1
  
storage.valueAt = (index) ->
  [key, value] = getArray this[index]
  return value
  
storage.keyAt = (index) ->
  [key] = getArray this[index]
  return key

module.exports = class Hash
  constructor: (entries = []) ->
    if entries instanceof Array
      for entry in entries
        @set entry...
    else if entries instanceof Object
      for own key, value of entries
        @set key, value
    else if arguments.length
      @set arguments...
        
  set: (key, value) ->
    if index = storage.indexOf(key) >= 0
      storage[index][1] = value;
    else
      storage.push [key, value]
    value
    
  get: (key) ->
    storage.valueAt(storage.indexOf key)
  
  remove: (key) ->
    index = storage.indexOf key
    if index >= 0
      ret = @get(key)
      storage = storage.slice(0, index).concat(storage.slice index+1)
    else
      ret = false
    ret
  
  forEach: (callback) ->
    for item in storage
      callback item...
  
  Object.defineProperty Hash::, 'length',
    get: -> storage.length