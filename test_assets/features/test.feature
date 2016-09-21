Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax

@focus
Scenario: Switching to iframe
    Given I visit "http://javascript.info/tutorial/frames-and-iframes"
    When I switch to "iframe[src='http://javascript.info']" iframe
    Then I should find "JavaScript Tutorial" in the results
