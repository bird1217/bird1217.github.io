angular.module('ionicApp')
	.controller('HomeTabCtrl', function($scope) {
	
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

 	
	$scope.vocabulary2=[{"number":1,"eg":"are","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}];
	$scope.vocabulary = [{"number":1,"eg":"are","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":2,"eg":"was","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":3,"eg":"were","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":4,"eg":"been","ch":"be動詞","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":5,"eg":"any","ch":"任何","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":6,"eg":"many","ch":"許多","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":7,"eg":"every","ch":"每一個","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":8,"eg":"some","ch":"一些","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":9,"eg":"would","ch":"將會","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":10,"eg":"could","ch":"可以","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":11,"eg":"should","ch":"應該","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":12,"eg":"shall","ch":"應該","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":13,"eg":"they","ch":"他們","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":14,"eg":"their","ch":"他們的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":15,"eg":"there","ch":"那裡","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":16,"eg":"here","ch":"這裡","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":17,"eg":"where","ch":"哪裡","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":18,"eg":"who","ch":"誰","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":19,"eg":"what","ch":"什麼","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":20,"eg":"you","ch":"你","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":21,"eg":"your","ch":"你的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":22,"eg":"have","ch":"有","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":23,"eg":"four","ch":"四","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":24,"eg":"one","ch":"一","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":25,"eg":"once","ch":"一旦/一次","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":26,"eg":"two","ch":"二","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":27,"eg":"to","ch":"去","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":28,"eg":"do","ch":"做","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":29,"eg":"does","ch":"做","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":30,"eg":"done","ch":"完成","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":31,"eg":"pour","ch":"傾倒","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":32,"eg":"pull","ch":"拖.拉","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":33,"eg":"push","ch":"推","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":34,"eg":"put","ch":"放置","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":35,"eg":"prove","ch":"證明","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":36,"eg":"improve","ch":"增進.推動","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":37,"eg":"give","ch":"給","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":38,"eg":"get","ch":"得到","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":39,"eg":"lose","ch":"失去.迷失","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":40,"eg":"lost","ch":"失去.迷失","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":41,"eg":"cost","ch":"耗費","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":42,"eg":"come","ch":"來","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":43,"eg":"calm","ch":"平靜","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":44,"eg":"live","ch":"生活","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":45,"eg":"realize","ch":"領悟","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":46,"eg":"laugh","ch":"笑","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":47,"eg":"move","ch":"遷移.移動","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":48,"eg":"own","ch":"擁有","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":49,"eg":"sign","ch":"簽.標誌.招牌","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":50,"eg":"find","ch":"發現","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":51,"eg":"climb","ch":"爬","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":52,"eg":"want","ch":"要","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":53,"eg":"watch","ch":"看","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":54,"eg":"wash","ch":"洗","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":55,"eg":"bury","ch":"埋","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":56,"eg":"buy","ch":"買","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":57,"eg":"guy","ch":"傢伙","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":58,"eg":"guilt","ch":"內疚.罪過","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":59,"eg":"build","ch":"建.造","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":60,"eg":"ruin","ch":"毀壞","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":61,"eg":"child","ch":"小孩.兒童","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":62,"eg":"children","ch":"小孩.兒童們","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":63,"eg":"woman","ch":"女人","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":64,"eg":"women","ch":"女人們","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":65,"eg":"aunt","ch":"姑.嬸.舅母","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":66,"eg":"people","ch":"人們","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":67,"eg":"host","ch":"主持.主人","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":68,"eg":"ghost","ch":"鬼","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":69,"eg":"most","ch":"大多數","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":70,"eg":"both","ch":"兩者","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":71,"eg":"dairy","ch":"乳製品","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":72,"eg":"dog","ch":"狗","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":73,"eg":"door","ch":"門","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":74,"eg":"floor","ch":"地板.樓層","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":75,"eg":"flood","ch":"洪水","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":76,"eg":"blood","ch":"血液","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":77,"eg":"bureau","ch":"局.處","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":78,"eg":"board","ch":"板子.佈告欄","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":79,"eg":"broad","ch":"寬廣的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":80,"eg":"half","ch":"一半","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":81,"eg":"heart","ch":"心.心臟","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":82,"eg":"height","ch":"高度","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":83,"eg":"idea","ch":"主意.想法.點子","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":84,"eg":"suicide","ch":"自殺","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":85,"eg":"tuition","ch":"教導","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":86,"eg":"juice","ch":"果汁.肉汁","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":87,"eg":"fruit","ch":"水果","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":88,"eg":"bruise","ch":"瘀青.傷","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":89,"eg":"suit","ch":"套裝.適合","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":90,"eg":"above","ch":"在….之上","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":91,"eg":"tour","ch":"旅行.巡迴","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":92,"eg":"hour","ch":"小時","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":93,"eg":"group","ch":"團體","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":94,"eg":"soup","ch":"湯","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":95,"eg":"sour","ch":"酸的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":96,"eg":"sure","ch":"確定的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":97,"eg":"mourn","ch":"哀悼","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":98,"eg":"sword","ch":"劍","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":99,"eg":"soldier","ch":"士兵","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":100,"eg":"shoulder","ch":"肩膀","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":101,"eg":"muscle","ch":"肌肉","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":102,"eg":"shoe","ch":"鞋子","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":103,"eg":"quality","ch":"品質","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":104,"eg":"quantity","ch":"數量","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":105,"eg":"rhythm","ch":"韻律","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":106,"eg":"rhyme","ch":"押韻的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":107,"eg":"theater","ch":"劇場.電影院","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":108,"eg":"eye","ch":"眼睛","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":109,"eg":"valley","ch":"山谷","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":110,"eg":"value","ch":"價值","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":111,"eg":"minute","ch":"分鐘","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":112,"eg":"movie","ch":"電影","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":113,"eg":"wind","ch":"風","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":114,"eg":"wild","ch":"野生的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":115,"eg":"mild","ch":"溫和的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":116,"eg":"blind","ch":"盲的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":117,"eg":"kind","ch":"仁慈的.類型","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":118,"eg":"behind","ch":"在….的後面","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":119,"eg":"said","ch":"說","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":120,"eg":"enough","ch":"足夠的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":121,"eg":"vehicle","ch":"交通工具","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":122,"eg":"friend","ch":"朋友","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":123,"eg":"area","ch":"區域","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":124,"eg":"love","ch":"愛","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":125,"eg":"post","ch":"郵件.郵寄","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":126,"eg":"beautiful","ch":"美麗的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":127,"eg":"TRUE","ch":"真實的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":128,"eg":"blue","ch":"藍的.憂鬱的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":129,"eg":"busy","ch":"忙碌的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":130,"eg":"real","ch":"真的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":131,"eg":"pretty","ch":"蠻.頗.漂亮的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":132,"eg":"foreign","ch":"國外的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":133,"eg":"awesome","ch":"驚人的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":134,"eg":"very","ch":"非常","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":135,"eg":"vary","ch":"區別.變更","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":136,"eg":"though","ch":"雖然","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":137,"eg":"through","ch":"穿過.透過","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":138,"eg":"thorough","ch":"徹底的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":139,"eg":"other","ch":"其他的","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":140,"eg":"another","ch":"另一個","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":141,"eg":"either","ch":"任一","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":142,"eg":"neither","ch":"兩者皆不","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":143,"eg":"father","ch":"父親","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":144,"eg":"feather","ch":"羽毛","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":145,"eg":"weather","ch":"天氣","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":146,"eg":"knowledge","ch":"知識","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":147,"eg":"purpose","ch":"目的.意圖","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":148,"eg":"course","ch":"課程","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":149,"eg":"clothes","ch":"衣服","txtEnglish":"","txtChinese":"","randomFlag":false}
		,{"number":150,"eg":"only","ch":"只有","txtEnglish":"","txtChinese":"","randomFlag":false}];
	
	$scope.randomStart=1;
	$scope.randomEnd=150;
	
	$scope.chooseIndex=[1];
	$scope.finishFlag=false;	
	
	console.log('HomeTabCtrl');
	$scope.displaySetting='eg';
	
	
})
;