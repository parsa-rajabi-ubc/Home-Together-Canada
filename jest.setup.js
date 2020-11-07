// Hack for mysql2 and jest to play nice. See https://github.com/sidorares/node-mysql2/issues/489
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

