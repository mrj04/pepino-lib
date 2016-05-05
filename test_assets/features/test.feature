Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax

Scenario: Valid search
    Given I visit the API page
    When I search for "waitForVisi"
    Then I should find "waitForVisible" in the results

Scenario: Selecting options from a dropdown
    Given I visit "https://developer.mozilla.org/en/docs/Web/HTML/Element/select"
    When I select "Value 3" from "article#wikiArticle p select"
    Then the selected option of "article#wikiArticle p select" should be "Value 3"
    And the value of "article#wikiArticle p select" should be "value3"

Scenario: Working with built-in javascript popup alerts
    Given I visit "http://www.javascripter.net/faq/alert.htm"
    And there is an alert box waiting for input
    When I dismiss the alert
    Then I should be able to do other things on the site
