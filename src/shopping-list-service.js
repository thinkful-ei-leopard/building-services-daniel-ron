const ShoppingListService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },

  insertItem(knex, newItem) {
    return knex('shopping_list')
      .insert(newItem)
      .returning('*')
      .then(rows => {
        return rows[0];
      });   
  },

  getById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .first();
  },

  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where({ id })
      .delete();
  },

  updateItem(knex, id, newItemFields) {
    return knex('shopping_list')
      .where({ id })
      .update(newItemFields);
  }
};

module.exports = ShoppingListService;