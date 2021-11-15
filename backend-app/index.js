const app = require('./app');
const { connectToDB } = require('./common/db.client');

app.set('port', 3000);
connectToDB(() => {
  app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
  });
});
