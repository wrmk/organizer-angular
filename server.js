const express = require('express');
const app = express();

app.use(express.static('./dist/organizer-angular'));

app.get('/*', function(req, res) {
   res.sendFile('index.html', {root: 'dist/organizer-angular/'}
 );
 });

 app.listen(process.env.PORT || 8080);