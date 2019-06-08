'use strict';

var Certification = (function () {

	var Certification = function Certification(data) {
		// @TODO: Currently there is no certification data, so this is all speculation...
		this.description = data.hasOwnProperty('description') ? data.description : null;
		this.image = data.hasOwnProperty('image') ? data.image : null;
		this.name = data.hasOwnProperty('name') ? data.name : null;
	};

	Certification.prototype = {
		getName: function getName() {
			return this.name;
		},

		getDescription: function getDescription() {
			return this.description;
		},

		hasImage: function hasImage() {
			return this.image !== null;
		},

		getImage: function getImage() {
			return this.image;
		}
	};

	return Certification;

}());
