Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax

@focus
Scenario: Valid search
    Given I visit the API page
    When I search for "waitForVisi"
    Then I should find "waitForVisible" in the results

@focus
Scenario: Selecting options from a dropdown
    Given I visit "https://developer.mozilla.org/en/docs/Web/HTML/Element/select"
    When I select "Value 3" from "article#wikiArticle p select"
    Then the selected option of "article#wikiArticle p select" should be "Value 3"
    And the value of "article#wikiArticle p select" should be "value3"

@focus
Scenario: Dismissing a js alert
    Given I visit "http://www.javascripter.net/faq/alert.htm"
    And there is an alert box waiting for input
    When I dismiss the alert
    Then I should be able to do other things on the site

@focus
Scenario: Accepting a js alert
    Given I visit "http://www.javascripter.net/faq/alert.htm"
    And there is an alert box waiting for input
    When I accept the alert 
    Then I should be able to do other things on the site

@focus
Scenario: Toggle a Checkbox
	Given I visit "http://www.javascript-coder.com/files/javascript-get-form/javascript-get-form-example.html"
	When I toggle the "#chl_recruiter_contact" checkbox
	Then "#chl_recruiter_contact" should be checked

@focus
Scenario: Untoggle a Checkbox
	Given I visit "http://www.javascript-coder.com/files/javascript-get-form/javascript-get-form-example.html"
	When I untoggle the "#chk_email_alerts" checkbox
	Then "#chk_email_alerts" should not be checked

@focus
Scenario: Visiting a website and checking its title
	Given I visit "https://www.google.com"
	Then the title should be "Google"

@focus
Scenario: Valid alert text
    Given I visit "http://www.javascripter.net/faq/alert.htm"
    And there is an alert box waiting for input
	Then the text in the alert should be "Hello from JavaScript!"

@focus
Scenario: Visiting a website and checking its url
	Given I visit "http://acklenavenue.com/"
	Then the url must be "http://acklenavenue.com/"

@focus
Scenario: Visiting a website and checking an object's css property similar value
	Given I visit "http://acklenavenue.com/"
	Then the object "#team-toggler" should have the css property "color" similar to "#72C02C"

@focus
Scenario: Visiting a website and checking an object's css property equal value
	Given I visit "http://acklenavenue.com/"
	Then the object "#team-toggler" should have the css property "color" equal to "rgba(114,192,44,1)"

@focus
Scenario: Visiting a website and checking an object's attribute
	Given I visit "http://www.javascript-coder.com/files/javascript-get-form/javascript-get-form-example.html"
	Then the object "#chk_email_alerts" should have attribute "checked"

@focus
Scenario: Visiting a website and checking an object's attribute with value
	Given I visit "http://acklenavenue.com/"
	Then the object "#web-service" should have attribute "class" with value "service"

@focus
Scenario: Logging in with google single-signon
    Given I visit "https://www.udemy.com/"
    When I attempt to log in using my google account
    Then I should be logged in with my profile