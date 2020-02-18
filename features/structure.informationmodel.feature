@tag
structure

Feature: Show structure functionality for information models in Felles Datakatalog

  As a user
  I want a structural view of the information model with belonging elements
  So that I can find model elements that are relevant to this information model

  Background:
    Given I am accessing felles datakatalog's information model page

  Scenario: Viewing structure of information model with structure object
    Given my chosen information model has root object type, object type and code list
    When I have chosen the structure tab
    Then I can see root object type, object type and code list in the structure view

  Scenario: Viewing information model without structure object
    Given the structure object within my chosen information model is empty
    Then I can not see the structure tab
