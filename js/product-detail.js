// localStorage.setItem()

// ITEM CONTROLLER
var itemController = (() => {

  // return {
  //   addItem: () => {
  //     return {
  //       item_image: 'images/product-details/new.jpg',
  //       item_name: 'Anne Klein Sleeveless Colorblock Scuba',
  //       item_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  //       item_price: 59
  //     };
  //   }
  // };

  var CartItem = function(id, image, name, price, quantity) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  };

//   var calculateTotal = (price, qty) => {
//     var sum = 0;
//     if (qty > 0) {
//         sum = price * qty;
//     }
//     item.allItems.forEach((cur) => sum += cur.value);
//     item.subTotal = sum;

//   };

  var item = {
    allItems: [],
    subTotal: 0,
    grandTotal: 0
  };

  return {
    addItem: (ID, img, nm, prc, qty) => {
      var newItem, ID;

      // [1,2,3,4,5,6], next ID = 7;
      // [1,2,4,6,8,10], next ID = 11;
      // ID = last ID + 1

      // Create new ID for a cart item
      if (item.allItems.length > 0) {
        ID = (item.allItems.length - 1) + 1;
      } else {
        ID = 0;
      }

      // Create a new cart item
      newItem = new CartItem(ID, img, nm, prc, qty);

      // Push the new item into the data structure
      item.allItems.push(newItem);

      // Return the new item/element
      return newItem;
    },

    
    deleteItem: (id) => {
        var ids, index;
        
        // id = 6
        //item.allItems[id];
        // ids = [1 2 4  8]
        //index = 3
        
        ids = item.allItems.map((current) => current.id);

        index = ids.indexOf(id);

        if (index !== -1) {
            item.allItems.splice(index, 1);
        }
        
    },
    
    
    // testing: () => {
    //   console.log(item);
    // //   console.log((item.allItems.length - 1).id);
    // //   console.log((item.allItems.length - 1) + 1);
    // }
  };
  
})();

// UI CONTROLLER
var UIController = (() => {

  var DOMStrings = {
    itemImage: '.etalage_source_image',
    itemName: '.item_name',
    itemPrice: '.item_price',
    itemSize: '.item_size',
    itemQty: 'item_qty',
    addBtn: '.add_btn',
    cartItemList: '.cart_item',
    checkoutBtn: '.checkout'
  };

  return {
    getCartItem: () => {
      return {
        image:  document.querySelector(DOMStrings.itemImage).src,
        name: document.querySelector(DOMStrings.itemName).textContent,
        price: document.querySelector(DOMStrings.itemPrice).textContent,
        size: document.querySelector(DOMStrings.itemSize).value,
        qty: document.getElementById(DOMStrings.itemQty).value
      };
    },

    addCartItem: (itemObj) => {
      var html, newHtml;

      // Create HTML string with placeholder text

      html = '<tr>' + 
        '<td class="item_name">' +
          '<p>%item_name%</p>' +
        '</td>' +
        '<td class="item_price">' +
          '<p>%price%</p>'+
        '</td>'+
        '<td class="item_qty">'+
          '<div class="item_quantity_button">' +
            '<input class="item_quantity_input" type="text" name="quantity" value="%qty%" size="2">' +
            '</div>' +
        '</td>' +
        '<td class="item_total">' +
          '<p class="item_total_price">%totalprice%</p>' +
        '</td>' +
        '<td class="item_delete">' +
          '<a class="item_quantity_delete" href=""><i class="fa fa-times"></i></a>' +
        '</td>' +
      '</tr>';

      // Replace the placeholder text with actual data
      newHtml = html.replace('%item_name%', itemObj.name);
      newHtml = newHtml.replace('%price%', itemObj.price);
      newHtml = newHtml.replace('%qty%', parseInt(itemObj.quantity));
      newHtml = newHtml.replace('%totalprice%', parseInt(itemObj.price.slice(4,6)) * itemObj.quantity);

      // Insert the HTML into the DOM
      document.querySelector(DOMStrings.cartItemList).insertAdjacentHTML('beforeend', newHtml);

    },

    getDOMStrings: () => {
      return DOMStrings;
    }
  };

})();


// GLOBALL APP CONTROLLER
var controller = ((itemCtrl, UICtrl) => {

  var setUpEventListeners = () => {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);
    document.querySelector(DOM.checkoutBtn).addEventListener('click', getData);

  }

  var ctrlAddItem = () => {
    var newItem;
    // Get item/input data
    var input = UICtrl.getCartItem();

    // Add the item to the item controller
    // (ID, img, nm, prc, qty);
    newItem = itemCtrl.addItem(input.id, input.image, input.name, input.price, input.qty);

    // Add the item to the UI
    UICtrl.addCartItem(newItem); 

    localStorage.setItem('id', newItem.id);
    localStorage.setItem('image', input.image);
    localStorage.setItem('name', input.name);
    localStorage.setItem('price', input.price);
    localStorage.setItem('quantity', input.qty);

    // console.log(input);
    // console.log(parseInt(input.price.slice(4,6)) + 2);
    // console.log(newItem);
  };

  var getData = () => {
      var id = localStorage.getItem('id');
      var image = localStorage.getItem('image');
      var name = localStorage.getItem('name');
      var price = localStorage.getItem('price');
      var quantity = localStorage.getItem('quantity');
  }

  return {
    init: () => {
      console.log('Application has started!');
      setUpEventListeners();
    }
  };

})(itemController, UIController);

controller.init();
