const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping list service object', function() {
  let db;
  let testItems = [
    {
      id: 1,
      date_added: new Date('2020-02-26'),
      name: 'fiddle sticks',
      price:  1.65,
      category: 'Main',
      checked: true,
    },
    {
      id: 2,
      date_added: new Date('2020-02-25'),
      name: 'faddle sticks',
      price:  1.95,
      category: 'Lunch',
      checked: false,
    },    
    {
      id: 3,
      date_added: new Date('2020-02-15'),
      name: 'bobble sticks',
      price:  66.95,
      category: 'Breakfast',
      checked: false,
    },
  ];

  before(() => {
    db=knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db('shopping_list')
        .insert(testItems);
    });

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      // test that ArticlesService.getAllArticles gets data from table
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });

    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];

      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            category: thirdTestItem.category,
            checked: thirdTestItem.checked,
            date_added: thirdTestItem.date_added
          });
        });
    });
    it(`deleteItem() removes an item by id from 'shoppig_list' table`, () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });


  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it(`insertShoppingListItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'faddle sticks',
        price:  1.95,
        category: 'Lunch',
        checked: false,
        date_added: new Date('2020-02-26'),
      };

      return ShoppingListService.insertShoppingListItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            category: newItem.category,
            checked: newItem.checked,
            date_added: newItem.date_added
          });
        });
    });
  });
});

