const findItemOrBlockByName=require("minecraft-data")("1.8").findItemOrBlockByName;
const niceCraft=require("minecraft-crafter").niceCraft;
const craft=require("minecraft-crafter").craft;
const $=require("jquery");

global.jQuery = $;

require("jquery-autocomplete");
require('jquery-ui');

const itemNames=require("minecraft-data")("1.8").blocksArray
  .concat(require("minecraft-data")("1.8").itemsArray)
  .map(item => item.name);

$("#item").autocomplete({
  source:itemNames
});

$("#form").submit(e => {
  e.preventDefault();
  $("#result").text(niceCraft(craft({id:findItemOrBlockByName($("#item").val()).id,count:1})));
});