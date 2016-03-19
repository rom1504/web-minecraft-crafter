const findItemOrBlockByName=require("minecraft-data")("1.8").findItemOrBlockByName;
const niceCraft=require("minecraft-crafter").niceCraft;
const craft=require("minecraft-crafter").craft;
const assets=require("minecraft-assets")("1.8.8").textureContent;
const textureContentArray=require("minecraft-assets")("1.8.8").textureContentArray;
const $=require("jquery");

global.jQuery = $;

require("jquery-autocomplete");
require('jquery-ui');

const item=$("#item");

item.autocomplete({
  source:textureContentArray.map(o => ({
    value:o.name,
    label:o.name,
    icon:o.texture
  })),
  focus: function( event, ui ) {
    item.val( ui.item.value );
    return false;
  }
});

item.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
  var $li = $('<li>'),
    $img = $('<img>');
  $img.attr({
    src: item.icon,
    alt: item.label
  });

  $li.attr('data-value', item.label);
  $li.append('<a href="#">');
  $li.find('a').append($img).append(item.label);

  return $li.appendTo(ul);
};

$("#form").submit(e => {
  e.preventDefault();
  const name=$("#item").val();

  $("#result").text(niceCraft(craft({id:findItemOrBlockByName(name).id,count:1})));

  $("#craftResult").html("<img width='100px' src='"+assets[name].texture+"' />");
});