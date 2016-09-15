
Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax



@focus
Scenario: Adding a value to a dropdown 
    Given I visit "http://www.tutorialspoint.com/html/html_select_tag.htm"
    Then I should see "testValue" in the dropdown