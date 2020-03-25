'use strict';

var CollectionService = function () {
  this.alphabetize = function alphabetize(collection) {
    if (collection === undefined) {
      return [];
    }
    if (!Array.isArray(collection)) {
      return [collection];
    }
    collection.sort(function (a, b) {
      // Do a case-insensitive sort.
      var value1 = a.name.toLowerCase();
      var value2 = b.name.toLowerCase();
      return value1 > value2 ? 1 : value2 > value1 ? -1 : 0;
    });

    return collection;
  };
};
