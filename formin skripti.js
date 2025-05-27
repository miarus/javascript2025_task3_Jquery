  //koodi suoritetaan vasta kun html ladattu ja valmis, tyhjä funktio vasta kun sivu valmis


    // Lisää harjoitus storageen
    $(document).ready(function() {
        $("#laheta").click(function() {
            let laji = $("#laji");
            let aika = $("#aika");
            let paivamaara = $("#paivamaara");
            let kuvaus = $("#kuvaus");

        let lajiArvo = laji.val();
        let aikaArvo = parseFloat(aika.val());  // aikaarvona-stringi muutetaan parsella liukuluku floatiksi, ettei jää tekstiksi
        let paivamaaraArvo = paivamaara.val();
        let kuvausArvo = kuvaus.val();

        // Resetoi virhereunukset, eli poistaa mahdolli punareunukset syöttökentt ympärilt ettei jää(jos virhetieto kuten tyhjä) tallennuksen jälkeen
        laji.removeClass("error");
        aika.removeClass("error");
        paivamaara.removeClass("error");
        kuvaus.removeClass("error");

        // Tarkistus: Kaikki kentät täytetty oikein? jos jokin alla olev täyttyy, alertti näkyy, punainen reuna + pinkki sisus of course!
        if (!lajiArvo || isNaN(aikaArvo) || aikaArvo <= 0 || !paivamaaraArvo || !kuvausArvo) {  //isNan (x) - onko tämä numero true tai false
            alert("Täytä kaikki kentät oikein!");

            if (!lajiArvo) laji.addClass("error");  //jos lajia ei valittu, menee "sisään". punainen reuna ja kenttä jos tyhjiä!
            if (isNaN(aikaArvo) || aikaArvo <= 0) aika.addClass("error");  //jos aika ei ole numero tai on 0 tai vähemm, menee sisään
            if (!paivamaaraArvo) paivamaara.addClass("error"); //jos pvm tyhjä menee sisään
            if (!kuvausArvo) kuvaus.addClass("error");  //jos kuvaus tyhjä, menee sisään

            return;  //keskeyttää koodin heti, ei mene tallennusosaan
        }

        // Haetaan aiemmat treenit storage:sta. tekee ennen kuin tallennetaan tiedot back storage jottei häviä
        let harjoitukset = JSON.parse(localStorage.getItem(lajiArvo)) || [];  //parse muuttaa back lista arrayksi. get item hakee lajitiedot. 
                                                                            // ii [] jos ei tietoa ole vielä käyttää tyhjää listaa jottei virheitä
        // Lisätään uusi harjoitus listaan
        harjoitukset.push({
            paivamaara: paivamaaraArvo,  //tekee uuden harjoituksen objektina, jossa pvm, aika, kuvaus
            aika: aikaArvo,
            kuvaus: kuvausArvo
        });

        // Tallennetaan uusi päivitetty lista takaisin storageen
        localStorage.setItem(lajiArvo, JSON.stringify(harjoitukset));

        
         // Tyhjennetään syöttökentät efektillä kun syöttö valmis
         laji.fadeOut(200, function() { $(this).val("").fadeIn(200); });
         aika.fadeOut(200, function() { $(this).val("").fadeIn(200); });
         paivamaara.fadeOut(200, function() { $(this).val("").fadeIn(200); });
         kuvaus.fadeOut(200, function() { $(this).val("").fadeIn(200); });

        // Näytetään vahvistus viesti hetkeksi, vaikka otsikko tms välähtää
        $("#otsikko").fadeOut(300).fadeIn(600);

        //  Vahvistusviesti efektillä
        setTimeout(function() {

            alert("Harjoitus lisätty!");
        }, 400);
    });

    // Hae tallennetut treenit yhteenvedosta
     $("#hae").click (function() {  //hae nappia painetaan, kuuntelija, funktio käynnistyy
        let valittuLaji = $("#etsiLaji").val();  //valikko josta haettu laji, value on lajivalinta

         // Piilotetaan tulos-container ja lista aluksi, jotta slideDown toimii puhtaasti
        $("#tulos-container").hide();
        $("#tuloksetLista").hide().html("");


        if (valittuLaji) {  //storagesta haetaan valitun lajin tiedot
            let harjoitukset = JSON.parse(localStorage.getItem(valittuLaji)) || [];    //ii [] jos ei tietoa ole käyttää tyhjää listaa jottei virheitä

            if (harjoitukset.length === 0) {  //tarkistaa löytyykö tallennettuja harjoituksia
                $("#tulos").text (`Ei harjoituksia lajille: ${valittuLaji}`);
                $("#tuloksetLista").html("");  //tyhjentää aiemmat listat, jottei vanh tieto jää näkyviin
                 // KORJAUS: Näytä tulos-container slideDown efektillä
                $("#tulos-container").slideDown(500);

            } else {
                // Näytetään kaikki harjoitukset listana
                $("#tulos").text(`Harjoitukset lajille: ${valittuLaji}`);
                let listaHTML = ""; // Luodaan tyhjä merkkijono, johon lisätään listan osat

                for (let i = 0; i < harjoitukset.length; i++) {  //harjoitukset yksitellen läpi

                    let h = harjoitukset[i]; // Haetaan yksittäinen harjoitus listasta
                    listaHTML += `<li>${h.paivamaara} | ${h.aika} h | ${h.kuvaus}</li>`;  //lisätään joka harjoitus html listaan
                }    

                $("#tuloksetLista").html(listaHTML);  //näytetään lista käyttäjälle
                  // Simppeli slideDown. piilottaa eka elementin, liu uttaa esiin kun hakutulokset näytetään. klikat hae, valinta ja tämä
                $("#tulos-container").slideDown(500, function() {
                    $("#tuloksetLista").slideDown(400);
                });

            }
        } else {
            $("#tulos").text("Valitse ensin laji.");  //pitää valita laji ennen hakua
            $("#tuloksetLista").html("");  //tyhjennetään lista aiemmista hauista
            $("#tulos-container").hide().slideDown(400);
             // KORJAUS: Näytä tulos-container slideDown efektillä
             $("#tulos-container").slideDown(500);
        }
    });
   // LISÄYS: Hover-efektit napeille
   $("#laheta, #hae").hover(
    function() {
        $(this).fadeOut(100).fadeIn(200);
    }
);

// LISÄYS: Sivun latauksen jälkeen fade-in efekti,. tyylikäs efekti
$("body").hide().fadeIn(800);
});
  