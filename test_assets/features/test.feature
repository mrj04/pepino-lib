Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax

@focus
Scenario: Waiting for an element's content
    Given I visit acklenavenue.com
    When I wait for the header and its content
    Then I verify the header's text
