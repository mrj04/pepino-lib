Feature: The Webdriver.io Documentation
    As a developer
    I can search the API documentation
    So that I can develop using the right syntax
    
@focus
Scenario: clicking a menu item that shows up when right clicking a button that displays the menu
    Given I visit "http://swisnl.github.io/jQuery-contextMenu/demo.html"
    Then the alert should display "clicked: edit" after clicking menu-item "span.context-menu-one"
