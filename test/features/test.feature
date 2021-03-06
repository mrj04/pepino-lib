Feature: The Webdriver.io Documentation
  As a developer
  I can search the API documentation
  So that I can develop using the right syntax

  @focus
  Scenario: Waiting for an element to be invisible
    Given I visit acklenavenue.com
    When  I go to the blog page
    Then I verify the header is not visible

  @focus
  Scenario: Scrolling until the element's in the viewport
    Given I visit acklenavenue.com
    When I scroll to the bottom of the page
    Then I verify the footer's text

  @focus
  Scenario: Waiting for an element's content and being enabled
    Given I visit acklenavenue.com
    When I wait for the header and its content
    And I wait for the header to be enabled
    Then I verify the header's text

  @focus
  Scenario: Clicking back button
    Given I visit ask.com
    When I visit facebook.com
    And I click back button
    Then I should be at ask.com

  @focus
  Scenario: Resetting browser session
    Given I sign in Google
    When I reset the browser session
    Then I should not have my google account opened

  @focus
  Scenario: Verify element does not exist
    Given I visit todomvc.com
    Then I verify custom element does not exist

  @focus
  Scenario: Verify element by content
    Given I visit again todomvc.com
    When I add a todo list with 3 elements and mark one of them as completed
    Then I should see the element has been completed

  @focus
  Scenario: Move mouse cursor to each menu elements
    Given I visit Acklen Avenue website
    Then I should see the mouse cursor on each menu link

  @focus
  Scenario: Move mouse cursor to a button
    Given I move the mouse to View Project Button
    Then I see the scroll move down to the button and hover color changes

  @focus
  Scenario: Verify Global Value
    Given I visit the w3schools
    When I type a random value into an input
    Then I should find that random value in a p element

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
  Scenario: Switching to iframe
    Given I visit "http://javascript.info/tutorial/frames-and-iframes"
    When I switch to "iframe[src='http://javascript.info']" iframe
    Then I should find "JavaScript Tutorial" in the results

  @focus
  Scenario: clicking a menu item that shows up when right clicking a button that displays the menu
    Given I visit "http://swisnl.github.io/jQuery-contextMenu/demo.html"
    Then the alert should display "clicked: edit" after clicking menu-item ".context-menu-one"

  @focus
  Scenario: clearing input that contained text
    Given I visit "http://www.ask.com/"
    When I type "Alexander"
    Then the input <input#search-box> should be empty

  @focus
  Scenario: Adding value to a dropdown identified by its classname
    Given I visit "https://select2.github.io/examples.html"
    Then I should see a new time zone in the dropdown

  @focus
  Scenario: Adding value to a dropdown identified by its id
    Given I visit "https://jsbin.com/sasunok/5"
    Then I should see a new value in the dropdown

  @focus
  Scenario: Adding value to a dropdown identified by its name
    Given I visit "https://www.tutorialspoint.com/html/html_select_tag.htm"
    Then I should see "newValue" in the dropdown

  @focus
  Scenario: Dragging an image to a container
    Given I visit "http://marcojakob.github.io/dart-dnd/basic/web/"
    Then I drag an image into a container

  @focus
  Scenario: Verify header contains text
    Given I visit "http://fiddle.jshell.net/6yhft2kj/3/show/light/"
    Then correct text must be seen

  @focus
  Scenario: Verify key press
    Given I visit "http://acklenavenue.com/"
    Then scroll down must be seen
