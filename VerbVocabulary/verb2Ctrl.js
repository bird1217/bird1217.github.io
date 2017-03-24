angular.module('ionicApp')
	.controller('verb2Ctrl', function($scope) {
		
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
						angular.element(document.querySelector('#txtEnglish').focus()); 
					}, 1);		  
					if(exist.length==0){
					$scope.finishFlag=true;
					}
				}else{
					alert('undefine');
				}
			};
		$scope.randomStart=1;
		$scope.randomEnd=108;
		$scope.chooseIndex=[1];
		$scope.finishFlag=false;	
		$scope.displaySetting='eg';
		
		
		$scope.vocabulary2 = [{"number":1,"eg":"accept","ch":"接受","txtEnglish":"","txtChinese":"","randomFlag":false}];
		$scope.vocabulary = [{"number":1,"eg":"accept","ch":"接受","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":2,"eg":"act","ch":"行動","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":3,"eg":"add","ch":"加上","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":4,"eg":"agree","ch":"同意","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":5,"eg":"allow","ch":"允許","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":6,"eg":"appear","ch":"出現","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":7,"eg":"attempt","ch":"企圖","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":8,"eg":"attend","ch":"出席","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":9,"eg":"beat","ch":"打擊","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":10,"eg":"blow","ch":"吹","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":11,"eg":"borrow","ch":"借貸","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":12,"eg":"cause","ch":"造成","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":13,"eg":"choose","ch":"選擇","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":14,"eg":"collect","ch":"收集","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":15,"eg":"complete","ch":"完成","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":16,"eg":"consider","ch":"考慮","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":17,"eg":"contain","ch":"包含","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":18,"eg":"control","ch":"控制","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":19,"eg":"cook","ch":"烹煮.下廚","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":20,"eg":"cross","ch":"穿越","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":21,"eg":"count","ch":"數","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":22,"eg":"cover","ch":"覆蓋","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":23,"eg":"dance","ch":"跳舞","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":24,"eg":"decide","ch":"決定","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":25,"eg":"disappear","ch":"消失","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":26,"eg":"discover","ch":"發現","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":27,"eg":"divide","ch":"使分開","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":28,"eg":"doubt","ch":"疑慮","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":29,"eg":"draw","ch":"描繪.拖.拉","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":30,"eg":"dream","ch":"夢想","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":31,"eg":"dress","ch":"著裝.穿上","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":32,"eg":"drive","ch":"驅使.駕馭","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":33,"eg":"drop","ch":"滴下.扔下","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":34,"eg":"enjoy","ch":"享受","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":35,"eg":"exist","ch":"存在","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":36,"eg":"expect","ch":"期望","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":37,"eg":"fail","ch":"失敗","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":38,"eg":"fill","ch":"填補","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":39,"eg":"fit","ch":"組.合","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":40,"eg":"flow","ch":"流動","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":41,"eg":"fly","ch":"飛翔","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":42,"eg":"guess","ch":"猜想","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":43,"eg":"hang","ch":"吊掛","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":44,"eg":"hurry","ch":"趕快","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":45,"eg":"hate","ch":"憎惡","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":46,"eg":"improve","ch":"增進","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":47,"eg":"include","ch":"包括","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":48,"eg":"introduce","ch":"介紹","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":49,"eg":"invite","ch":"邀請.召喚","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":50,"eg":"join","ch":"加入","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":51,"eg":"kill","ch":"扼殺","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":52,"eg":"lead","ch":"引導","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":53,"eg":"lend","ch":"借出去","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":54,"eg":"lift","ch":"提升","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":55,"eg":"marry","ch":"娶.嫁","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":56,"eg":"notice","ch":"注意","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":57,"eg":"obtain","ch":"贏得.獲得","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":58,"eg":"offer","ch":"提供","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":59,"eg":"order","ch":"命令.訂購","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":60,"eg":"own","ch":"擁有","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":61,"eg":"pass","ch":"通過","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":62,"eg":"permit","ch":"准許","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":63,"eg":"pick","ch":"挑","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":64,"eg":"point","ch":"指出","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":65,"eg":"pour","ch":"傾倒","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":66,"eg":"practice","ch":"練習","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":67,"eg":"prepare","ch":"準備","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":68,"eg":"promise","ch":"應許.答應","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":69,"eg":"prove","ch":"證實","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":70,"eg":"provide","ch":"供應","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":71,"eg":"pull","ch":"拉扯","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":72,"eg":"push","ch":"推動","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":73,"eg":"reach","ch":"伸出手.實現","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":74,"eg":"realize","ch":"領悟","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":75,"eg":"receive","ch":"收到","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":76,"eg":"recognize","ch":"辨識","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":77,"eg":"refuse","ch":"拒絕","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":78,"eg":"remember","ch":"記得","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":79,"eg":"repeat","ch":"重複","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":80,"eg":"reply","ch":"回覆.回應","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":81,"eg":"report","ch":"報告","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":82,"eg":"require","ch":"要求","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":83,"eg":"return","ch":"返回","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":84,"eg":"rise","ch":"上升.升起來","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":85,"eg":"save","ch":"拯救.儲存","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":86,"eg":"search","ch":"搜尋","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":87,"eg":"seem","ch":"看起來.似乎","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":88,"eg":"separate","ch":"分開","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":89,"eg":"serve","ch":"服侍","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":90,"eg":"share","ch":"分享","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":91,"eg":"shout","ch":"喊.叫","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":92,"eg":"show","ch":"展現","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":93,"eg":"sign","ch":"簽署","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":94,"eg":"smell","ch":"聞起來","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":95,"eg":"spend","ch":"花用.消耗","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":96,"eg":"spread","ch":"散播","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":97,"eg":"succeed","ch":"成功.實現","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":98,"eg":"suggest","ch":"建議","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":99,"eg":"surround","ch":"圍繞","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":100,"eg":"taste","ch":"品嚐","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":101,"eg":"tear","ch":"撕.扯","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":102,"eg":"tie","ch":"捆綁","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":103,"eg":"travel","ch":"旅行","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":104,"eg":"wave","ch":"揮舞","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":105,"eg":"wear","ch":"穿戴.裝扮","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":106,"eg":"win","ch":"得勝.贏得","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":107,"eg":"wonder","ch":"琢磨.思索","txtEnglish":"","txtChinese":"","randomFlag":false}
							,{"number":108,"eg":"worry","ch":"擔憂","txtEnglish":"","txtChinese":"","randomFlag":false}];		
	});