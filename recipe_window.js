const InventoryWindow = require('inventory-window');
const Inventory = require('inventory');
const ItemPile = require('itempile');
const assets=require("minecraft-assets")("1.8.8").textureContent;
const findItem=require("minecraft-data")("1.8").findItemOrBlockById;

InventoryWindow.defaultGetTexture = (pile) => assets[pile.item].texture;
InventoryWindow.defaultGetMaxDamage = (pile) => 80;
InventoryWindow.defaultGetTooltip = (pile) => ucfirst(pile.item);
const ucfirst = (s) => s.substr(0, 1).toUpperCase() + s.substring(1);

function createRecipe(recipe) {

  const element = document.createElement("div");

  const inv = new Inventory(3, 3);
  if(recipe.recipe.inShape) {
    recipe.recipe.inShape
      .forEach((line, lineIndex) => {
        line.forEach((item, columnIndex) => {
          if (item.id != -1) {
            const position =(3 - line.length) * (3 - line.length) + lineIndex * 3 + columnIndex;
              inv.array[position] = new ItemPile(findItem(item.id).name, recipe.recipeApplications * item.count);
          }
        })
      });
  }
  if(recipe.recipe.ingredients) {
    recipe.recipe.ingredients.forEach((ingredient,ingredientNumber) => {
      inv.array[ingredientNumber]= new ItemPile(findItem(ingredient.id).name, recipe.recipeApplications * ingredient.count*-1);
    })
  }
  const w = new InventoryWindow({
    inventory: inv,
    allowDrop:false,
    allowPickup:false,
    allowDragPaint:false,
    borderSize: 1,
    textureScale:3
  });
  const recipeContainer=w.createContainer();
  recipeContainer.style["margin"]="0px 20px 0px 0px";

  element.appendChild(recipeContainer);

  const result = new Inventory(1, 1);
  result.array[0] = new ItemPile(findItem(recipe.recipe.result.id).name, recipe.recipeApplications*recipe.recipe.result.count);
  const v = new InventoryWindow({
    inventory: result,
    allowDrop:false,
    allowPickup:false,
    allowDragPaint:false,
    borderSize: 1,
    textureScale:3
  });
  const resultContainer=v.createContainer();
  resultContainer.style["margin"]="50px 50px 0px 0px";

  element.appendChild(resultContainer);

  return element;
}

module.exports=createRecipe;