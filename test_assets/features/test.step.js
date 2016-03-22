module.exports = function() {
	this.Given(/^I visit the API page$/, function() {
		this.browser.url("http://webdriver.io");
		this.browser.click("=API");
	});


	this.When(/^I search for "([^"]*)"$/, function(searchText) {
		this.browser.setValue("input[name='search']", searchText);
	});


	this.Then(/^I should find "([^"]*)" in the results$/, function(text) {
		expect(browser.getText("a").join()).toContain(text);
	});

 };