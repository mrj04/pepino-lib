@focus
Feature:
    Test a fake api server where i can send, update and delete a message

    Scenario: When sending a message request
        Given I set headers to
            | name          | value            |
            | Accept        | application/json |
            | Content-Type  | application/json |
        And  I set body to  {"To":"+19315364127","From":"juan","Body":"FFFFFFFE01"}
        When I POST to /sms
        Then response code should be 201
        Then response body path $.From should be juan

    Scenario: When updating the first message request
        Given I set headers to
            | name          | value            |
            | Accept        | application/json |
            | Content-Type  | application/json |
        And  I set body to  {"To":"+19315364127","From":"pedro","Body":"FFFFFFFE01"}
        When I PUT /sms/1
        Then response code should be 200
        And response body path $.From should be pedro

    Scenario: When sending a second message request
      Given I set headers to
        | name          | value            |
        | Accept        | application/json |
        | Content-Type  | application/json |
      And  I set body to  {"To":"+19315364127","From":"erick","Body":"1231234234"}
      When I POST to /sms
      Then response code should be 201
      And response body path $.From should be erick

    Scenario: When getting all message sent
      Given I set headers to
        | name          | value            |
        | Accept        | application/json |
        | Content-Type  | application/json |
      When I GET /sms
      Then I store the value of body path $[0].id as firstIdDelete in global scope
      Then response body path $ should be of type array with length 2

  Scenario: When deleting the first message
    Given I set headers to
      | name          | value            |
      | Accept        | application/json |
      | Content-Type  | application/json |
    When I DELETE with argument /sms/ and firstIdDelete
    Then response code should be 200

  Scenario: When deleting the second message
    Given I set headers to
      | name          | value            |
      | Accept        | application/json |
      | Content-Type  | application/json |
    When I DELETE without argument /sms/2
    Then response code should be 200

  Scenario: When getting all message sent
    Given I set headers to
      | name          | value            |
      | Accept        | application/json |
      | Content-Type  | application/json |
    When I GET /sms
    Then response body path $ should be of type array with length 0
