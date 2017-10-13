package no.difi.dcat.datastore.domain.dcat;

import no.dcat.shared.Contact;
import no.dcat.shared.DataTheme;
import no.dcat.shared.Distribution;
import no.dcat.shared.PeriodOfTime;
import no.dcat.shared.Publisher;
import no.dcat.shared.QualityAnnotation;
import no.dcat.shared.Reference;
import no.dcat.shared.SkosCode;
import no.dcat.shared.SkosConcept;
import no.dcat.shared.Subject;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class CompleteCatalog {

    private static CompleteCatalog singelton = new CompleteCatalog();

    public static Catalog getCompleteCatalog() {
        return singelton.createCompleteCatalog();
    }

    public Catalog createCompleteCatalog() {
        Catalog catalog = new Catalog();
        catalog.setId("987654321");
        catalog.setTitle(map("nb", "Tittel"));
        catalog.setDescription(map("nb", "Beskrivelse"));
        catalog.setUri("http://brreg.no/catalogs/" + catalog.getId());

        Publisher publisher = new Publisher();
        publisher.setId("987654321");
        publisher.setName("TESTETATEN");
        publisher.setUri("http://data.brreg.no/enhetsregisteret/enhet/987654321");

        catalog.setPublisher(publisher);

        Dataset dataset = new Dataset();
        dataset.setId(UUID.randomUUID().toString());
        dataset.setUri(catalog.getUri() + "/datasets/" + dataset.getId());
        catalog.setDataset(Arrays.asList(dataset));

        dataset.setTitle(map("nb", "Markagrensen Oslo Kommune og nærliggende kommuner"));
        dataset.setDescription(map("nb", "Datasettet avgrenser område for virkeområdet til lov 6. juni 2009 nr. 35 om naturområder i Oslo og nærliggende kommuner (markaloven) som trådte i kraft 1. september 2009. Markalovens virkeområde er fastsatt i forskrift 4. september 2015 nr. 1032 om justering av markagrensen fastlegger markalovens geografiske virkeområde med tilhørende kart."));
        dataset.setObjective(map("nb", "Datasettes formål er nullam quis rius eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper."));

        dataset.setType("Kodeliste");

        List<Map<String, String>> keywords = new ArrayList<>();
        keywords.add(map("nb", "Bestemmelse"));
        keywords.add(map("nb", "jord"));
        keywords.add(map("nb", "regulering"));
        keywords.add(map("nb", "statlig bestemmelse"));
        dataset.setKeyword(keywords);

        dataset.setAccessRights(
                skosCode("http://publications.europa.eu/resource/authority/access-right/RESTRICTED",
                        "RESTRICTED", map("nb", "Begrenset")));

        Contact contact = new Contact();
        contact.setId(UUID.randomUUID().toString());
        contact.setUri("http://contact/"+ contact.getId());

        contact.setEmail("digitalisering@kartverket.no");
        contact.setHasURL("http://testetaten.no/url");
        contact.setHasTelephone("22306022");
        contact.setOrganizationUnit("Avdeling for digitalisering");

        dataset.setContactPoint(Collections.singletonList(contact));
        SkosConcept sosi =SkosConcept.getInstance("https://www.kartverket.no/geodataarbeid/standarder/sosi/", "SOSI", "dct:Standard");
        dataset.setConformsTo(Collections.singletonList(sosi));

        dataset.setPublisher(publisher);

        dataset.setInformationModel(Arrays.asList(
                SkosConcept.getInstance("https://www.w3.org/2004/02/skos/", "SKOS", null)));

        Subject subject = new Subject();
        subject.setDefinition(map("no","alt som er registrert med et organisasjonsnummer "));
        subject.setPrefLabel(map("no","enhet"));
        subject.setNote(map("no", "Alle hovedenheter, underenheter og organisasjonsledd som er identifisert med et organisasjonsnummer."));
        subject.setSource("https://jira.brreg.no/browse/BEGREP-208");
        subject.setUri("https://data-david.github.io/Begrep/begrep/Enhet");
        dataset.setSubject(Collections.singletonList(
                subject
        ));

        dataset.setAccrualPeriodicity(skosCode("http://publications.europa.eu/resource/authority/frequency/ANNUAL", "ANNUAL", map("nb","årlig")));

        dataset.setIssued(Date.from(LocalDateTime.of(2012,01,01,00,00).toInstant(ZoneOffset.UTC)));
        dataset.setModified(Date.from(LocalDateTime.of(2016,9,21,01,30,3).toInstant(ZoneOffset.UTC)));

        dataset.setProvenance(skosCode("http://data.brreg.no/datakatalog/provenance/vedtak", "vedtak", map("nb", "Vedtak")));
        dataset.setHasCurrentnessAnnotation(createQualityAnnotation("Currentness", "Denne teksten sier noe om aktualiteten. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."));
        dataset.setSpatial(Arrays.asList(
                skosCode("http://www.geonames.org/3162656/asker.html", null, map("nb", "Asker")),
                skosCode("http://www.geonames.org/3162212/baerum.html", null, map("nb", "Bærum")),
                skosCode("http://www.geonames.org/3151404/hurum.html", null, map("nb", "Hurum")),
                skosCode("http://www.geonames.org/3141104/royken.html", null, map("nb", "Røyken"))
        ));

        dataset.setHasRelevanceAnnotation(createQualityAnnotation(QualityAnnotation.Relevance, "Denne teksten sier noe om relevansen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes."));
        dataset.setHasCompletenessAnnotation(createQualityAnnotation(QualityAnnotation.Completeness, "Denne teksten sier noe om komplettheten. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum."));
        dataset.setHasAccuracyAnnotation(createQualityAnnotation(QualityAnnotation.Accuracy, "Denne teksten sier noe om nøyaktigheten. Cras mattis consectetur purus sit."));
        dataset.setHasAvailabilityAnnotation(createQualityAnnotation(QualityAnnotation.Availability, "Denne teksten sier noe om tilgjengeligheten. Vestibulum id ligula porta felis euismod semper. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."));

        dataset.setLanguage(Collections.singletonList(skosCode(
                "http://publications.europa.eu/resource/authority/language/NOR",
                "NOR",
                map("nb", "Norsk"))));

        dataset.setLandingPage(Collections.singletonList("http://testetaten.no/landingsside/nr1"));
        DataTheme theme = new DataTheme();
        theme.setUri("http://publications.europa.eu/resource/authority/data-theme/GOVE");
        theme.setTitle(map("nb","Forvaltning og offentlig støtte"));

        DataTheme theme2 = new DataTheme();
        theme2.setUri("http://publications.europa.eu/resource/authority/data-theme/ENVI");
        theme2.setTitle(map("nb", "Miljø"));

        dataset.setTheme(Arrays.asList(theme, theme2));

        Distribution distribution = new Distribution();
        distribution.setUri(dataset.getUri()+"/distributions/d1");
        distribution.setAccessURL(Arrays.asList("http://www.detteerenlenke.no/til-nedlasting",
                "http://www.detteerenannenlenke.no/til-en-annen-nedlasting",
                "http://www.detteerentredjelenke.no/til-en-tredje-nedlasting"));
        distribution.setDescription(map("nb", "Dette er beskrivelsen av distribusjonen. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper con desbit arum. Se dokumentasjon for denne distribusjonen."));
        distribution.setLicense(sosi);
        distribution.setPage(Arrays.asList(SkosConcept.getInstance("http://lenke/til/mer/info", "Dokumentasjon av distribusjonen")));
        distribution.setFormat(Collections.singletonList("application/json"));

        dataset.setDistribution(Collections.singletonList(distribution));

        Distribution sample = new Distribution();
        distribution.setUri(dataset.getUri() + "/samples/d2");

        sample.setDescription(map("nb", "Dette er beskrivelsen av eksempeldataene. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."));
        sample.setFormat(Arrays.asList("application/rdf+xml"));
        sample.setAccessURL(Arrays.asList("http://www.detteerenlenke.no/til-nedlasting"));

        dataset.setSample(Arrays.asList(sample));

        PeriodOfTime pot = new PeriodOfTime();
        pot.setStartDate(Date.from(LocalDateTime.of(2017,1,1,0,0).toInstant(ZoneOffset.UTC)));
        pot.setEndDate(Date.from(LocalDateTime.of(2017,12,31,23,59,59,99).toInstant(ZoneOffset.UTC)));

        PeriodOfTime pot2 = new PeriodOfTime();
        pot2.setEndDate(Date.from(LocalDateTime.of(2017,12,31,23,59,59,99).toInstant(ZoneOffset.UTC)));
        dataset.setTemporal(Arrays.asList(pot, pot2));

        dataset.setLegalBasisForRestriction(Arrays.asList(
                SkosConcept.getInstance("https://lovdata.no/dokument/NL/lov/1992-12-04-126", "Lov om arkiv [arkivlova]"),
                SkosConcept.getInstance("http://lovdata/paragraph/20", "Den spesifikke loven § 20"),
                SkosConcept.getInstance("http://lovdata/paragraph/26", "Den mindre spesifikke loven § 26")));
        dataset.setLegalBasisForProcessing(Arrays.asList(SkosConcept.getInstance("http://lovdata/paragraph/2", "Den andre loven med lenger tittel § 2")));

        dataset.setLegalBasisForAccess(Arrays.asList(
                SkosConcept.getInstance("http://lovdata/paragraph/10", "Den siste loven med den lengste tittelen § 10")));

        SkosCode hasVersion = new SkosCode("http://www.w3.org/2002/07/hasVersion",
                "hasVersion",
                map("nb", "Har versjon" ));

        Dataset referencedDataset = new Dataset();
        referencedDataset.setUri("http://referenced/dataset");
        referencedDataset.setTitle(map("nb", "The first one"));

        dataset.setReferences(Arrays.asList(
                new Reference(hasVersion, referencedDataset)));
        dataset.setIdentifier(Collections.singletonList("42"));
        dataset.setPage(Collections.singletonList("http://uri1"));

        dataset.setAdmsIdentifier(Collections.singletonList("http://adms.identifier.no/scheme/42"));

        return catalog;
    }
    QualityAnnotation createQualityAnnotation(String dimension, String text) {
        QualityAnnotation qualityAnnotation = new QualityAnnotation();
        qualityAnnotation.setInDimension(dimension);
        Map<String,String> value = new HashMap<>();
        value.put("no", text);
        qualityAnnotation.setHasBody(value);

        return qualityAnnotation;
    }


    public Map<String,String> map(String lang, String value) {
        Map<String, String> result = new HashMap<>();
        result.put(lang, value);

        return result;
    }

    SkosCode skosCode(String uri, String code, Map<String,String> prefLabel) {
        SkosCode result = new SkosCode(uri, code, prefLabel);

        return result;
    }
}
