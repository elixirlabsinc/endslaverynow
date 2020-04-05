'use strict';

var Certification = (function () {

  // @TODO: This will act as a template for the JSON
  var Certification = function Certification(data) {
    var self = this;
    this.name = data.hasOwnProperty('name') ? data.name : null;
    this.paragraphs = [];
    if (data.hasOwnProperty('paragraphs') && Array.isArray(data.paragraphs)) {
      data.paragraphs.forEach(
        function (oneParagraph) {
          if (typeof oneParagraph === 'string') {
            self.paragraphs.push(oneParagraph);
          }
        }
      );
    }

    this.headingUrl = data.hasOwnProperty('headingUrl') ? data.headingUrl : null;
    this.images = [];
    if (data.hasOwnProperty('images') && Array.isArray(data.images)) {
      data.images.forEach(
        function (oneImage) {
          if (typeof oneImage === 'string') {
            self.images.push(oneImage);
          }
        }
      );
    }
  };

  Certification.prototype = {
    getName: function getName() {
      return this.name;
    },

    getParagraphs: function getParagraphs() {
      return this.paragraphs;
    },

    getHeadingUrl: function getHeadingUrl() {
      return this.headingUrl;
    },

    hasImages: function hasImages() {
      return this.images.length > 0;
    },

    getImages: function getImages() {
      return this.images;
    }
  };

  return Certification;

}());
