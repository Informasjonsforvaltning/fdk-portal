const {I} = inject();

Given('some test condition', () => {
  // From "features/basic.feature" {"line":9,"column":5}
  I.say("Some testcondition");
});

When('I go to felles datakatalog', () => {
  // From "features/basic.feature" {"line":10,"column":7}
  I.goToFellesDatakatalog();
});

Then('the page title is Felles Datakatalog', () => {
  I.seeInTitle("Felles datakatalog")
});