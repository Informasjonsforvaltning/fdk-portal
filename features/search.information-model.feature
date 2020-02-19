@search

Feature: Search functionality for information models in Felles Datakatalog

  As a user
  I want to be able to search information models
  So that I can find information about a given information model
  So that I can find information about information models that are semantically related to a given information model

  Background:
    Given I am on information model page in Felles Datakatalog
    Given there is at least one search result on the information model page

  Scenario: Information model landing page shows summaries for most relevant hits
    Then there is at least one information model summary
  
  Scenario: Each information model summary must have title and responsible organisation
    Then each information model summary has a title
    And each information model summary has a responsible organisation
  
  Scenario: Some information model summaries may have description and themes
    Given An information model summary with description and themes 
    Then the information model summary has a description
      And the information model summary has themes
  
  Scenario: Filtering information models by responsible organisation
    Given I am able to filter search results by responsible organisation
    When I filter by a given organisation
    Then I expexect all search results to reflect the change
    And I expect to see chosen search filters
  
  Scenario: Filtering information models by themes
    Given I am able to filter search results by themes
    When I filter by a given theme
    Then I expexect all search results to reflect the change
    And I expect to see chosen search filters