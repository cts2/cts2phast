$(function() {

$.get('proxy.php?url=http://phastservices.cloudapp.net/REST/sts_rest_beta_2/0000/valuesets',
    function (xml) {
        var cts2Json = $.xml2json(xml);

        var valueSetDatums = []

        for(var i=0;i<cts2Json.entry.length;i++){
            valueSetDatums.push({value:cts2Json.entry[i].valueSetName});
        }

        $('#valueSetTypeahead').typeahead({
            name: 'ValueSets',
            local: valueSetDatums
        });

});



$.get('proxy.php?url=http://phastservices.cloudapp.net/REST/sts_rest_beta_2/0000/valueset/2.16.840.1.113883.1.11.19732/entities',
    function (xml) {
        var cts2Json = $.xml2json(xml);

        for(var i=0;i<cts2Json.entry.length;i++){
            var oid = cts2Json.entry[i].about;
            $(".valueset[data-uri='"+oid+"']").each(function(){
                $(this).popover(
                    {
                        trigger: "hover",
                        html: true,
                        content:"<b>Name: </b>"+cts2Json.entry[i].name.name + "<br><b>Description: </b>"+cts2Json.entry[i].knownEntityDescription.designation
                    });
            });
        }


});

$(".conceptdomain").each(function(){
    var $toAnnotate = $(this);
    $.get('proxy.php?url=http://phastservices.cloudapp.net/REST/sts_rest_beta_2/0000/conceptdomain/AcknowledgementCondition',
        function (xml) {
            var cts2Json = $.xml2json(xml);
            var text = cts2Json.conceptDomainCatalogEntry.resourceSynopsis.value;
            $toAnnotate.popover(
                {
                    trigger: "hover",
                    html: true,
                    content:text
                }
            );
        });
});

});