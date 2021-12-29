const path = require('path');
const fs = require('fs');

export const readJSON = () => {
	fs.readFile(path.resolve('@/db/rad.json'), 'utf-8', (err, data) => {
	  if (err) {
	    return JSON.stringify({ result: 0, text: err });
	  } else {
	    return data;
	  }
	});
}
