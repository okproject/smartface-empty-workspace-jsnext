var page1 = new SMF.UI.Page({
  name: "page1"
});
module.exports = page1;

var label1 = new SMF.UI.Label({
  text: "Title"
});
page1.add(label1);

var cnt = new SMF.UI.Container();
page1.add(cnt);

var label2 = new SMF.UI.Label({
  text: "Item 1"
});
cnt.add(label2);

var tb1 = new SMF.UI.TextButton({
  text: "Action 1"
  onPressed: tb1_pressed
});
cnt.add(tb1);

var rb1 = new SMF.UI.RepeatBox({
  top: "10%",
  left: "10dp",
  height: "300px",
  width: 600
});

var lblItem = new SMF.UI.Label();
rb1.itemTemplate.add(lblItem);

var lblActiveItem = new SMF.UI.Label();
rb1.activeItemTemplate.add(lblActiveItem);
