@infomodel-search
Feature: Information model start page

  As a consumer of information models
  I want to view information model summaries
  So that I can view essential information about the model(s)
  So that I can find the model that I'm looking for

  Background:
    Given I am on felles datakatalog information models page

    Scenario:
      Then I expect to see a list of information models
      And listed items have a title
      And listed items have a responsible
      And listed items have a description
      And listed items have a subject
