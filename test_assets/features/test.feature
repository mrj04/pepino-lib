Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax

@focus
Scenario: Verify element by content
    Given I visit todomvc.com
    When I add a todo list with 3 elements and mark one of them as completed
    Then I should see the element has been completed 
