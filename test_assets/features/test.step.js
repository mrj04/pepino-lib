module.exports = function() {
	this.defineStep(/^I visit the API page$/, function() {
		this.browser.url("http://webdriver.io");
		this.browser.click("=API");
	});


	this.defineStep(/^I search for "([^"]*)"$/, function(searchText) {
		this.browser.setValue("input[name='search']", searchText);
	});


	this.defineStep(/^I should find "([^"]*)" in the results$/, function(text) {
		expect(browser.getText("a").join()).toContain(text);
	});

 };