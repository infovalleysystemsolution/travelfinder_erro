$(function () {
    var cities = [];
    var id_cities = [];

    async function searchLocations() {
        console.log("cheguei em searchLocations, string recebida: ");
        // const urlSearchStop = window.location.href + "searchstops";
        // console.log("URL atual: ", urlSearchStop);
        // await fetch(urlSearchStop, {
        //     method: "GET",
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("searchLocations => response do fetch: ", data);
        //         return data;
        //     })
        //     .catch((error) => {
        //         console.log("Erro na busca:", error);
        //         return false;
        //     });
        const urlSearchStop = window.location.href + "searchstops";
        console.log("URL atual: ", urlSearchStop);
        try {
            const response = await fetch(urlSearchStop, {
                method: "GET",
            });
            const data = await response.json();
            // console.log("searchLocations => response do fetch: ", data);
            return data;
        } catch (error) {
            console.log("Erro na busca:", error);
            return false;
        }
    }

    cities = cities.filter(function (city, index, self) {
        return self.indexOf(city) === index;
    });

    cities.sort();

    function citiesObtainedRequest(cities) {
        console.log("cheguei em citiesObtainedRequest");
        console.log("citiesObtainedRequest: ", cities);
    }

    function handleAutocomplete(element) {
        console.log("cheguei em handleAutocomplete...");
        var test_response;

        element.autocomplete({
            source: function (request, response) {
                var term = request.term.toLowerCase();
                var filteredCities = cities.filter(function (city) {
                    return city.toLowerCase().indexOf(term) !== -1;
                });
                response(filteredCities);
            },
            minLength: 2,
            select: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            },
        });
    }

    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0,
        beforeShow: function (input, inst) {
            setTimeout(function () {
                inst.dpDiv.css({
                    top:
                        "calc(" +
                        (input.offsetTop + input.offsetHeight) +
                        "px + 6px)",
                    left: input.offsetLeft + "px",
                });
            }, 0);
        },
        onChangeMonthYear: function (year, month, inst) {
            setTimeout(function () {
                inst.dpDiv.css({
                    top:
                        "calc(" +
                        (input.offsetTop + input.offsetHeight) +
                        "px + 6px)",
                    left: input.offsetLeft + "px",
                });
            }, 0);
        },
        onSelect: function (dateText) {
            $(this).val(dateText);
        },
    });

    var timeoutId;
    var lastTypedValue = "";

    // function handleInputChange() {
    //     const value = this.value;
    //     const id = this.id;

    //     clearTimeout(timeoutId);

    //     if (value.length >= 2) {
    //         timeoutId = setTimeout(() => {
    //             if (value === lastTypedValue) {
    //                 console.log(
    //                     "handleInputChange - value do input " + id + ":",
    //                     value
    //                 );
    //                 console.log("#" + this.id);
    //                 handleAutocomplete(this);
    //             }
    //         }, 500);
    //     }

    //     lastTypedValue = value;
    // }

    // const pontoPartidaInput = document.getElementById("ponto-partida");
    // pontoPartidaInput.addEventListener("input", handleInputChange);

    // const destinoInput = document.getElementById("destino");
    // destinoInput.addEventListener("input", handleInputChange);
    function loadCities() {
        searchLocations().then((response_search) => {
            var length_search = Object.keys(response_search).length;
            var length_substops;
            var precorrer_substops;
            var precorrer_search;
            var contemPalavras;
            if (length_search > 0) {
                cities = [];
                id_cities = [];
            }
            for (
                precorrer_search = 0;
                precorrer_search < length_search;
                precorrer_search++
            ) {
                // console.log(response_search[precorrer_search]);

                if (response_search[precorrer_search].name.includes("TODOS")) {
                    length_substops = Object.keys(
                        response_search[precorrer_search].substops
                    ).length;

                    for (
                        precorrer_substops = 0;
                        precorrer_substops < length_substops;
                        precorrer_substops++
                    ) {
                        // console.log(
                        //     "Imprimindo substops: ",
                        //     response_search[precorrer_search].substops[
                        //         precorrer_substops
                        //     ].id,
                        //     "",
                        //     response_search[precorrer_search].substops[
                        //         precorrer_substops
                        //     ].name
                        // );
                        contemPalavras =
                            response_search[precorrer_search].name.includes(
                                "SP"
                            ) ||
                            response_search[precorrer_search].name.includes(
                                "PR"
                            );
                        if (contemPalavras) {
                            cities.push(
                                response_search[precorrer_search].substops[
                                    precorrer_substops
                                ].name
                            );
                            id_cities.push(
                                response_search[precorrer_search].substops[
                                    precorrer_substops
                                ].id
                            );
                        }
                    }
                } else {
                    // console.log(
                    //     "Imprimindo stops: ",
                    //     response_search[precorrer_search].id,
                    //     "",
                    //     response_search[precorrer_search].name
                    // );
                    contemPalavras =
                        response_search[precorrer_search].name.includes("SP") ||
                        response_search[precorrer_search].name.includes("PR");
                    if (contemPalavras) {
                        cities.push(response_search[precorrer_search].name);
                        id_cities.push(response_search[precorrer_search].id);
                    }
                }
            }
            console.log("cities: ", cities, " id_cities: ", id_cities);
            // test_response.foreach((response_foreach) => {
            //     console.log("response_foreach: ");
            //     console.log(response_foreach);
            // });
            // console.log("test_response: ", test_response);
            // if (response_search !== false ) => {
            //     console.log("response dentro de handleAutocomplete");
            //     console.log(test);
            //     return false;
            // }
        });
    }

    if ($("#ponto-partida").val().length == 0) loadCities();

    handleAutocomplete($("#ponto-partida"));
    handleAutocomplete($("#destino"));
});
