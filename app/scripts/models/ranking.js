'use strict';

var Ranking = (function () {

	var Ranking = function Ranking(data) {
	};

	Ranking.prototype = {
		getRankingOptions: function getRankingOptions() {
			return {
				good: 'Good',
				better: 'Better',
				best: 'Best'
			};
		}
	};

	return Ranking;

}());
