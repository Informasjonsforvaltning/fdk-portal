const {I,conceptPage} = inject();

Given('{string} has {int} exact matches in {string}', async (searchTerm, numberOf, language) => {
  conceptPage.setMockSearchTerm(searchTerm);
  conceptPage.setMockNumberOf(numberOf);
  conceptPage.setMockLanguage(language);
  conceptPage.setMockNumberOf(numberOf);
  await conceptPage.populateMock();
});

Given('there exists one hit with an exact match for {string} in {string}', (searchTerm,language) => {

});

Given('the hit is translated to {string}', (differentLang) => {
});

Given('{string} does not have any hits with exact match for {string}', (searchTerm,language) => {

});

Given('{string} has hits with exact match for {string}', (searchTerm,language) => {

});

Given('{string} has hits with exact match for {string}', () => {

});

Given('{string} has other hits with exact match not for {string}', (searhTerm,language) => {

});

When('I choose {string} as my system language', (language) => {

});

When('I search for {string}', (searchTerm) => {

});

When('I search for {string}', () => {

});

Then('I can see {string} in result list', (searchTerm) => {


});

Then('{string} has {int} exact hits', (searchTerm,numberOf) => {

});

Then('exact hits are on top of list', () => {

});

Then('I see one hit for the desired concept', () => {

});

Then('the hit is shown in {string}', () => {

});

Then('I can see {string} for {string} in result list', () => {

});

Then(/^the exact match\(es\) in {string} is\/are shown at top of the list$/, (language) => {

});

Then('hits for {string} in {string} are on top of the list', (language) => {

});

Then('other hits for {string} not in {string} follow', (language, differenLanguage) => {

});

Then(/^the exact match\(es\) in "(.*?)" is\/are shown at top of the list$/, () => {

});
