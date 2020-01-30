@tag
search

Feature: Search functionality for concepts in Felles Datakatalog

  As a user
  I want a search functionality for concepts
  So that I can find information about a specific concept
  So that I can find information related to a specific concept

  Background:
    Given I am accessing felles datakatalog's concept page


  Scenario Outline: Concept that has entries in chosen language
    Given my chosen language is <language>
    And  <concept> exist(s) for <language>
    And  <concept> has <numberOf> perfect match(es)
    When I type <concept> in search field
    And I click enter
    Then I can see <concept> in result list
    And <concept> has <numberOf> exact hits
    And exact hits are on top of list
    Examples:
      | concept       | numberOf | language |
      | dokument      |   4      |    nb    |
      | arkiv         |   2      |    nb    |
      | dokument      |   1      |    nn    |
      | dokument      |   0      |    en    |

  Scenario Outline: Cncept that has entries containing chosen language and additional language(s)
    Given my chosen language is <language>
    And   an entry with an exact match for <concept> exist(s) for <language>
    And   and the same entry contains <differentLang>
    When I type <concept> in search field
    And  I click enter
    Then I see <language> only for the entry
    Examples:
      | concept         | differentLang | language |
      | dokument        |   nn          |    nb    |
      | dokument        |   en          |    nn    |
      | dokument        |   nb          |    en    |

  Scenario Outline: Concept that has entries in different languages only
    Given my chosen language is <language>
    And  <concept> does not have any entries with exact match for <language>
    And  <concept> has entries with exact match for <differentLang>
    When I type <concept> in search field
    And  I click enter
    Then I can see <concept> for <differentLang> in result list
    And  and the exact matches in <differentLang> are on top of the list
    Examples:
      | concept         | differentLang | language |
      | dokument        |   nn          |    nb    |
      | dokument        |   en          |    nn    |
      | dokument        |   nb          |    en    |

  Scenario Outline: Concept that has entries in different languages only and entries with chosen language
    Given my chosen language is <language>
    And  <concept> has  entries with exact match for <language>
    And  <concept> has entries with exact match for <differentLang> only
    When I type <concept> in search field
    And  I click enter
    Then exact matches for <concept> in <language> are on top of the list
    And  the exact matches for <concept> in <differentLang> follows
    Examples:
      | concept         | differentLang | language |
      | dokument        |   nn          |    nb    |
      | dokument        |   en          |    nn    |
      | dokument        |   nb          |    en    |