const ShoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },

  insertShoppingListItem(knex, newItem) {
    return knex('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
        
  }
};

module.exports = ShoppingListService;