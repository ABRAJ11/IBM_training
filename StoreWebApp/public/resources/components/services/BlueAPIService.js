app.service('BlueAPIService', ['$http', function($http) {

	var invokeService = function(restUrl,
			requestType, parameters, successCallback,
			errorCallback, access_token) {

        baseURL = "https://api.us.apiconnect.ibmcloud.com/centusibmcom-cloudnative-integration/bluecompute/"

		//$http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

		if (requestType == 'GET') {
			$http({
          //headers: {
          //  "X-IBM-Client-Id" : "59563f83-1f52-4e87-87e9-4b07414a1f27"
          //},
				  method: 'GET',
				  url: restUrl
				}).then(successCallback, errorCallback);
		}
		else if (requestType == 'DELETE'){
			$http({
					method: 'DELETE',
					url: restUrl
				}).then(successCallback, errorCallback);
		}else if (requestType == 'POST_AUTH'){
			$http({
				headers: {
				//	"Content-Type": 'application/x-www-form-urlencoded'
					"Authorization": 'Bearer '+ access_token
				},
				method: 'POST',
				url: restUrl,
				data: parameters
				}).then(successCallback, errorCallback);
		}
		else {
			$http({
					headers: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					url: restUrl,
					data: parameters
				}).then(successCallback, errorCallback);
		}
	}
		return  {
			getCatalog : function(successCallback, errorCallback) {
				var restUrl = 'catalog/';
				var requestType = 'GET';
				invokeService(restUrl, requestType, null, successCallback, errorCallback);
			},
			getItemById : function(itemId, successCallback, errorCallback) {
				var restUrl = 'catalog/' + itemId;
				var requestType = 'GET';
				invokeService(restUrl, requestType, null, successCallback, errorCallback);
			},
			getItemReviewById : function(itemId, successCallback, errorCallback) {
				var restUrl = 'review/' + itemId;
				var requestType = 'GET';
				invokeService(restUrl, requestType, null, successCallback, errorCallback);
			},
			loginUser : function(parameters, successCallback, errorCallback) {
				var restUrl = 'https://api.us.apiconnect.ibmcloud.com/centusibmcom-cloudnative-integration/bluecompute/oauth20/token';
				var requestType = 'POST';
				invokeService(restUrl, requestType, parameters, successCallback, errorCallback);
			},
			buyItems : function(access_token, parameters, successCallback, errorCallback) {
				var restUrl = 'order/';
				var requestType = 'POST_AUTH';
				invokeService(restUrl, requestType, parameters, successCallback, errorCallback, access_token);
			},
			addReviewItem : function(access_token, itemId, parameters, successCallback, errorCallback) {
				var restUrl = 'review/' + itemId;
				var requestType = 'POST_AUTH';
				invokeService(restUrl, requestType, parameters, successCallback, errorCallback, access_token);
			}
		}
}]);
