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
      checked: 'true',
    },
    {
      id: 2,
      date_added: new Date('2020-02-25'),
      name: 'faddle sticks',
      price:  1.95,
      category: 'Lunch',
      checked: 'false',
    },
  ];

  before(() => {
    db=knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    before(() => {
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
  });
});

