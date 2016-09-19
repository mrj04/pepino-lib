Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax
    
@focus
Scenario: Adding a value to a dropdown 
    Given I visit "https://output.jsbin.com/lofidabafu"
    Then I should see "testValue" in the dropdown with identifier "test"