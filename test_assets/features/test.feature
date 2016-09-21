Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax
    
@focus
Scenario: Clicking a link
    Given I visit "http://javascript.info/tutorial/hello-world"
    Then I should be redirected to a page with title "Variables and statements | JavaScript Tutorial" ".page-next"