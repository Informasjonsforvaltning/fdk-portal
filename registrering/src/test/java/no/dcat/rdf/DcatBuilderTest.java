package no.dcat.rdf;

import no.dcat.model.Catalog;
import no.dcat.model.Contact;
import no.dcat.model.DataTheme;
import no.dcat.model.Dataset;
import no.dcat.model.Distribution;
import no.dcat.model.PeriodOfTime;
import no.dcat.model.Publisher;
import no.dcat.model.SkosCode;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by dask on 12.04.2017.
 */
public class DcatBuilderTest {

    DcatBuilder builder;
    Catalog catalog;

    @Before
    public void setUp() {

        catalog = new Catalog();
        catalog.setId("987654321");
        catalog.setTitle(map("nb", "Tittel"));
        catalog.setDescription(map("nb", "Beskrivelse"));
        catalog.setUri("http://testetaten.no/catalogs/987654321");

        Publisher publisher = new Publisher();
        publisher.setId("987654321");
        publisher.setName("TESTETATEN");
        publisher.setUri("http://data.brreg.no/enhetsregisteret/enhet/987654321");

        catalog.setPublisher(publisher);


        Dataset dataset = new Dataset();
        catalog.setDataset(Collections.singletonList(dataset));

        dataset.setId("XYZ32F5");
        dataset.setUri("http://testetaten.no/catalogs/987654321/datasets/XYZ32F5");
        dataset.setTitle(map("nb", "Datasettittel"));
        dataset.setDescription(map("nb", "Datasettbeskrivelse"));

        Contact contact = new Contact();
        contact.setUri("http://testetaten.no/contacts/no1");
        contact.setFullname("Fullname");
        contact.setEmail("test@testetaten.no");
        contact.setHasURL("http://testetaten.no/url");
        contact.setHasTelephone("+47444444444");
        contact.setOrganizationName("Testetaten");
        contact.setOrganizationUnit("Enhet A");

        dataset.setContactPoint(Collections.singletonList(contact));

        List<Map<String, String>> keywords = new ArrayList<>();
        keywords.add(map("nb", "Emneord 1"));
        keywords.add(map("nb", "Emneord 2"));

        dataset.setKeyword(keywords);
        dataset.setPublisher(publisher);
        dataset.setIssued(Date.from(LocalDateTime.of(2016,12,24,12,30).toInstant(ZoneOffset.UTC)));
        dataset.setModified(Date.from(LocalDateTime.of(2017,01,20,13,25,3).toInstant(ZoneOffset.UTC)));
        dataset.setLanguage(new SkosCode(
                        "http://publications.europa.eu/resource/authority/language/NOR",
                        "NOR",
                        map("nb", "Norsk")));

        dataset.setLandingPage(Collections.singletonList("http://testetaten.no/landingsside/nr1"));
        dataset.setTheme(Collections.singletonList(new DataTheme("http://publications.europa.eu/resource/authority/data-theme/GOVE")));

        Distribution distribution = new Distribution();
        distribution.setUri("http://testetaten.no/catalogs/987654321/datasets/XYZ32F5/D1");
        distribution.setAccessURL(Collections.singletonList("http://testetaten.no/data/access"));
        distribution.setTitle(map("nb", "Standard data"));
        distribution.setDescription(map("nb", "Beskrivelsen er ikke tilgjengelig"));
        distribution.setLicense("http://opne.data.no/lisens/nr1");
        distribution.setFormat(Collections.singletonList("application/json"));

        dataset.setDistribution(Collections.singletonList(distribution));
        dataset.setConformsTo(Collections.singletonList("http://norsk-lov"));

        PeriodOfTime pot = new PeriodOfTime();
        pot.setStartDate(Date.from(LocalDateTime.of(2017,1,1,0,0).toInstant(ZoneOffset.UTC)));
        pot.setEndDate(Date.from(LocalDateTime.of(2017,12,31,23,59,59,99).toInstant(ZoneOffset.UTC)));
        dataset.setTemporal(Collections.singletonList(pot));

        dataset.setSpatial(Collections.singletonList(new SkosCode("http://sws.geonames.org/3144096/", null, map("nb", "Norge"))));
        dataset.setAccessRights(new SkosCode("http://publications.europa.eu/resource/authority/access-right/RESTRICTED"));
        dataset.setAccessRightsComment(Collections.singletonList("http://hjemmeldata.no/du-må-vente"));
        dataset.setReferences(Collections.singletonList("http://testeetatens.no/catalog/2/dataset/42"));
        dataset.setProvenance(new SkosCode("http://data.brreg.no/datakatalog/provenance/vedtak"));
        dataset.setIdentifier(Collections.singletonList("42"));
        dataset.setPage(Collections.singletonList("http://uri1"));
        dataset.setAccrualPeriodicity(new SkosCode("http://publications.europa.eu/resource/authority/frequency/CONT"));

        List<String> subjects = new ArrayList<>();
        subjects.add("http://testetaten.no/begrep/4450");
        subjects.add("http://testetaten.no/begrep/4599");

        dataset.setSubject(subjects);

        dataset.setAdmsIdentifier(Collections.singletonList("http://adms.identifier.no/scheme/42"));
    }

    @Test
    public void convertOK() throws Throwable {
        builder = new DcatBuilder();

        String actual = builder.transform(catalog, "TURTLE");

        assertThat(actual, is(notNullValue()));
        System.out.println(actual);
    }


    public Map<String,String> map(String lang, String value) {
        Map<String, String> result = new HashMap<>();
        result.put(lang, value);

        return result;
    }
}
