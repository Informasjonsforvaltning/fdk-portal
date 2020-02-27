const { I } = inject();

class ConceptPage {

  constructor(){
    this.mockSeachTerm=""
    this.mockLanguage=""
    this.mockNumberOf=""
  }

  setMockSearchTerm(searchTerm){
    this.mockSeachTerm = searchTerm;
  }

  setMockLanguage(language){
    this.mockLanguage = language;
  }
  setMockNumberOf(number){
    this.mockNumberOf=number;
  }

  async populateMock() {
    let url = "localhost:3000/concept"
    let mockDataPath = "test/feature/testdata/concept/search";
    if (this.mockNumberOf && this.mockLanguage && this.mockNumberOf !== -1) {
      await I.updateMockData(url, mockDataPath, this.mockSeachTerm, this.mockLanguage, this.mockNumberOf);
    } else {
      throw new Error('attempted to update mock without specifying data')
    }
  }

  populateMockWithoutNumberOf() {
    let url = "localhost:3000/concept"
    let mockDataPath = "/test/feature/testdata/concept/search";

    if (this.mockNumberOf && this.mockLanguage) {
      //  I.updateMockData(this.url, this.mockDataPath, this.mockSeachTerm, this.mockLanguage, "all");
    } else {
      throw new Error('attempted to update mock without specifying data')
    }
  }

}

module.exports = new ConceptPage();
