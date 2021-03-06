'use strict';

var CardController = function ($scope, $modalInstance, colorOptions, card) {
	function initScope(scope, card, colorOptions){
		scope.name = card.name;
		scope.details = card.details;
		scope.card = card;
		scope.cardColor = card.color;
		scope.colorOptions = colorOptions;
	}

	$scope.close = function(){
		$modalInstance.close();
	};

	$scope.update = function(){
		if (!this.cardDetails.$valid){
			return false;
		}
		this.card.name = this.name;
		this.card.details = this.details;
		this.card.color = this.cardColor;

		$modalInstance.close(this.card);
	};

	initScope($scope, card, colorOptions);
};
