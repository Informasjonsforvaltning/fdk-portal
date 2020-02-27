// in this file you can append custom step methods to 'I' object

axios = require('axios')
fs = require('fs')
path = require('path')
// import fs from 'fs'

module.exports = function() {
  return actor({
    async updateMockData(url, datafilePath, searchTerm, language, numberOf) {
      let file = `${process.cwd()}/${datafilePath}/${numberOf}_${searchTerm}_${language}.json`;
      this.say(process.cwd())
      let mockData =fs.readFileSync(file)
      this.say(mockData)
      axios.post("http://localhost:3000/concepts",
       mockData
      ).then(result => {
        if (result.status === 201) {
          this.say("mock was updated successfully", 'green')
        } else {
          throw Error(`Could not update mock: ${result.status}`)
        }
      })
    },
    goToFellesDatakatalog(){
      this.amOnPage('');
    }

  });
};
