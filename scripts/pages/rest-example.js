// https://smartface.atlassian.net/wiki/display/GUIDE/Rest+Services
// http://services.smartface.io/SmartfaceInAction/News?page=1&rowNumber=10
(function() {
	var serviceURL = 'http://services.smartface.io/SmartfaceInAction/News';
	// var serviceURL = 'https://websocket-test-serkanserttop-smf.c9.io:8080/getJSON'
	var newsArray = [];
  var page = new SMF.UI.Page({
    //use ctrl + space to show autocomplete within curly brackets in constructors
    name: "page1",
    fillColor: "#EEEEEE",
    onKeyPress: onKeyPress,
    onShow: onShow
  });
	page.show();
  var items = createRepeatboxItems();
  return;
  page.add(items.repeatBox);
  items.repeatBox.itemTemplate.height = "15%";
  items.repeatBox.itemTemplate.add(items.label);
  items.repeatBox.itemTemplate.add(items.image);
  /**
   * Creates action(s) that are run when the user press the key of the devices.
   * @param {KeyCodeEventArguments} e Uses to for key code argument. It returns e.keyCode parameter.
   * @this Pages.Page1
   */
  function onKeyPress(e) {
    if (e.keyCode === 4) {
      Application.exit();
    }
  }

  /**
   * Creates action(s) that are run when the page is appeared
   * @param {EventArguments} e Returns some attributes about the specified functions
   * @this Pages.Page1
   */
  function onShow() {
  	SMFAjax.getJSON(serviceURL, {"page": 1, "rowNumber": 10}, function(data) {
  		// alert(data);
  		alert(JSON.stringify(data));
  		return;
    	
			if (!data || !data.news) {
				alert('There was an error in the data received');
				return;
			}
			var news = data.news;
			for (var i = 0; i < news.length; i++) {
			  newsArray.push({
			  	"id": news[i].id,
				  "title": news[i].title,
				  "type": news[i].type,
				  "image": news[i].image[0].url
			  });
			}
			//Add "newsarray" to the RepeatBox datasource
			items.repeatBox.dataSource = newsArray;
			items.repeatBox.refresh();
		});
  }

  /**
   * Creates action(s) that are run when the object is pressed from device's screen.
   * @param {EventArguments} e Returns some attributes about the specified functions
   * @this Page1.TextButton1
   */

	function createRepeatboxItems() {
  	var repeatBox = new SMF.UI.RepeatBox({
	    top: '0%',
	    left: '0%',
	    width: '100%',
	    height: '100%'
	  });
	  var label = new SMF.UI.Label({
	    top: '0%',
	    left: '30%',
	    width: '70%',
	    height: '100%'
	  });
	  var image = new SMF.UI.Image({
	    top: '0%',
	    left: '0%',
	    width: '30%',
	    height: '100%',
	    imageFillType: SMF.UI.ImageFillType.STRETCH
	  });
	  
	  repeatBox.onRowRender = function(e) {
	    this.controls[0].text = newsArray[e.rowIndex].title;
	    this.controls[1].image = newsArray[e.rowIndex].image;
	  };

	  return {
	  	image: image,
	  	label: label,
	  	repeatBox: repeatBox
	  };
  }
})();