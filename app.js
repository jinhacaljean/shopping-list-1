// enter items they need to purchase by entering text and hitting "Return" or clicking the "Add item" button

// and uncheck items on the list by clicking the "Check" button

// permanently remove items from the list

var state = {
	items: []
};

// Functions that modify state
// To add an item
var addItem = function (state, item) {
	state.items.push(item);
};

// To delete an item
function deleteItem(state, item) {
	var itemIndex = state.items.indexOf(item);
	state.items.splice(itemIndex, 1);
}





// Functions that render state
// The third section consists of the functions which render HTML into a DOM element.
var renderList = function (state, element) {
	var itemsHTML = state.items.map(function(item) {
		return '<li>' +
		'<span class="shopping-item">' + item + '</span>' + 
		'<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
        '</li>'
	});
	element.html(itemsHTML);
}

function toggleItem(item) {
	item.toggleClass('shopping-item__checked');
}




// Event listeners
function handleItemAdds(){
	$('#js-shopping-list-form').submit(function(event) {
	event.preventDefault();
	addItem(state, $('#shopping-list-entry').val());
	renderList(state, $('.shopping-list'));
	console.log(state);
	this.reset();
	});
}

function handleItemDeletes(){
	$('.shopping-list').on('click', '.shopping-item-delete', function(event){
		console.log('click is working');
		var toDelete = $(this).closest('li').find('.shopping-item').text();
		console.log(toDelete);
		deleteItem(state, toDelete);
		renderList(state, $('.shopping-list'));
		
		// function to alter state
		// function to remove HTML
	});
}

function handleItemChecks(){
	$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
		var toToggle = $(this).closest('li').find('span.shopping-item');
		console.log(toToggle);
		toggleItem(toToggle);
	});
}




$(function(){
	handleItemAdds();
	handleItemDeletes();
	handleItemChecks();
});