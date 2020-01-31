@tag
search

Feature: Search functionality for concepts in Felles Datakatalog

  As a user
  I want a search functionality for concepts
  So that I can find information about a given concept
  So that I can find information about concepts that are semantically related to a given concept

  Background:
    Given I am accessing felles datakatalog's concept page


  Scenario Outline: Concept that has exists in chosen language
    Given my chosen language is <language>
    And  <searchTerm> exists in <language>
    And  <searchTerm> has <numberOf> exact match(es)
      When I search for <searchTerm>
        Then I can see <searchTerm> in result list
        And <searchTerm> has <numberOf> exact hits
        And exact hits are on top of list
    Examples:
      | searchTerm    | numberOf | language |
      | dokument      |   4      |    nb    |
      | archive       |   2      |    en    |
      | dokument      |   1      |    nn    |

  Scenario Outline: Concept that has hits containing chosen language and additional language(s)
    Given my chosen language is <language>
    And   there exists one hit with an exact match for <searchTerm> in <language>
    And   the hit is translated to <differentLang>
      When I search for <searchTerm>
        Then I see one hit for the desired concept
          And the hit is shown in <language>
    Examples:
      | searchTerm      | differentLang | language |
      | dokument        |   nn          |    nb    |
      | dokument        |   en          |    nn    |
      | dokument        |   nb          |    en    |

  Scenario Outline: Concept that has no hits for chosen language
    Given my chosen language is <language>
    And  <searchTerm> does not have any hits with exact match for <language>
    And  <searchTerm> has hits with exact match for <differentLang>
      When I search for <searchTerm>
        Then I can see <searchTerm> for <differentLang> in result list
        And  the exact match(es) in <differentLang> is/are shown at top of the list
    Examples:
      | searchTerm      | differentLang | language |
      | dokument        |   nn          |    nb    |
      | dokument        |   en          |    nn    |
      | dokument        |   nb          |    en    |

  Scenario Outline: Concept that has hits in chosen language and hits in other languages
    Given my chosen language is <language>
    And  <searchTerm> has hits with exact match for <language>
    And  <searchTerm> has other hits with exact match not for <language>
    When I search for <searchTerm>
    Then hits for <searchTerm> in <language> are on top of the list
    And  other hits for <searchTerm> not in <language> follow
    Examples:
      | searchTerm      |  language |
      | dokument        |     nb    |
      | dokument        |     nn    |
      | dokument        |     en    |