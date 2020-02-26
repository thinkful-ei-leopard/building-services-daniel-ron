const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping list service object', function() {
  let db;
  let testItems = [
    {
      name: 'fiddle sticks',
      price:  1.65,
      category: 'Main',
      checked: 'true',

    },
    {
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

  before(() => {
    return db('shopping_list')
      .insert(testItems);
  });

  after(() => db.destroy());

  describe('getAllItems()', () => {
    it(`resolves all articles from 'blogful_articles' table`, () => {
      // test that ArticlesService.getAllArticles gets data from table
      console.log('testing');
    });
  });

  
});

