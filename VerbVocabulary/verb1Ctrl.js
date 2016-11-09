angular.module('ionicApp')
	.controller('verb1Ctrl', function($scope) {
		
		var getRandomInt=function(min, max){
				return Math.floor(Math.random() * (max - min + 1)) + min;
			};

		var chooseDictionary=function (){
				var randomIndex=getRandomInt($scope.randomStart,$scope.randomEnd);
				while($scope.chooseIndex.indexOf(randomIndex)!=-1)
				{
					  randomIndex=getRandomInt($scope.randomStart,$scope.randomEnd);
				}
				$scope.chooseIndex.push(randomIndex);
				
				var randomTitle =  $scope.vocabulary.filter(function(item) {
					return item.number == randomIndex
					});
				randomTitle[0]["randomFlag"]=true;
				
				var currentTitle =  $scope.vocabulary.filter(function(item) {
					return item.number == $scope.vocabulary2[0]["number"];
					});
				
				if(currentTitle.length>0)
				{
					currentTitle[0]["randomFlag"]=true;
				}
				
				if(randomTitle.length==0)
				{
					return undefined;
				}
				else
				{
					return randomTitle[0];
				}
			};

		$scope.nextDictionary = function(){
				var randomDictionary = chooseDictionary();	
				if(randomDictionary!=undefined){
					//$scope.title2=randomTitle[0];
					$scope.vocabulary2=[];
					$scope.vocabulary2.push(randomDictionary);
					$scope.showEnglish=false; 
					var exist =  $scope.vocabulary.filter(function(item) {
					   return item["randomFlag"] == false;
					});
					  
					setTimeout(function(){ 
						angular.element(document.querySelector('#txtEnglish1').focus()); 
					}, 1);		  
					if(exist.length==0){
					$scope.finishFlag=true;
					}
				}else{
					alert('undefine');
				}
			};
		$scope.randomStart=1;
		$scope.randomEnd=100;
		$scope.chooseIndex=[1];
		$scope.finishFlag=false;	
		$scope.displaySetting='eg';
		
		
		$scope.vocabulary2 = [{"number":1,"eg":"answer","ch":"應答.回答","txtEnglish":"","txtChinese":"","randomFlag":false}];
		$scope.vocabulary = [{"number":1,"eg":"answer","ch":"應答.回答","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":2,"eg":"arrive","ch":"到達","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":3,"eg":"ask","ch":"要求.問","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":4,"eg":"become","ch":"變成.成為","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":5,"eg":"begin","ch":"開始","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":6,"eg":"believe","ch":"相信","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":7,"eg":"break","ch":"破裂.分手","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":8,"eg":"bring","ch":"帶來","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":9,"eg":"build","ch":"建造","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":10,"eg":"buy","ch":"購買","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":11,"eg":"call","ch":"呼叫.打電話","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":12,"eg":"carry","ch":"攜帶","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":13,"eg":"catch","ch":"捕捉","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":14,"eg":"change","ch":"改變","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":15,"eg":"close","ch":"關閉","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":16,"eg":"come","ch":"來","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":17,"eg":"continue","ch":"繼續","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":18,"eg":"cost","ch":"耗費","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":19,"eg":"cry","ch":"哭泣","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":20,"eg":"cut","ch":"切割","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":21,"eg":"die","ch":"死亡","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":22,"eg":"do","ch":"做","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":23,"eg":"drink","ch":"喝","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":24,"eg":"eat","ch":"吃","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":25,"eg":"end","ch":"結束","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":26,"eg":"enter","ch":"進入","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":27,"eg":"explain","ch":"解釋","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":28,"eg":"fall","ch":"掉落","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":29,"eg":"feel","ch":"感覺","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":30,"eg":"fight","ch":"爭執.打鬥","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":31,"eg":"find","ch":"發現","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":32,"eg":"finish","ch":"完成","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":33,"eg":"fix","ch":"修理","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":34,"eg":"get","ch":"得到","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":35,"eg":"give","ch":"給予","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":36,"eg":"go","ch":"去","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":37,"eg":"grow","ch":"成長","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":38,"eg":"happen","ch":"發生","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":39,"eg":"have","ch":"擁有","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":40,"eg":"hear","ch":"聽到","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":41,"eg":"help","ch":"協助","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":42,"eg":"hold","ch":"保持.支撐","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":43,"eg":"hope","ch":"希望","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":44,"eg":"hurt","ch":"傷害","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":45,"eg":"interest","ch":"讓人感興趣","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":46,"eg":"keep","ch":"繼續.維持","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":47,"eg":"know","ch":"知道.認識","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":48,"eg":"launch","ch":"發射.發動","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":49,"eg":"learn","ch":"學習.得知","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":50,"eg":"leave","ch":"離開.留下","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":51,"eg":"let","ch":"讓.使","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":52,"eg":"like","ch":"喜歡","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":53,"eg":"listen","ch":"傾聽","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":54,"eg":"live","ch":"生活","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":55,"eg":"look","ch":"看起來","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":56,"eg":"lose","ch":"遺失.喪失","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":57,"eg":"love","ch":"愛","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":58,"eg":"make","ch":"造成.達成","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":59,"eg":"mean","ch":"表達.意味著","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":60,"eg":"meet","ch":"見面.符合","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":61,"eg":"move","ch":"遷移","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":62,"eg":"need","ch":"需要","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":63,"eg":"open","ch":"打開.開放","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":64,"eg":"pay","ch":"付出","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":65,"eg":"plan","ch":"計畫","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":66,"eg":"put","ch":"放置","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":67,"eg":"rain","ch":"下雨","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":68,"eg":"read","ch":"閱讀","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":69,"eg":"ride","ch":"騎.乘","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":70,"eg":"run","ch":"經營.跑步","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":71,"eg":"say","ch":"說","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":72,"eg":"see","ch":"看見.明白","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":73,"eg":"sell","ch":"銷售","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":74,"eg":"send","ch":"送出","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":75,"eg":"sit","ch":"坐著","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":76,"eg":"sleep","ch":"睡覺","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":77,"eg":"speak","ch":"說話","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":78,"eg":"stand","ch":"站著","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":79,"eg":"start","ch":"開始","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":80,"eg":"stay","ch":"停留.逗留","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":81,"eg":"stop","ch":"停止","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":82,"eg":"study","ch":"研修.研讀","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":83,"eg":"take","ch":"取得.拿到","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":84,"eg":"talk","ch":"說話.交談","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":85,"eg":"teach","ch":"教學.教導","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":86,"eg":"tell","ch":"告訴.辨別","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":87,"eg":"think","ch":"想.認為","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":88,"eg":"touch","ch":"接觸","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":89,"eg":"try","ch":"嘗試","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":90,"eg":"turn","ch":"翻轉","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":91,"eg":"use","ch":"使用","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":92,"eg":"wake","ch":"甦醒","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":93,"eg":"walk","ch":"走路","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":94,"eg":"want","ch":"想要","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":95,"eg":"wash","ch":"洗滌","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":96,"eg":"work","ch":"工作","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":97,"eg":"write","ch":"書寫","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":98,"eg":"understand","ch":"理解","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":99,"eg":"visit","ch":"拜訪","txtEnglish":"","txtChinese":"","randomFlag":false}
					,{"number":100,"eg":"wrap","ch":"包裝.纏繞","txtEnglish":"","txtChinese":"","randomFlag":false}];		
	});