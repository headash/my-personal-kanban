'use strict';
var ApplicationController = function ($scope, $window, kanbanRepository) {
	$scope.colorOptions = ['FFFFFF','DBDBDB','FFB5B5', 'FF9E9E', 'FCC7FC', 'FC9AFB', 'CCD0FC', '989FFA', 'CFFAFC', '9EFAFF', '94D6FF','C1F7C2', 'A2FCA3', 'FAFCD2', 'FAFFA1', 'FCE4D4', 'FCC19D'];

	$scope.$on('ChangeCurrentKanban', function(){
		$scope.kanban = kanbanRepository.getLastUsed();
		$scope.allKanbans = Object.keys(kanbanRepository.all());
		$scope.selectedToOpen = $scope.kanban.name;
	});

	$scope.$on('Open', function(event, args){
		$scope.kanban = kanbanRepository.get(args.kanbanName);

		kanbanRepository.setLastUsed(args.kanbanName);
		kanbanRepository.save();
	});

	$scope.$on('KanbanDeleted', function(){
		$scope.kanban = undefined;
		$scope.allKanbans = Object.keys(kanbanRepository.all());
	});

	var currentKanban = new Kanban('Kanban name', 0);
	var loadedRepo = kanbanRepository.load();

	if (loadedRepo && kanbanRepository.getLastUsed() != undefined	) {
		currentKanban = kanbanRepository.getLastUsed();
	}

	$scope.kanban = currentKanban;
	$scope.allKanbans = Object.keys(kanbanRepository.all());
	$scope.selectedToOpen = currentKanban.name;

	$scope.$watch('kanban', function(){
		kanbanRepository.save();
	}, true);

	var windowHeight = angular.element($window).height() - 180;
	$scope.minHeightOfColumn =  'min-height:'+windowHeight+'px;';

	$scope.triggerOpen = function(){
		$scope.$broadcast('TriggerOpenKanban');
	}
};
